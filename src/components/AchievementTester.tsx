import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";
import { useAchievements } from "../hooks/useAchievements";
import { LeaderboardDisplay } from "../popup/components/LeaderboardDisplay";

export function AchievementTester() {
  const { achievements, isPending, error } = useAchievements();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tx = new Transaction();

      // Ensure category is one of the valid options
      if (!["gaming", "sports", "other"].includes(category)) {
        setStatusMessage(
          "Invalid category. Must be 'gaming', 'sports', or 'other'",
        );
        return;
      }

      console.log("Creating achievement with:", {
        title,
        description,
        category,
        timestamp: Date.now(),
        packageAddress: import.meta.env.VITE_PACKAGE_ADDRESS,
      });

      tx.moveCall({
        target: `${import.meta.env.VITE_PACKAGE_ADDRESS}::achievements::create_achievement`,
        arguments: [
          tx.pure.string(title),
          tx.pure.string(description),
          tx.pure.string(category.toLowerCase()),
          tx.pure.u64(Math.floor(Date.now() / 1000)),
        ],
        typeArguments: [],
      });

      await signAndExecuteTransaction({
        transaction: tx,
      });

      setStatusMessage("Achievement created successfully!");
      setShowLeaderboard(true);
      setTitle("");
      setDescription("");
      setCategory("");
    } catch (err) {
      console.error("Failed to create achievement:", err);
      setStatusMessage("Failed to create achievement. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Test Achievement Creation</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Achievement"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          Error: {error.message}
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Existing Achievements</h3>
        {achievements ? (
          <ul className="space-y-4">
            {achievements.data.map((achievement) => {
              const content = achievement.data?.content;
              if (!content || !("fields" in content)) return null;

              const fields = content.fields as {
                name: string;
                earned: boolean;
              };
              return (
                <li
                  key={achievement.data?.objectId}
                  className="p-4 bg-gray-50 rounded-md"
                >
                  <h4 className="font-medium">{fields.name}</h4>
                  <p className="text-gray-600">
                    Status: {fields.earned ? "Earned" : "Not Earned"}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">No achievements yet</p>
        )}
      </div>

      {statusMessage && (
        <div
          style={{
            color: statusMessage.includes("Failed") ? "red" : "green",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          {statusMessage}
        </div>
      )}

      {showLeaderboard && <LeaderboardDisplay />}
    </div>
  );
}
