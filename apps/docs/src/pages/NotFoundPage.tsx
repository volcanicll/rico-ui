import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Button } from "@rico-ui/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 32px;
  max-width: 500px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Title>页面未找到</Title>
      <Description>很抱歉，您请求的页面不存在或已被移动。</Description>
      <StyledLink to="/">
        <Button variant="primary">返回首页</Button>
      </StyledLink>
    </Container>
  );
};

export default NotFoundPage;
