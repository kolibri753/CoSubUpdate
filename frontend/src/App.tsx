import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { theme } = useThemeStore();

  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme={theme}
    >
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        {/* <Route path="/signUp" element={<SignUp />}></Route> */}
        {/* <Route path="/signIn" element={<SignIn />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
