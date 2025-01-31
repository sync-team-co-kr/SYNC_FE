import { ReactComponent as CheckBox } from '@assets/projects/checkBox.svg';

import { getProgressValue, progressPercent } from './ProgressBarGraph.utils';
import {
  BarGraph,
  BarGraphFrame1,
  BarGraphFrame2,
  CheckIcon,
  CheckText,
  IndexFrame,
  PercentText,
  ProgressFrame,
  ProgressGraph,
} from './styles';

interface ProgressBarGraphProps {
  totalCount?: number;
  completedCount?: number;
}

const ProgressBarGraph = ({
  totalCount,
  completedCount,
}: ProgressBarGraphProps) => {
  return (
    <ProgressFrame>
      <BarGraph>
        <BarGraphFrame1>
          <IndexFrame>
            <CheckIcon>
              <CheckBox />
            </CheckIcon>
            {/* {!tasks ? <CheckText>0/0</CheckText> : <CheckText>완료된 프로젝트 / 전체 프로젝트</CheckText>} */}
            <CheckText>
              {getProgressValue(totalCount, completedCount)}
            </CheckText>
          </IndexFrame>
          <PercentText>
            {progressPercent(totalCount, completedCount)} %
          </PercentText>
        </BarGraphFrame1>
        <BarGraphFrame2>
          <ProgressGraph
            width={`${progressPercent(totalCount, completedCount)}%`}
          />
        </BarGraphFrame2>
      </BarGraph>
    </ProgressFrame>
  );
};

export default ProgressBarGraph;
