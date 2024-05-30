/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const SearchWordContext = createContext({
  searchWordData: "",
  setWordData: () => {},
});

export default function SearchWordContextProvider({ children }) {
  const [searchWordData, setSearchedWordData] = useState("");

  function setWordData(data) {
    setSearchedWordData(data);
  }

  const searchWordContext = {
    searchWordData,
    setWordData,
  };
  return (
    <SearchWordContext.Provider value={searchWordContext}>
      {children}
    </SearchWordContext.Provider>
  );
}
