import Main from "./components/Main";
import FontDarkmodeContextProvider from "./context/FontDarkmodeContext";
function App() {
  return (
    <>
      <FontDarkmodeContextProvider>
        <Main />
      </FontDarkmodeContextProvider>
    </>
  );
}

export default App;
