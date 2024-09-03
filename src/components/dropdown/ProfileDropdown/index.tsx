import { useEffect } from 'react';

import {
  EMOJI_LIST,
  FACE_EMOJI_LIST,
  NON_FACE_EMOJI_LIST,
} from '@assets/icons/emojiList';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.button';
import { SelectList } from '@components/common/Select/Select.list';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import styled from 'styled-components';

const EmojiContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 24px);
  grid-gap: 8px;
  max-width: 408px;
`;

const EmojiListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  align-items: center;
`;

export const ProfileDropdown = () => {
  const { titleImage } = useTaskState();
  const { setTitleImage } = useTaskActions();

  useEffect(() => {
    if (!titleImage) {
      setTitleImage('SmilingFaceWithSunglasses');
    }
  }, [titleImage, setTitleImage]);

  return (
    <Select
      value={
        <img
          width={24}
          height={24}
          src={EMOJI_LIST[titleImage as keyof typeof EMOJI_LIST]}
        />
      }
      type="select"
    >
      <SelectButton type="emoji" />

      <SelectList width="408px">
        <EmojiListContainer>
          <EmojiContainer>
            {Object.keys(FACE_EMOJI_LIST).map((emoji) => {
              const emojiSrc =
                FACE_EMOJI_LIST[emoji as keyof typeof FACE_EMOJI_LIST];
              return (
                <img
                  width={24}
                  height={24}
                  key={emoji}
                  onClick={() => setTitleImage(emoji)}
                  src={emojiSrc}
                />
              );
            })}
          </EmojiContainer>
          <EmojiContainer>
            {Object.keys(NON_FACE_EMOJI_LIST).map((emoji) => {
              const emojiSrc =
                NON_FACE_EMOJI_LIST[emoji as keyof typeof NON_FACE_EMOJI_LIST];
              return (
                <img
                  width={24}
                  height={24}
                  key={emoji}
                  onClick={() => setTitleImage(emoji)}
                  src={emojiSrc}
                />
              );
            })}
          </EmojiContainer>
        </EmojiListContainer>
      </SelectList>
    </Select>
  );
};
