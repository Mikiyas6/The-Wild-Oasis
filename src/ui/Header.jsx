/* eslint-disable no-unused-vars */
import styled from "styled-components";
const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  min-height: 7.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Header() {
  return <StyledHeader>HEADER</StyledHeader>;
}

export default Header;
