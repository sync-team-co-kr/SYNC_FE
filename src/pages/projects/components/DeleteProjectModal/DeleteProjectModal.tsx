import React, { useState } from 'react';

import { Button } from '@components/common/Button';
import InputArea from '@components/common/InputArea';
import { modalStore } from '@libs/store';
import {
  useDeleteProject,
  useGetProject,
} from '@services/project/Project.hooks';

import StyleDeleteProjectModal from './DeleteProjectModal.style';

interface DeleteProjectModalProps {
  projectId: number;
}

const DeleteProjectModal = ({ projectId }: DeleteProjectModalProps) => {
  const [retypeProjectTitle, setRetypeProjectTitle] = useState('');
  const { project } = useGetProject(projectId);
  const { deleteProjectMutate } = useDeleteProject();
  const { closeModal } = modalStore();

  const handleDeleteProject = () => {
    if (retypeProjectTitle === project?.title) {
      deleteProjectMutate(projectId);
    }
    return closeModal();
  };

  return (
    <>
      <StyleDeleteProjectModal.Header>
        <h2>프로젝트 삭제</h2>
        <p>
          프로젝트 삭제시 해당 내용을 복구할 수 없습니다. <br />
          프로젝트 담당자를 임명하고 탈퇴 시 남은 인원이 해당 데이터를 유지할 수
          있습니다.
        </p>
      </StyleDeleteProjectModal.Header>

      <StyleDeleteProjectModal.Form>
        <InputArea
          value={project?.title || ''}
          isDisabled={true}
          labelText="프로젝트 명"
          placeholderText="프로젝트 명"
        />

        <InputArea
          value={retypeProjectTitle}
          onChange={(e) => setRetypeProjectTitle(e.target.value)}
          labelText="프로젝트 재입력"
          placeholderText="프로젝트 명을 그대로 입력해 주세요."
        />

        <StyleDeleteProjectModal.Submit>
          <Button
            size="medium"
            variant="text"
            $hasIcon={false}
            text="취소"
            onClick={closeModal}
          />
          <Button
            size="medium"
            variant="fillRed"
            $hasIcon={false}
            text="삭제하기"
            onClick={handleDeleteProject}
          />
        </StyleDeleteProjectModal.Submit>
      </StyleDeleteProjectModal.Form>
    </>
  );
};

export default DeleteProjectModal;
