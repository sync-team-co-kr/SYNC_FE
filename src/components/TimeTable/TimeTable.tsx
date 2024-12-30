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
  onClick,
  status,
  variant,
  gridRowStart,
  rowSpan,
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
        onClick={onClick}
        percentage={returnPercentage()}
        variant={variant}
        status={status}
      >
        <Marker statue={status} variant={variant} />
        <ImageWrapper>
          <img src={images} alt={title} />
        </ImageWrapper>
        <Typography variant="small-text-b" color="black">
          {title}
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      gridRowStart={gridRowStart}
      rowSpan={rowSpan}
      onClick={onClick}
      percentage={100}
      variant={variant}
      status={status}
    >
      <Marker statue={status} variant={variant} />
      <Column gap={5}>
        <Row gap={5}>
          <ImageWrapper>
            <img src={images} alt={title} />
          </ImageWrapper>
        </Row>
        <Typography variant="small-text-b" color="black">
          {title}
        </Typography>
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
