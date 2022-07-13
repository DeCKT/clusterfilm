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
import Cluster from "./components/cluster/Cluster";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const backendHost = "http://localhost:5000";

const findUser = async (email) => {
  return await axios.get(`${backendHost}/user/${email}`).then((resp) => {
    if (resp.data._id) {
      return true;
    } else {
      return false;
    }
  });
};

const addUser = async (email) => {
  await axios.get(`${backendHost}/user/add/${email}`).then((resp) => {
    console.log(`${email} added!`);
  });
};

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const [clusters, setClusters] = useState();
  const [loaded, setLoaded] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      async function lookup() {
        console.log("Checking database for " + user.email);
        if (await findUser(user.email)) {
          console.log("Found " + user.email);
          setHasUser(true);
        } else {
          console.log("Unable to find " + user.email);
        }
        setHasChecked(true);
      }

      async function insertUser() {
        console.log("Inserting " + user.email);
        await addUser(user.email);
      }

      async function getClusters(email) {
        await axios.get(`${backendHost}/cluster/user/${email}`).then((resp) => {
          if (resp.data.length > 0) {
            setClusters(resp.data);
          } else {
            setClusters([]);
          }
          setLoaded(true);
        });
      }

      async function clusters() {
        await getClusters(user.email);
      }

      if (!hasUser && !hasChecked) {
        lookup();
      }

      if (!hasUser && hasChecked) {
        insertUser();
        lookup();
      }

      if (!loaded) {
        clusters();
      }
    }
  });

  return (
    <>
      <NavBar />
      {loaded ? (
        <Routes>
          <Route
            path="/"
            element={
              <Home
                userEmail={isAuthenticated ? user.email : null}
                userClusters={clusters}
              />
            }
          />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/suggested" element={<Suggested />} />
          <Route
            path="/my-clusters"
            element={<MyClusters userClusters={clusters} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/result/:type/:result_id"
            element={
              <Result
                userClusters={clusters}
                userEmail={isAuthenticated ? user.email : null}
              />
            }
          />
          <Route
            path="/cluster/:cluster_id"
            element={
              <Cluster
                userClusters={clusters}
                userEmail={isAuthenticated ? user.email : null}
                edit={false}
              />
            }
          />
          <Route
            path="/cluster/:cluster_id/edit"
            element={
              <Cluster
                userClusters={clusters}
                userEmail={isAuthenticated ? user.email : null}
                edit={true}
              />
            }
          />
        </Routes>
      ) : (
        <div className="loading-div">Loading...</div>
      )}

      <Footer />
    </>
  );
};

export default App;
