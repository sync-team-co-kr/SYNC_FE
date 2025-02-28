import { useBreadCrumbState } from '@libs/store/breadcrumb/breadcrumb';
import { styled } from 'styled-components';

const BreadCrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BreadCrumb = () => {
  const { mainRoute, projectRoute } = useBreadCrumbState();
  if (!mainRoute) return <></>;
  return (
    <BreadCrumbWrapper>
      <span>{mainRoute}</span>
      {projectRoute.project && (
        <>
          <span>/</span>
          <span>{projectRoute.project}</span>
          {projectRoute.task && (
            <>
              <span>/</span>
              <span>{projectRoute.task}</span>
            </>
          )}
        </>
      )}
    </BreadCrumbWrapper>
  );
};

export default BreadCrumb;
