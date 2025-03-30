import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Card } from "@rico-ui/react";

const Container = styled.div`
  max-width: 900px;
`;

const Title = styled.h1`
  margin-bottom: 24px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 40px;
  font-size: 1.1rem;
  max-width: 700px;
`;

const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const ComponentCard = styled(Card)`
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ComponentLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ComponentContent = styled.div`
  padding: 20px;
`;

const ComponentName = styled.h3`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.primary};
`;

const ComponentDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0;
`;

interface ComponentItem {
  name: string;
  path: string;
  description: string;
}

const components: ComponentItem[] = [
  {
    name: "Button",
    path: "/components/button",
    description: "按钮组件，用于触发操作或事件",
  },
  {
    name: "Card",
    path: "/components/card",
    description: "卡片容器，用于展示内容",
  },
];

const Components: React.FC = () => {
  return (
    <Container>
      <Title>组件</Title>
      <Description>
        Rico UI提供了一系列高质量的React组件，满足现代Web应用程序的需求。
        组件支持自定义主题，响应式布局和可访问性。
      </Description>

      <ComponentGrid>
        {components.map((component) => (
          <ComponentLink key={component.path} to={component.path}>
            <ComponentCard shadow>
              <ComponentContent>
                <ComponentName>{component.name}</ComponentName>
                <ComponentDescription>
                  {component.description}
                </ComponentDescription>
              </ComponentContent>
            </ComponentCard>
          </ComponentLink>
        ))}
      </ComponentGrid>
    </Container>
  );
};

export default Components;
