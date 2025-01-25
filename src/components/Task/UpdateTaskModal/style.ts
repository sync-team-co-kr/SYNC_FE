import styled from 'styled-components';
import { vars } from 'token';

export const UpdateTaskModalContainer = styled.div`
  width: 1046px;
  height: 640px;
  padding: 32px;

  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const UpdateTaskModalHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.section`
  padding: 12px 0;
  display: flex;
  gap: 32px;
`;

export const SubmitButtonContainer = styled.section`
  background-color: blue;
  display: flex;
  justify-content: flex-end;
`;

// 헤더 스타일
export const UpdateTaskModalArticle = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Tools = styled.section`
  display: flex;
  align-items: center;
  gap: 18px;
`;

// 메인 콘텐츠 스타일
export const UpdateTaskModalContent = styled.section`
  display: flex;
  width: 600px;
  flex-direction: column;
  gap: 24px;
`;

// 업무 내용 영역
export const UpdateTaskModalPostContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PostLabel = styled.span`
  ${vars.sementic.typography['small-text-b']};
`;

export const PostAutoSummationToggle = styled.div`
  display: flex;
  gap: 8px;
  ${vars.sementic.typography['small-text-b']}
`;

// 댓글 영역
export const UpdateTaskModalCommentContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CommentInputForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CommentFormLabel = styled.label`
  ${vars.sementic.typography['small-text-b']}
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background-color: black;
  border: 1px solid ${vars.sementic.color.white};
  border-radius: 100px;
`;

export const CommentInput = styled.input`
  padding: 12px 8px;
  border: 1px solid ${vars.sementic.color.black20};
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

export const CommentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CommentItem = styled.li`
  display: flex;
  gap: 8px;
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
`;

export const CommenterWrap = styled.article`
  display: flex;
  gap: 8px;
  h5 {
    ${vars.sementic.typography['small-text-b']}
  }
  span {
    ${vars.sementic.typography['small-text']}
  }
`;

export const CommentDescription = styled.p`
  ${vars.sementic.typography.paragraph}
`;

export const CommentManageButtons = styled.div`
  display: flex;
  gap: 8px;
  button {
    padding: 0;
  }
`;
