import styled from 'styled-components';

export const Container = styled.div`
  width: 1046px;
  height: 640px;
  display: flex;
  flex-direction: column;
`;

export const ContainerHeader = styled.div`
  width: 100%;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

export const UpperHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SideHeader = styled.div`
  display: flex;
  justify-content: center;
`;

export const TitleHeader = styled.div`
   display: flex;
   align-items: center;
    gap: 12px;
    img {
      width: 28px;
      height: 28px;
    }
`;

export const ContainerContent = styled.div`
  display: flex;
  gap: 32px;
  padding : 12px, 32px, 12px, 32px;
  width: 100%;
`;

export const LeftContent = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  gap: 24px;
  position: relative;
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  position: relative;
  border: 1px solid var(--Black-White-Black-10, #f4f4f4);
  border-radius: 12px;
`

export const SectionContainer = styled.div<{
  direction?: 'column' | 'row';
  maxwidth?: string;
  gap?: number;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  max-width: ${({ maxwidth }) => maxwidth || '302px'};
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
  padding: 32px;
  gap: 12px;
`;
