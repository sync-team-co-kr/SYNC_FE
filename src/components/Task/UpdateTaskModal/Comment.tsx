import { Button } from '@components/common/Button';

import {
  Avatar,
  CommentContent,
  CommentDescription,
  CommentItem,
  CommentManageButtons,
  CommenterWrap,
} from './style';

interface IComment {
  commenter: string;
  content: string;
}

const Comment = ({ comment }: { comment: IComment }) => {
  return (
    <CommentItem key={comment.commenter}>
      <Avatar></Avatar>
      <CommentContent>
        <CommenterWrap>
          <h5>{comment.commenter}</h5>
          <span>2분전</span>
        </CommenterWrap>
        <CommentDescription>{comment.content}</CommentDescription>
        <CommentManageButtons>
          <Button
            size="medium"
            variant="text"
            onClick={() => ({})}
            text="편집"
          />
          <Button
            size="medium"
            variant="text"
            onClick={() => ({})}
            text="삭제"
          />
        </CommentManageButtons>
      </CommentContent>
    </CommentItem>
  );
};

export default Comment;
