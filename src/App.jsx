import Header from "./components/Header"
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>

    </>
  )
}

export default App
