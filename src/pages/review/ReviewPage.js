import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import ReviewMap from "./components/ReviewMap";

export const Section = styled.main`
  background-color: #f5f7f6;
  height: auto;
`;

export const Container = styled.div`
  max-width: 700px;
  height: 100vh;
`;

const ReviewPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const itemData = location.state.itemData;

  console.log("id:", id);
  console.log(itemData);

  return (
    <Section>
      <div className="container">
        <Container>
          <div>{itemData.title}</div>
          <ReviewMap geoData={itemData} level={2} />
        </Container>
      </div>
    </Section>
  );
};

export default ReviewPage;
