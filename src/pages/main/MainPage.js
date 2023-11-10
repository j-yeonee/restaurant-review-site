import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import styled from "styled-components";
import ReviewView from "./components/ReviewView";
import ThemeView from "./components/ThemeView";

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
      <Header />
      <Main>
        <div className="container">
          <MainBox>
            <ThemeView />
            <ReviewView />
          </MainBox>
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default MainPage;
