import React from "react";
import styled from "@emotion/styled";
import { Button } from "@rico-ui/react";

const Container = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  margin-bottom: 24px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 40px;
  font-size: 1.1rem;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 1.5rem;
`;

const SectionDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
`;

const Examples = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
`;

const ButtonPage: React.FC = () => {
  return (
    <Container>
      <Title>Button 按钮</Title>
      <Description>
        按钮用于触发一个即时操作，如提交表单、打开对话框等。
      </Description>

      <Section>
        <SectionTitle>按钮类型</SectionTitle>
        <SectionDescription>
          Rico UI提供了四种类型的按钮：主要按钮、次要按钮、轮廓按钮和幽灵按钮。
        </SectionDescription>
        <Examples>
          <Button variant="primary">主要按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="outline">轮廓按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
        </Examples>
      </Section>

      <Section>
        <SectionTitle>按钮尺寸</SectionTitle>
        <SectionDescription>按钮有三种尺寸：小、中、大。</SectionDescription>
        <Examples>
          <Button size="sm">小型按钮</Button>
          <Button size="md">中型按钮</Button>
          <Button size="lg">大型按钮</Button>
        </Examples>
      </Section>

      <Section>
        <SectionTitle>按钮状态</SectionTitle>
        <SectionDescription>
          按钮可以有不同的状态：加载中、禁用。
        </SectionDescription>
        <Examples>
          <Button isLoading>加载中</Button>
          <Button disabled>禁用按钮</Button>
        </Examples>
      </Section>

      <Section>
        <SectionTitle>全宽按钮</SectionTitle>
        <SectionDescription>
          设置 fullWidth 属性可以让按钮占据整个容器的宽度。
        </SectionDescription>
        <Button fullWidth>全宽按钮</Button>
      </Section>
    </Container>
  );
};

export default ButtonPage;
