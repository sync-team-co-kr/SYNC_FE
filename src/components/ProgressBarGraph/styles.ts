import { styled } from 'styled-components';

export const ProgressFrame = styled.div`
  display: flex;
  height: 64px;
  width: 100%;
  /* padding: 12px 16px; */
  align-items: center;
  gap: 8px;
  /* border-bottom: 1px solid var(--Black-White-Black-10, #f4f4f4); */
  background: #fff;
  /* width: 311px; */
`;

export const BarGraph = styled.div`
  display: flex;
  width: 100%;
  /* width: 279px; */
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const BarGraphFrame1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const IndexFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const CheckIcon = styled.svg`
  width: 12px;
  height: 12px;
`;

export const CheckText = styled.div`
  color: var(--Black-White-Black-20, #bfbfbf);
  text-align: center;

  /* Small Text_B */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px; /* 116.667% */
`;

export const PercentText = styled.div`
  color: var(--Black-White-Black-100, #202020);
  text-align: center;

  /* Small Text_B */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px; /* 116.667% */
`;

export const BarGraphFrame2 = styled.div`
  display: flex;
  height: 12px;
  width: 100%;
  border-radius: 2px;
  background: var(--Black-White-Black-10, #f4f4f4);
`;

export const ProgressGraph = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  align-self: stretch;
  border-radius: 2px;
  background: var(--Primary-Orange-Yellow-Orange, #ffd880);
`;
