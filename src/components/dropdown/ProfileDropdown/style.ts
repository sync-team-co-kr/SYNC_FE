import styled from 'styled-components';

export const EmojiContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
  max-width: 408px;
`;

export const EmojiListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  align-items: center;
`;

export const EmojiIconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 24px);
  grid-gap: 8px;
  width: 100%;
`;

export const EmojiImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const InputIconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 32px;
  height: 32px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;
