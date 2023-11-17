import { createContext, useState } from "react";

const SearchContext = createContext({
  state: { searchData: [] },
  actions: {
    setSearchData: () => {},
  },
});

const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);

  const value = {
    state: { searchData },
    actions: { setSearchData },
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
