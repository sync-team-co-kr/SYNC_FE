import * as FaIconList from 'react-icons/fa';

import thumbnailDefaultIcon from '@assets/project-icon.png';
import { RawProject } from '@customTypes/project';
import { styled } from 'styled-components';

const ThumbnailWrapper = styled.div`
  width: 28px;
  height: 28px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Thumbnail = ({
  thumbnail,
  thumbnailType,
}: Pick<RawProject, 'thumbnail' | 'thumbnailType'>) => {
  const visualizeImage = (imageBinary?: string | Blob) => {
    if (imageBinary && typeof imageBinary === 'string')
      return `https://user.sync-team.co.kr:30443/node2/api/task/image?filename=/mnt/oraclevdb/project/title/${thumbnail}`;
    return '';
  };

  const thumbnailTypeChecking = (
    typeCheckingThumbnailTarget?: string | Blob,
  ) => {
    if (
      typeCheckingThumbnailTarget &&
      typeof typeCheckingThumbnailTarget === 'string'
    )
      return typeCheckingThumbnailTarget;
    return '';
  };

  switch (thumbnailType) {
    case 'E': // 이모지
      return (
        <ThumbnailWrapper>{thumbnailTypeChecking(thumbnail)}</ThumbnailWrapper>
      );
    case 'C': // 아이콘
      return (
        <ThumbnailWrapper>
          {Object.entries(FaIconList)
            .filter(([iconName]) => iconName === thumbnail)
            .map(([iconName, Icon]) => (
              <div key={iconName}>
                <Icon size="24" />
              </div>
            ))}
        </ThumbnailWrapper>
      );
    case 'I': // 이미지
      return (
        <ThumbnailWrapper>
          <img src={visualizeImage(thumbnail)} alt="커스텀 이미지" />
        </ThumbnailWrapper>
      );
    default:
      return <img src={thumbnailDefaultIcon} alt="프로젝트 대표 아이콘" />;
  }
};
export default Thumbnail;
