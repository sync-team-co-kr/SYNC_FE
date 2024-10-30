import React, { useEffect, useState } from 'react';

import { useProjectActions } from '@libs/store/project/project';
import { styled } from 'styled-components';
import { vars } from 'token';
import EmojiGroupJson from 'unicode-emoji-json/data-by-group.json';

const EmojiListContent = styled.aside`
  height: 400px;
  padding: 12px;
  background-color: ${vars.sementic.color.white};
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(8, auto);
  row-gap: 12px;
  justify-items: center;
  button {
    width: 24px;
    height: 24px;
    padding: 0;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
  }
`;

interface IEmoji {
  name: string;
  slug: string;
  emoji: string;
}

const ThumbnailEmojiPicker = ({ close }: { close: () => void }) => {
  const { setThumbnail } = useProjectActions();
  const [emojiList, setEmojiList] = useState<Map<string, IEmoji[]>>(new Map());

  useEffect(() => {
    const emojiListMap = new Map();
    EmojiGroupJson.forEach((emojiGroup) => {
      emojiListMap.set(
        emojiGroup.slug,
        emojiGroup.emojis.filter((emojiData) => emojiData.emoji.length <= 2),
      );
    });
    setEmojiList(emojiListMap);
  }, []);

  const handleClickEmoji = (
    e: React.MouseEvent<HTMLButtonElement>,
    emoji: string,
  ) => {
    e.preventDefault();
    setThumbnail(emoji);
    close();
  };

  return (
    <>
      <EmojiListContent>
        {emojiList.get('smileys_emotion')?.map((emojiData) => (
          <button
            key={emojiData.slug}
            onClick={(e) => handleClickEmoji(e, emojiData.emoji)}
          >
            {emojiData.emoji}
          </button>
        ))}
      </EmojiListContent>
    </>
  );
};

export default ThumbnailEmojiPicker;
