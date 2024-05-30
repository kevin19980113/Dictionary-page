/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const FontDarkmodeContext = createContext({
  selectedFont: "",
  setFont: () => {},
  isDarkMode: "",
  setDarkMode: () => {},
});

export default function FontDarkmodeContextProvider({ children }) {
  const [selectedFont, setSelectedFont] = useState("andika");
  const [isDarkMode, setIsDarkMode] = useState(false);

  function setFont(font) {
    setSelectedFont(font);
  }

  function setDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  const fontDarkmodeContext = {
    selectedFont: selectedFont,
    setFont,
    isDarkMode: isDarkMode,
    setDarkMode,
  };

  return (
    <FontDarkmodeContext.Provider value={fontDarkmodeContext}>
      {children}
    </FontDarkmodeContext.Provider>
  );
}
