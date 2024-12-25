import React from "react";
import styled from "styled-components";
import { LeaderboardDisplay } from "./components/LeaderboardDisplay";

const PopupContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColors.modalSecondary};
  min-width: 320px;
  min-height: 400px;
  padding: 1rem;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const Popup: React.FC = () => {
  return (
    <PopupContainer>
      <LeaderboardDisplay />
    </PopupContainer>
  );
};

export default Popup;
