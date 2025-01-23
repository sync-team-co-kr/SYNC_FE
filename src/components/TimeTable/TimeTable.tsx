import { Column } from '@components/common/Column';
import { Row } from '@components/common/Row';
import { Typography } from '@components/common/Typography';

import { Container, ImageWrapper, Marker } from './TimeTable.style';
import { TimeTableProps } from './TimeTable.types';

/**
 * 시간표 컴포넌트
 * 일정을 시간대별로 보여주는 컴포넌트
 * @param {TimeTableProps} props
 * @returns {JSX.Element}
 */

const TimeTable = ({
  title,
  startTime,
  endTime,
  images,
  onDoubleClick,
  status,
  variant,
  gridRowStart,
  rowSpan,
  moveDayCalendar,
}: TimeTableProps) => {
  const returnPercentage = () => {
    const start = new Date(startTime).getHours();
    const end = new Date(endTime).getHours();
    const total = end - start;
    return total * 100;
  };

  if (variant === 'graph') {
    return (
      <Container
        onDoubleClick={onDoubleClick}
        $percentage={returnPercentage()}
        $variant={variant}
        $status={status}
      >
        <Marker $status={status} $variant={variant} />
        <ImageWrapper>
          <img src={images} alt={title} />
        </ImageWrapper>
        <span onClick={moveDayCalendar}>{title}</span>
      </Container>
    );
  }

  return (
    <Container
      $gridRowStart={gridRowStart}
      $rowSpan={rowSpan}
      onDoubleClick={onDoubleClick}
      $percentage={100}
      $variant={variant}
      $status={status}
    >
      <Marker $status={status} $variant={variant} />
      <Column gap={5}>
        <Row gap={5}>
          <ImageWrapper>
            <img src={images} alt={title} />
          </ImageWrapper>
        </Row>
        <span onClick={moveDayCalendar}>{title}</span>
        <Typography variant="small-text" color="black70">
          {startTime} ~ {endTime}
        </Typography>
      </Column>
    </Container>
  );
};

export { TimeTable };

/*

          <Typography variant="small-text" color="black">
            {description}
          </Typography>
*/
