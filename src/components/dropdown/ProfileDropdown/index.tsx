import { useEffect, useState } from 'react';

import {
  EMOJI_LIST,
  FACE_EMOJI_LIST,
  NON_FACE_EMOJI_LIST,
} from '@assets/icons/emojiList';
import { Tab } from '@components/Tabs/Tab';
import { TabList } from '@components/Tabs/Tab.list';
import { TabPanel, TabPanels } from '@components/Tabs/Tab.panel';
import { Tabs } from '@components/Tabs/Tabs';
import { Typography } from '@components/common';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.button';
import { SelectList } from '@components/common/Select/Select.list';
import Textfield from '@components/common/Textfield';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import styled from 'styled-components';

const EmojiContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
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

const EmojiIconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 24px);
  grid-gap: 8px;
  width: 100%;
`;

export const ProfileDropdown = () => {
  const { titleImage } = useTaskState();
  const { setTitleImage } = useTaskActions();
  const [emojiSearch, setEmojiSearch] = useState('');
  const [emojiList, setEmojiList] = useState<string[]>([]);

  useEffect(() => {
    if (!titleImage) {
      setTitleImage('SmilingFaceWithSunglasses');
    }
  }, [titleImage, setTitleImage]);

  // emoji 검색
  const handleEmojiSearch = (emoji: string) => {
    if (!emoji) {
      setEmojiSearch('');
      setEmojiList([]);
      return;
    }
    setEmojiSearch(emoji);

    const filteredEmojiList = Object.keys(EMOJI_LIST).filter((key) =>
      key.toLowerCase().includes(emoji.toLowerCase()),
    );

    setEmojiList(filteredEmojiList);
    console.log(filteredEmojiList);
  };

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
        <Tabs>
          <TabList padding="0">
            <Tab>이모지</Tab>
            <Tab>아이콘</Tab>
            <Tab>사용자 지정</Tab>
          </TabList>

          <TabPanels>
            <TabPanel padding="20px 0">
              <EmojiListContainer>
                <Textfield
                  variant="search"
                  type="search"
                  placeholder="검색"
                  value={emojiSearch}
                  onChange={(e) => handleEmojiSearch(e.target.value)}
                />

                {emojiList.length !== 0 ? (
                  <EmojiContainer>
                    <Typography variant="small-text-b" color="black35">
                      검색 결과
                    </Typography>
                    <EmojiIconContainer>
                      {emojiList.map((emoji) => {
                        const emojiSrc =
                          EMOJI_LIST[emoji as keyof typeof EMOJI_LIST];
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
                    </EmojiIconContainer>
                  </EmojiContainer>
                ) : (
                  <>
                    <EmojiContainer>
                      <Typography variant="small-text-b" color="black35">
                        사람
                      </Typography>
                      <EmojiIconContainer>
                        {Object.keys(FACE_EMOJI_LIST).map((emoji) => {
                          const emojiSrc =
                            FACE_EMOJI_LIST[
                              emoji as keyof typeof FACE_EMOJI_LIST
                            ];
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
                      </EmojiIconContainer>
                    </EmojiContainer>
                    <EmojiContainer>
                      <Typography variant="small-text-b" color="black35">
                        사물
                      </Typography>
                      <EmojiIconContainer>
                        {Object.keys(NON_FACE_EMOJI_LIST).map((emoji) => {
                          const emojiSrc =
                            NON_FACE_EMOJI_LIST[
                              emoji as keyof typeof NON_FACE_EMOJI_LIST
                            ];
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
                      </EmojiIconContainer>
                    </EmojiContainer>
                  </>
                )}
              </EmojiListContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </SelectList>
    </Select>
  );
};
