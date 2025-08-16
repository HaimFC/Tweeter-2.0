import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { TweetsProvider } from "./context/TweetsContext.jsx";

function App() {
  return (
    <TweetsProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </TweetsProvider>
  );
}

export default App;