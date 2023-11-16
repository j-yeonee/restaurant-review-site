import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./shared/components/styles/GlobalStyles";
import { LocationProvider } from "./shared/components/context/LocationContext";
import { CategoryProvider } from "./shared/components/context/CategoryContext";
import MainPage from "./pages/main/MainPage";
import DetailPage from "./pages/board/DetailPage";
import ReviewPage from "./pages/board/ReviewPage";
import ListPage from "./pages/list/ListPage";
import Header from "./shared/components/layout/Header";

const App = () => {
  return (
    <LocationProvider>
      <CategoryProvider>
        <BrowserRouter>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/list/:id" element={<ListPage />} />
          </Routes>
        </BrowserRouter>
      </CategoryProvider>
    </LocationProvider>
  );
};

export default App;
