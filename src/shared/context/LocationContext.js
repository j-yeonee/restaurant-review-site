import { createContext, useState } from "react";

const LocationContext = createContext({
  state: { sid: "", sig: "", emd: " ", allAdr: [] },
  actions: {
    setSid: () => {},
    setSig: () => {},
    setEmd: () => {},
    setAdr: () => {},
  },
});

const LocationProvider = ({ children }) => {
  const [sid, setSid] = useState("");
  const [sig, setSig] = useState("");
  const [emd, setEmd] = useState("");
  const [allAdr, setAdr] = useState(["", "", ""]);

  const value = {
    state: { sid, sig, emd, allAdr },
    actions: { setSid, setSig, setEmd, setAdr },
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
