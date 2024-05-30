import Header from "../components/Header.jsx";
import SearchWord from "../components/SearchWord.jsx";
import Result from "../components/Result.jsx";
import { useContext } from "react";
import { FontDarkmodeContext } from "../context/FontDarkmodeContext.jsx";
import SearchWordContextProvider from "../context/SearchWordContext.jsx";

export default function Main() {
  const { isDarkMode, selectedFont } = useContext(FontDarkmodeContext);

  return (
    <main
      id="main"
      className={`w-full min-h-screen flex flex-col gap-y-4 p-4 transition duration-500 ease 
      md:px-12 md:py-6 lg:px-60 ${selectedFont} ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <Header />
      <SearchWordContextProvider>
        <SearchWord />
        <Result />
      </SearchWordContextProvider>
    </main>
  );
}
