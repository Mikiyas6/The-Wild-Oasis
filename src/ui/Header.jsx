/* eslint-disable no-unused-vars */
import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  min-height: 7.2rem;
  display: flex;
  align-items: center;
  gap: 2.4rem;
  justify-content: flex-end;
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderMenu />
      <UserAvatar />
    </StyledHeader>
  );
}

export default Header;
