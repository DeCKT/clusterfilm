import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

const backendHost = "http://localhost:5000";

async function getResult(type, id) {
  let newResult = await axios
    .get(`${backendHost}/${type}/${id}`)
    .then((resp) => {
      return resp.data;
    });
}

function openClusterAdder() {
  let modal = document.querySelector("#new-cluster-modal");
  modal.classList.remove("modal-closed");
  modal.classList.add("modal-open");
}

function closeClusterAdder() {
  let modal = document.querySelector("#new-cluster-modal");
  modal.classList.add("modal-closed");
  modal.classList.remove("modal-open");
}

function toggleAdder() {
  let adderContainer = document.querySelector("#cluster-adder-container");
  if (adderContainer.classList.contains("adder-open")) {
    adderContainer.classList.remove("adder-open");
    adderContainer.classList.add("adder-closed");
  } else if (adderContainer.classList.contains("adder-closed")) {
    adderContainer.classList.remove("adder-closed");
    adderContainer.classList.add("adder-open");
  }
}

const addCluster = async (email, title, film) => {
  let newCluster = axios.post(`${backendHost}/cluster/new`, {
    email: email,
    title: title,
  });
  let clusterId = (await newCluster).data.insertedId;
  axios.put(`${backendHost}/cluster/${clusterId}/add/${film.id}`, film);
};

const addFilmToCluster = async (film, clusterId) => {
  console.log(`Film: `);
  console.log(film);
  console.log(`Cluster: ${clusterId}`);
  axios.put(`${backendHost}/cluster/${clusterId}/add/${film.id}`, film);
};

function Result(props) {
  const params = useParams();

  const [result, setResult] = useState("Loading");

  useEffect(() => {
    const getResult = async (type, id) => {
      return await axios
        .get(`${backendHost}/search/${type}/${id}`)
        .then((resp) => {
          return resp.data;
        });
    };

    if (result === "Loading") {
      getResult(params.type, params.result_id).then((resp) => {
        console.log(resp);
        let resultsPage = (
          <div id="result">
            <div className="result-info">
              <h1>{resp.title || resp.name}</h1>

              {resp.release_date ? (
                <div>{moment(resp.release_date).format("MMMM Do, YYYY")}</div>
              ) : resp.birthday ? (
                <div>
                  {moment(resp.birthday).format("MMMM Do, YYYY")} -{" "}
                  {resp.deathday
                    ? moment(resp.deathday).format("MMMM Do, YYYY")
                    : "Living"}
                </div>
              ) : null}

              {resp.runtime ? (
                <div>
                  {Math.floor(resp.runtime / 60) +
                    "hr " +
                    (resp.runtime % 60) +
                    "mins"}
                </div>
              ) : null}

              {resp.genres ? (
                <ul className="genres-container">
                  {resp.genres.map((genre) => {
                    return (
                      <li className="genre-name" key={genre.id}>
                        {genre.name}
                      </li>
                    );
                  })}
                </ul>
              ) : null}

              {resp.overview ? (
                <p className="result-overview">{resp.overview}</p>
              ) : null}

              {params.type == "tv" || params.type == "movie" ? (
                <div className="add-to-container">
                  <button
                    className="add-to-button action-button"
                    onClick={() => {
                      toggleAdder();
                    }}
                  >
                    Add to Cluster
                  </button>
                  <div id="cluster-adder-container" className="adder-closed">
                    <ul>
                      {props.userClusters.map((cluster) => {
                        return (
                          <li
                            key={cluster.title}
                            onClick={() => {
                              addFilmToCluster(
                                {
                                  id: resp.id,
                                  poster: resp.poster_path,
                                  type: params.type,
                                  title: resp.title || resp.name,
                                },
                                cluster._id
                              );
                              toggleAdder();
                            }}
                          >
                            {cluster.title}
                          </li>
                        );
                      })}
                      <li
                        onClick={() => {
                          openClusterAdder();
                        }}
                      >
                        New cluster
                      </li>
                    </ul>
                  </div>
                  <div id="new-cluster-modal" className="modal-closed">
                    <div>
                      Title: <input id="new-cluster-title" type="text" />
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          addCluster(
                            props.userEmail,
                            document.querySelector("#new-cluster-title").value,
                            {
                              id: resp.id,
                              poster: resp.poster_path,
                              type: params.type,
                              title: resp.title || resp.name,
                            }
                          );
                          closeClusterAdder();
                          toggleAdder();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {resp.poster_path ? (
              <img src={imgBaseUrl + "w400" + resp.poster_path} />
            ) : resp.profile_path ? (
              <img src={imgBaseUrl + "w400" + resp.profile_path} />
            ) : null}
          </div>
        );
        setResult(resultsPage);
      });
    }
  });

  return <div>{result}</div>;
}

export default Result;
