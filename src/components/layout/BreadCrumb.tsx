import { useNavigate } from 'react-router-dom';

import { useBreadCrumbState } from '@libs/store/breadcrumb/breadcrumb';
import { styled } from 'styled-components';

const BreadCrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  span:nth-child(odd):hover {
    text-decoration: underline;
  }
`;

const BreadCrumb = () => {
  const { mainRoute, projectRoute } = useBreadCrumbState();
  const navigate = useNavigate();

  if (!mainRoute.route) return <></>;
  return (
    <BreadCrumbWrapper>
      <span onClick={() => navigate(mainRoute.link)}>{mainRoute.route}</span>
      {projectRoute.project.route && (
        <>
          <span>/</span>
          <span onClick={() => navigate(projectRoute.project.link)}>
            {projectRoute.project.route}
          </span>
          {projectRoute.task?.route && (
            <>
              <span>/</span>
              <span onClick={() => navigate(projectRoute.task?.link || '')}>
                {projectRoute.task.route}
              </span>
              {projectRoute.subTask?.route && (
                <>
                  <span>/</span>
                  <span>{projectRoute.subTask.route}</span>
                </>
              )}
            </>
          )}
        </>
      )}
    </BreadCrumbWrapper>
  );
};

export default BreadCrumb;
