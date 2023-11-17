import styled from "styled-components";
import { Card } from "../../../../shared/components/styles/UIElements";
import ReviewItem from "./ReivewItem";

export const Section = styled.div`
  width: 35%;
  background-color: white;
  border-radius: 7px;
`;

export const Title = styled.div`
  font-size: 1.3em;
  font-weight: 500;
  text-align: center;
  padding: 1em 0 0;
`;

const ReviewContainer = () => {
  return (
    <Section>
      <Title>최신 리뷰를 확인하세요</Title>
      <Card>
        <ReviewItem />
      </Card>
    </Section>
  );
};

export default ReviewContainer;
