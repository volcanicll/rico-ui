import React from "react";
import { Button, Card } from "@rico-ui/react";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 800px;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 16px;
  background: linear-gradient(90deg, #3366ff 0%, #00ccff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 40px;
`;

const FeatureCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 16px;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 8px;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Home: React.FC = () => {
  return (
    <Container>
      <Hero>
        <HeroTitle>Rico UI</HeroTitle>
        <HeroSubtitle>高质量的React组件库，为现代Web应用程序设计</HeroSubtitle>
        <Button size="lg" variant="primary">
          开始使用
        </Button>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureIcon>🚀</FeatureIcon>
          <FeatureTitle>高性能</FeatureTitle>
          <FeatureDescription>
            基于现代前端技术栈构建，性能卓越
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>📱</FeatureIcon>
          <FeatureTitle>响应式</FeatureTitle>
          <FeatureDescription>
            完全适配移动端和桌面端的响应式设计
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🎨</FeatureIcon>
          <FeatureTitle>可定制</FeatureTitle>
          <FeatureDescription>
            灵活的主题配置系统满足多样化需求
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🔍</FeatureIcon>
          <FeatureTitle>无障碍</FeatureTitle>
          <FeatureDescription>
            遵循WCAG 2.1标准，关注可访问性
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </Container>
  );
};

export default Home;
