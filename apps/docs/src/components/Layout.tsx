import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@rico-ui/react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled(Link)`
  padding: 10px 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavGroup = styled.div`
  margin-bottom: 20px;
`;

const NavTitle = styled.h3`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 10px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Content = styled.main`
  flex: 1;
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <Container>
      <Sidebar>
        <Logo>Rico UI</Logo>
        <Navigation>
          <NavGroup>
            <NavTitle>入门</NavTitle>
            <NavItem to="/">首页</NavItem>
          </NavGroup>
          <NavGroup>
            <NavTitle>组件</NavTitle>
            <NavItem to="/components">组件概览</NavItem>
            <NavItem to="/components/button">Button 按钮</NavItem>
            <NavItem to="/components/card">Card 卡片</NavItem>
          </NavGroup>
        </Navigation>
      </Sidebar>
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
