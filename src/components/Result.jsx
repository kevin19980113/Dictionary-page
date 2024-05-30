import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { useContext, useState, useRef, useEffect } from "react";
import { SearchWordContext } from "../context/SearchWordContext.jsx";
import { FontDarkmodeContext } from "../context/FontDarkmodeContext.jsx";

export default function Result() {
  const [isplaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { isDarkMode } = useContext(FontDarkmodeContext);
  const { searchWordData } = useContext(SearchWordContext);

  useEffect(() => {
    const audio = audioRef.current;
    const handleAudioEnd = () => {
      setIsPlaying(false);
    };

    if (audio) {
      audio.addEventListener("ended", handleAudioEnd);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleAudioEnd);
      }
    };
  }, [searchWordData]);

  function play() {
    if (!isplaying) {
      if (searchWordData.phonetics[0].audio !== "") {
        audioRef.current.play();
        setIsPlaying(!isplaying);
      }
    }
  }

  if (searchWordData === "") return null;

  let textColor = isDarkMode ? "text-white" : "text-black";

  return (
    <section className="flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start gap-y-2">
          <h1 className={`text-4xl font-bold ${textColor}`}>
            {searchWordData["word"]}
          </h1>
          <p className="text-lg text-purple-600">
            {searchWordData["phonetic"]}
          </p>
        </div>
        <button
          className="size-14 bg-purple-200 rounded-full hover:bg-purple-300 active:bg-purple-200"
          onClick={play}
        >
          {!isplaying && (
            <FaPlay className="size-5 fill-purple-600 mx-auto translate-x-0.5" />
          )}
          {isplaying && <FaPause className="size-7 fill-purple-600 mx-auto" />}
        </button>
        <audio ref={audioRef} src={searchWordData.phonetics[0].audio} />
      </div>

      <div className="w-full flex flex-col gap-y-6">
        {searchWordData["meanings"].map((meaning) => {
          return (
            <div
              className="w-full flex flex-col gap-y-8"
              key={meaning + Math.random()}
            >
              <div className="w-full flex items-center gap-x-4">
                <p className={`italic font-semibold ${textColor}`}>
                  {meaning.partOfSpeech}
                </p>
                <span className="w-full bg-slate-200 h-px"></span>
              </div>

              <p className="-mb-2 text-stone-500 font-medium">Meaning</p>

              <ul className="space-y-4 list-disc marker:text-purple-600 list-inside">
                {meaning.definitions.map((el) => {
                  if ("example" in el) {
                    return (
                      <div
                        key={el.definition + el.example}
                        className="flex flex-col gap-y-2"
                      >
                        <li key={el.definition} className={`${textColor}`}>
                          {el.definition}
                        </li>
                        <q
                          className="text-gray-400 font-medium pl-6"
                          key={el.example}
                        >
                          {el.example}
                        </q>
                      </div>
                    );
                  }
                  return (
                    <li key={el.definition} className={`${textColor}`}>
                      {el.definition}
                    </li>
                  );
                })}
              </ul>

              {meaning.synonyms.length !== 0 && (
                <div className="flex gap-x-8 items-center">
                  <p className="text-stone-500 font-medium">Synonyms</p>

                  <p className="text-purple-600 font-semibold">
                    {meaning.synonyms.join(", ")}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <hr />

      <div className="flex flex-col gap-y-2 text-stone-500 font-medium text-sm">
        <p>Source</p>
        <a
          href={searchWordData.sourceUrls}
          target="_blank"
          className="underline decoration-solid decoration-1 decoration-stone-500 
          hover:text-purple-400 active:text-stone-500"
        >
          {searchWordData.sourceUrls}
        </a>
      </div>
    </section>
  );
}
