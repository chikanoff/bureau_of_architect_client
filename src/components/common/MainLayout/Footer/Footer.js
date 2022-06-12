import React from "react";
import styled from "styled-components";
import Copyright from "../../Copyright";

const Footer = () => {
  return (
    <Container>
      <Copyright margin="20px" />
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%
  margin: 0 auto;
  background: #E6E6FA;
`;

export default Footer;
