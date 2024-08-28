import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
`;

export const ContainerHeader = styled.div`
  width: 100%;
  padding-bottom: 32px;
  display: inline-flex;
  justify-content: space-between;
`;

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  position: relative;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 338px;
  gap: 8px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
