import Header from "./components/Header";
import Cards from "./components/Cards";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardDetails from "./components/CardDetails";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Toaster />
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/cart/:id' element={<CardDetails />} />
          <Route path='/*' element={<h2 style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textShadow: "0 0 5px red",
          }}>Please click on either Home or Add To Cart menu from the Header☝️</h2>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
