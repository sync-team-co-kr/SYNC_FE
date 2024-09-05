import { ChangeEvent, useEffect, useRef, useState } from 'react';

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
import { Button } from '@components/common/Button';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.button';
import { SelectList } from '@components/common/Select/Select.list';
import Textfield from '@components/common/Textfield';

import {
  EmojiContainer,
  EmojiIconContainer,
  EmojiImageContainer,
  EmojiListContainer,
  InputIconContainer,
} from './style';

type ProfileDropdownProps = {
  selectIconValue: string;
  selectIconOnClick: (value: string) => void;
};

export const ProfileDropdown = ({
  selectIconValue,
  selectIconOnClick,
}: ProfileDropdownProps) => {
  const [emojiSearch, setEmojiSearch] = useState('');
  const [emojiList, setEmojiList] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      selectIconOnClick(URL.createObjectURL(file));
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (!selectIconValue) {
      selectIconOnClick('SmilingFaceWithSunglasses');
    }
  }, [selectIconOnClick, selectIconValue]);

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
  };

  return (
    <Select
      value={
        <InputIconContainer>
          <img
            src={
              selectIconValue && selectIconValue.startsWith('blob:')
                ? selectIconValue
                : EMOJI_LIST[selectIconValue as keyof typeof EMOJI_LIST]
            }
          />
        </InputIconContainer>
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
                          <EmojiImageContainer
                            key={emoji}
                            onClick={() => selectIconOnClick(emoji)}
                          >
                            <img src={emojiSrc} />
                          </EmojiImageContainer>
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
                            <EmojiImageContainer
                              key={emoji}
                              onClick={() => selectIconOnClick(emoji)}
                            >
                              <img src={emojiSrc} />
                            </EmojiImageContainer>
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
                            <EmojiImageContainer
                              key={emoji}
                              onClick={() => selectIconOnClick(emoji)}
                            >
                              <img src={emojiSrc} />
                            </EmojiImageContainer>
                          );
                        })}
                      </EmojiIconContainer>
                    </EmojiContainer>
                  </>
                )}
              </EmojiListContainer>
            </TabPanel>

            <TabPanel padding="20px 0"></TabPanel>

            <TabPanel padding="20px 0">
              <Button
                fullWidth
                size="medium"
                variant="outline"
                text={fileName || '파일 업로드'}
                onClick={handleFileUpload}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <Typography variant="small-text" color="black35">
                권장 규격은 250 x 250픽셀 입니다.
              </Typography>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </SelectList>
    </Select>
  );
};
