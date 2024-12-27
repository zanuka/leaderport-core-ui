import { useState } from "react";
import { useAchievements } from "../hooks/useAchievements";

export function AchievementTester() {
  const { achievements, isPending, error, addAchievement } = useAchievements();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAchievement({
        title,
        description,
        category: category as "gaming" | "sports" | "other",
        timestamp: Date.now(),
      });
      // Clear form
      setTitle("");
      setDescription("");
      setCategory("");
    } catch (err) {
      console.error("Failed to create achievement:", err);
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
    </div>
  );
}
