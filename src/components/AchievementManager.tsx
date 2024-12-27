import { useAchievements } from "../hooks/useAchievements";

export function AchievementManager() {
  const { achievements, isPending, error, addAchievement } = useAchievements();

  const handleCreateAchievement = async () => {
    await addAchievement({
      title: "First Achievement",
      description: "Testing the achievement system",
      timestamp: Date.now(),
      category: "gaming",
    });
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Achievements</h2>
      <button onClick={handleCreateAchievement}>Create Test Achievement</button>

      <div>
        {achievements?.data.map((achievement) => (
          <div key={achievement.data?.objectId}>
            {/* Display achievement data */}
            <pre>{JSON.stringify(achievement, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
