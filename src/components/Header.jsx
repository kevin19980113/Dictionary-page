/* eslint-disable react/no-unknown-property */
import arrowDown from "../assets/images/icon-arrow-down.svg";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { FontDarkmodeContext } from "../context/FontDarkmodeContext";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { selectedFont, setFont, isDarkMode, setDarkMode } =
    useContext(FontDarkmodeContext);

  const fontsList = {
    andika: '"Andika",sans-serif',
    lora: '"Lora", "serif',
    inconsolate: '"Inconsolata", monospace',
    inter: '"Inter", sans-serif',
  };

  const fonts = Object.keys(fontsList);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function toggleDarkMode() {
    setDarkMode();
  }

  useEffect(() => {
    document.getElementById("main").style.fontFamily = fontsList[selectedFont];
  });

  return (
    <header className="h-auto flex justify-between items-center">
      <a href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="30"
          viewBox="0 0 34 38"
          className={`cursor-pointer fill-none stroke-2 hover:stroke-purple-500${
            isDarkMode ? " stroke-slate-400" : " stroke-slate-500"
          }`}
        >
          <g strokeLinecap="round">
            <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28" />
            <path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8" />
            <path d="M11 9h12" />
          </g>
        </svg>
      </a>

      <section className="flex items-center gap-x-4">
        <div>
          <button
            className="w-28 px-1 flex items-center justify-end gap-x-2 hover:text-violet-600
        active:text-violet-950 relative"
            onClick={toggleDropdown}
          >
            <a
              className={`text-base font-semibold${
                isDarkMode ? " text-white" : " text-black"
              }`}
            >
              {selectedFont}
            </a>
            <img
              src={arrowDown}
              alt="arrowDown"
              className={`transition duration-300 linear ${
                isDropdownOpen ? "transform -rotate-180" : ""
              }`}
            />
          </button>
          <nav
            className={`dropdown-container absolute translate-y-4 grid grid-rows-none gap-y-2 transtion-all duration-300 ease rounded-lg${
              isDropdownOpen ? " dropdown-active p-4" : ""
            } ${isDarkMode ? "bg-zinc-900 text-white" : "bg-slate-100"}`}
          >
            <ul className="flex flex-col gap-y-2">
              {fonts.map((font) => (
                <li
                  key={font}
                  className={`px-2 py-1 font-base hover:bg-slate-200 rounded-md  cursor-pointer ${
                    isDarkMode
                      ? "hover:bg-zinc-800 active:bg-zinc-900"
                      : "hover:bg-slate-200 active:bg-slate-100"
                  }`}
                  onClick={() => {
                    setFont(font);
                    toggleDropdown();
                  }}
                >
                  {font}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className={`w-px py-6 ${isDarkMode ? "bg-white" : "bg-slate-400"}`}
        ></div>

        <div className="flex gap-x-6 items-center">
          <button
            className={`relative  w-12 h-7 rounded-3xl tansition-all duration-300 ease${
              isDarkMode ? " bg-violet-600" : " bg-gray-600"
            }`}
            onClick={toggleDarkMode}
          >
            <div
              className={`absolute bg-white size-5 rounded-full top-1 transition-all duration-300 ease${
                isDarkMode ? " left-6" : " left-1"
              }`}
            ></div>
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            className={`fill-none stroke-2 transition duration-300 ease ${
              isDarkMode ? "stroke-violet-600" : "stroke-slate-500"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
            />
          </svg>
        </div>
      </section>
    </header>
  );
}
