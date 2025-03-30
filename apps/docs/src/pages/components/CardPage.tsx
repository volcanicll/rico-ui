import React from "react";
import styled from "@emotion/styled";
import { Card } from "@rico-ui/react";

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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

const CardContent = styled.div`
  padding: 16px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const CardPage: React.FC = () => {
  return (
    <Container>
      <Title>Card 卡片</Title>
      <Description>卡片容器，可承载文字、列表、图片、段落等内容。</Description>

      <Section>
        <SectionTitle>基础卡片</SectionTitle>
        <SectionDescription>包含标题、内容的基础卡片用法。</SectionDescription>
        <Examples>
          <Card>
            <CardContent>
              <h3>基础卡片</h3>
              <p>这是一个基础卡片的内容</p>
            </CardContent>
          </Card>
        </Examples>
      </Section>

      <Section>
        <SectionTitle>阴影与边框</SectionTitle>
        <SectionDescription>卡片可以设置阴影和边框。</SectionDescription>
        <Examples>
          <Card shadow>
            <CardContent>
              <h3>带阴影的卡片</h3>
              <p>这是一个带阴影的卡片</p>
            </CardContent>
          </Card>
          <Card bordered>
            <CardContent>
              <h3>带边框的卡片</h3>
              <p>这是一个带边框的卡片</p>
            </CardContent>
          </Card>
        </Examples>
      </Section>

      <Section>
        <SectionTitle>内边距</SectionTitle>
        <SectionDescription>卡片内边距有不同大小可选。</SectionDescription>
        <Examples>
          <Card padding="small">
            <CardContent>
              <h3>小内边距</h3>
              <p>small</p>
            </CardContent>
          </Card>
          <Card padding="default">
            <CardContent>
              <h3>默认内边距</h3>
              <p>default</p>
            </CardContent>
          </Card>
          <Card padding="large">
            <CardContent>
              <h3>大内边距</h3>
              <p>large</p>
            </CardContent>
          </Card>
        </Examples>
      </Section>

      <Section>
        <SectionTitle>圆角</SectionTitle>
        <SectionDescription>卡片可以设置不同的圆角大小。</SectionDescription>
        <Examples>
          <Card radius="none">
            <CardContent>
              <h3>无圆角</h3>
              <p>none</p>
            </CardContent>
          </Card>
          <Card radius="default">
            <CardContent>
              <h3>默认圆角</h3>
              <p>default</p>
            </CardContent>
          </Card>
          <Card radius="large">
            <CardContent>
              <h3>大圆角</h3>
              <p>large</p>
            </CardContent>
          </Card>
        </Examples>
      </Section>
    </Container>
  );
};

export default CardPage;
