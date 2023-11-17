import { createContext, useState } from "react";

const CategoryContext = createContext({
  state: { categoryData: [] },
  actions: {
    setCategoryData: () => {},
  },
});

const CategoryProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);

  const value = {
    state: { categoryData },
    actions: { setCategoryData },
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
