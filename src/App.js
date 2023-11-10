import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./shared/components/styles/GlobalStyles";
import MainPage from "./pages/main/MainPage";
import DetailPage from "./pages/board/DetailPage";
import ReviewPage from "./pages/board/ReviewPage";
import ListPage from "./pages/list/ListPage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/list" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
