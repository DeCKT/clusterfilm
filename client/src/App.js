import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

import Footer from "./components/Footer";
import Home from "./components/home/Home";
import ComingSoon from "./components/coming-soon/ComingSoon";
import Suggested from "./components/suggested/Suggested";
import MyClusters from "./components/my-clusters/MyClusters";
import Profile from "./components/profile/Profile";
import Result from "./components/results/Result";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const backendHost = "http://localhost:5000";

let checkedDB = false;
let userExists = false;

const findUser = async (email) => {
  await axios.get(`${backendHost}/user/${email}`).then((resp) => {
    console.log(resp.data._id);
    if (resp.data._id) {
      userExists = true;
    }
    checkedDB = true;
  });
};

const addUser = async (email) => {
  await axios.get(`${backendHost}/user/add/${email}`).then((resp) => {
    console.log(`${email} added!`);
    userExists = true;
  });
};

const App = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      async function lookup() {
        await findUser(user.email);
        if (checkedDB && !userExists) {
          addUser(user.email);
        }
      }

      lookup();
    }
  });

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Home userEmail={isAuthenticated ? user.email : null} />}
        />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/suggested" element={<Suggested />} />
        <Route path="/my-clusters" element={<MyClusters />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/result/:type/:result_id" element={<Result />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
