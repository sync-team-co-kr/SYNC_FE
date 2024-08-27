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
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
  position: relative;
`;
