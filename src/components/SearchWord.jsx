import searchImg from "../assets/images/icon-search.svg";
import { useContext, useRef, useState } from "react";
import { FontDarkmodeContext } from "../context/FontDarkmodeContext.jsx";
import { getWordDefinition } from "../datafetch.js";
import { FaSpinner } from "react-icons/fa";
import { SearchWordContext } from "../context/SearchWordContext.jsx";

export default function SearchWord() {
  const { isDarkMode } = useContext(FontDarkmodeContext);
  const { setWordData } = useContext(SearchWordContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  async function searchWord(e) {
    e.preventDefault();

    setIsLoading(true);

    const word = inputRef.current.value;

    if (word.length === 0) {
      setIsLoading(false);
      return setErrorMsg("Please enter a word");
    }

    try {
      const data = await getWordDefinition(word);

      setWordData(data[0]);
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg(error.message);
    }

    setIsLoading(false);
    e.target.reset();
  }

  return (
    <section className="flex flex-col gap-y-2 items-center">
      <form
        className={`w-full px-4 py-2 flex gap-x-4 rounded-xl border-2 border-transparent ${
          isDarkMode ? "bg-zinc-800 text-white" : "bg-neutral-100 text-black"
        } ${
          errorMsg !== null
            ? "has-[:focus]:border-red-400"
            : "has-[:focus]:border-violet-400"
        }`}
        onSubmit={(e) => searchWord(e)}
      >
        <input
          type="text"
          className="w-full h-7 bg-inherit outline-none"
          ref={inputRef}
        />
        <FaSpinner
          className={`size-6 ${isLoading ? "block animate-spin" : "hidden"}`}
        />
        <button>
          <img
            src={searchImg}
            alt="search icon"
            className="hover:scale-125 active:scale-75 transition duration-300 ease"
          />
        </button>
      </form>
      {errorMsg && <p className="text-red-400 text-center">{errorMsg}</p>}
    </section>
  );
}
