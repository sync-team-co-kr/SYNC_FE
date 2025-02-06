import React, { useState } from 'react';

import { Button } from '@components/common/Button';
import { RawProject } from '@customTypes/project';
import { userApiInstance } from '@libs/axios/axios';
import { styled } from 'styled-components';

const Description = styled.p`
  color: var(--Alert-Color-Positive-Blue, #407bd2);
  /* Paragraph */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  align-self: stretch;
`;

const Label = styled.label`
  color: var(--Black-White-Black-35, #8f8f8f);
  /* Small Text_B */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px; /* 116.667% */
`;

const Input = styled.input`
  padding: 12px 8px;
  border: 1px solid var(--Black-White-Black-20, #bfbfbf);
  border-radius: 4px;
  color: var(--Black-White-Black-70, #636363);
  /* Paragraph */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Submit = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

interface InviteProjectMemberModalProps {
  project: Pick<RawProject, 'projectId' | 'title'>;
}

const InviteProjectMemberModal = ({
  project: { projectId, title },
}: InviteProjectMemberModalProps) => {
  const [invite, setInvite] = useState('');

  const handleInviteProjectMember = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await userApiInstance.post('/user/api/email', {
      projectId,
      title,
      email: invite,
    });
  };

  return (
    <>
      <Description>해당 인원을 프로젝트로 초대할 수 있습니다.</Description>
      <Form>
        <Label>초대인원 이메일</Label>
        <Input
          type="text"
          value={invite}
          onChange={(e) => setInvite(e.target.value)}
          placeholder="이메일을 입력해주세요"
        />
      </Form>
      <section>
        <Submit>
          <Button
            size="medium"
            variant="text"
            $hasIcon={false}
            $isDisabled={false}
            $iconPosition="left"
            onClick={() => console.log('')}
            text="취소"
          />
          <Button
            size="medium"
            variant="fill"
            $hasIcon={false}
            $isDisabled={false}
            $iconPosition="left"
            onClick={handleInviteProjectMember}
            text="완료"
          />
        </Submit>
      </section>
    </>
  );
};

export default InviteProjectMemberModal;
