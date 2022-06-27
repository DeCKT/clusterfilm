import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

import Footer from "./components/Footer";
import Home from "./components/home/Home";
import ComingSoon from "./components/coming-soon/ComingSoon";
import Suggested from "./components/suggested/Suggested";
import MyClusters from "./components/my-clusters/MyClusters";
import Profile from "./components/profile/Profile";
import Result from "./components/results/Result";

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/suggested" element={<Suggested />} />
          <Route path="/my-clusters" element={<MyClusters />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/result/:type/:result_id" element={<Result />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;
