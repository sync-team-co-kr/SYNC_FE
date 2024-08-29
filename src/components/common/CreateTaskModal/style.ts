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

export const SectionContainer = styled.div<{
  direction?: 'column' | 'row';
  maxwidth?: string;
  gap?: number;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  max-width: ${({ maxwidth }) => maxwidth || '338px'};
  gap: ${({ gap }) => gap || 8}px;
  position: relative;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
export const ContainerFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;
