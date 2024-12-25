import React from "react";
import styled from "styled-components";

interface BasePanelProps {
  msg: string;
}

const PanelContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColors.modalPrimary};
  border-radius: ${({ theme }) => theme.radii.large};
  padding: 2rem;
  margin: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.primaryButton};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const BasePanel: React.FC<BasePanelProps> = ({ msg }) => {
  return (
    <PanelContainer>
      <Title>{msg}</Title>
    </PanelContainer>
  );
};

export default BasePanel;
