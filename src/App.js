import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./shared/components/styles/GlobalStyles";
import { LocationProvider } from "./shared/context/LocationContext";
import { CategoryProvider } from "./shared/context/CategoryContext";
import { SearchProvider } from "./shared/context/SearchContext";
import MainPage from "./pages/main/MainPage";
import SearchPage from "./pages/search/SearchPage";
import ReviewPage from "./pages/review/ReviewPage";
import ListPage from "./pages/list/ListPage";
import Header from "./shared/components/layout/Header";

const App = () => {
  return (
    <SearchProvider>
      <LocationProvider>
        <CategoryProvider>
          <BrowserRouter>
            <GlobalStyles />
            <Header />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/list/:id" element={<ListPage />} />
              <Route path="/review/:id" element={<ReviewPage />} />
            </Routes>
          </BrowserRouter>
        </CategoryProvider>
      </LocationProvider>
    </SearchProvider>
  );
};

export default App;
