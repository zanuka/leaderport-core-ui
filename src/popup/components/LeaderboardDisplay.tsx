import React, { useEffect } from "react";
import { styled, ThemeProvider } from "styled-components";
import { useLeaderboardStore } from "../../stores/leaderboard";
import { useSettingsStore } from "../../stores/settings";
import { theme } from "../../theme";

// Define types for the score object
interface Score {
  player: string;
  score: number;
}

const LeaderboardContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColors.modalPrimary};
  border-radius: ${({ theme }) => theme.radii.large};
  padding: 1rem;
  margin: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.primaryButton};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 1rem;
`;

const ScoresList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ScoreItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColors.outlineButton};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.medium};

  &:last-child {
    border-bottom: none;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.bodyMuted};
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.bodyDanger};
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const RankSpan = styled.span`
  color: ${({ theme }) => theme.colors.bodyMuted};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const PlayerSpan = styled.span`
  color: ${({ theme }) => theme.colors.body};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ScoreSpan = styled.span`
  color: ${({ theme }) => theme.colors.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const LeaderboardDisplay: React.FC = () => {
  // Get store values and actions using hooks
  const { scores, loading, error, startAutoRefresh, stopAutoRefresh } =
    useLeaderboardStore();
  const { loadSettings } = useSettingsStore();

  // Handle component lifecycle
  useEffect(() => {
    // Load settings and start auto-refresh when component mounts
    loadSettings();
    startAutoRefresh();

    // Cleanup when component unmounts
    return () => stopAutoRefresh();
  }, [loadSettings, startAutoRefresh, stopAutoRefresh]);

  return (
    <ThemeProvider theme={theme}>
      <LeaderboardContainer>
        <Title>Achievement Leaderboard</Title>
        <div>
          {loading ? (
            <LoadingMessage>Loading...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <ScoresList>
              {scores.map((score: Score, index: number) => (
                <ScoreItem key={index}>
                  <RankSpan>#{index + 1}</RankSpan>
                  <PlayerSpan>{score.player}</PlayerSpan>
                  <ScoreSpan>{score.score}</ScoreSpan>
                </ScoreItem>
              ))}
            </ScoresList>
          )}
        </div>
      </LeaderboardContainer>
    </ThemeProvider>
  );
};
