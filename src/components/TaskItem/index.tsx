import { DayTag } from '@components/common/DayTag';
import { Tag } from '@components/common/Tag';
import { Typography } from '@components/common/Typography';

import {
  TaskItemComponent,
  TaskItemContent,
  TaskItemContentImageContainer,
  TaskItemContentText,
  TaskItemHeader,
} from './style';
import { TaskItemProps } from './types';

/**
 * 일정 등록 dropdown 에 포함되는 컴포넌트
 */

/**
 *
 * @param title - 일정 제목
 * @param description - 일정 설명
 * @param date - 일정 날짜 (start date, end date)
 * @param works - 일정 종류 (테스크, 서브테스크, 퀘스트)
 * @param situations - 일정 상태 (메인, 할일, 완료, 진행중)
 * @param thumbnail - 일정 이미지
 * @param onClick - 일정 클릭 시 이벤트
 */

export const TaskItem = ({
  title,
  description,
  date,
  works,
  situations,
  onClick,
  thumbnail,
}: TaskItemProps) => {
  return (
    <TaskItemComponent onClick={onClick}>
      <TaskItemHeader>
        {works.map((work) => (
          <Tag key={work} type="work" property={work} />
        ))}
        {situations.map((situation) => (
          <Tag key={situation} type="situation" property={situation} />
        ))}
        <DayTag date={date} variant="period" />
        <DayTag date={date} variant="time" />
      </TaskItemHeader>

      <TaskItemContent>
        <TaskItemContentImageContainer>
          <img src={thumbnail} alt="thumbnail" />
        </TaskItemContentImageContainer>
        <TaskItemContentText>
          <Typography variant="heading-4" color="black">
            {title}
          </Typography>
          <Typography variant="small-text-b" color="black35">
            {description}
          </Typography>
        </TaskItemContentText>
      </TaskItemContent>
    </TaskItemComponent>
  );
};
