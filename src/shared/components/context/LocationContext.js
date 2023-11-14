import { createContext, useState } from "react";

const LocationContext = createContext({
  state: { sid: "", sig: "", emd: " " },
  actions: {
    setSid: () => {},
    setSig: () => {},
    setEmd: () => {},
  },
});

const LocationProvider = ({ children }) => {
  const [sid, setSid] = useState("");
  const [sig, setSig] = useState("");
  const [emd, setEmd] = useState("");

  const value = {
    state: { sid, sig, emd },
    actions: { setSid, setSig, setEmd },
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
