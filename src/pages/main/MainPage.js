import Footer from "../../shared/components/layout/Footer";
import styled from "styled-components";
import ReviewContainer from "./components/review/ReviewContainer";
import CategoryContainer from "./components/category/CategoryContainer";

export const Main = styled.main`
  background-color: #f5f7f6;
  height: auto;
`;

export const MainBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3em 0;
`;

const MainPage = () => {
  return (
    <>
      <Main>
        <div className="container">
          <MainBox>
            <CategoryContainer />
            <ReviewContainer />
          </MainBox>
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default MainPage;
