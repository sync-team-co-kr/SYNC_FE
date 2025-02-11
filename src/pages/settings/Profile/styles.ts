import { styled } from 'styled-components';
import { vars } from 'token';

export const Header = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h3 {
    ${vars.sementic.typography['heading-3']};
    color: ${vars.sementic.color.black};
  }
  p {
    ${vars.sementic.typography.paragraph};
    color: ${vars.sementic.color.black70};
  }
`;

export const ProfileInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  h4 {
    ${vars.sementic.typography['heading-4']};
    color: ${vars.sementic.color.black};
  }
`;

export const ProfileInfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  li {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export const ProfileInfoLabel = styled.p`
  ${vars.sementic.typography['small-text-b']};
  color: ${vars.sementic.color.black35};
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${vars.sementic.color.black35};
  border-radius: 100%;
`;

export const ProfileInfoAnswer = styled.p`
  height: 44px;
  padding: 10px;
  ${vars.sementic.typography.paragraph};
  color: ${vars.sementic.color.black70};
`;

export const DeleteAccountButton = styled.button`
  border: none;
  background-color: transparent;
  ${vars.sementic.typography.paragraph};
  color: ${vars.sementic.color.negativeRed};
  text-decoration: underline;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
`;
