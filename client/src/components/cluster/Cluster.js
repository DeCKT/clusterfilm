import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useParams } from "react-router-dom";

const backendHost = "http://localhost:5000";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

const Cluster = () => {
  let { cluster_id } = useParams();
  let [cluster, setCluster] = useState();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCluster = async (id) => {
      let cluster = await axios
        .get(`${backendHost}/cluster/${id}`)
        .then((resp) => {
          setCluster(resp.data);
          setLoading(false);
          console.log(resp.data);
        });
    };

    if (!cluster) {
      getCluster(cluster_id);
    }
  });

  if (loading) {
    return <div className="loading-div">Loading...</div>;
  }

  return (
    <div id={"individual-cluster"}>
      <div className="individual-cluster-info">
        <h1>{cluster.title}</h1>
        <span>created by {cluster.creator}</span>
      </div>
      {/* <button>Edit</button> */}
      <div className="individual-cluster-film-scroller">
        <ul className="individual-cluster-film-container">
          {cluster.films.map((film) => {
            return (
              <li>
                <Link
                  className="individual-cluster-image"
                  to={`/result/${film.type}/${film.id}`}
                >
                  <img src={imgBaseUrl + "w300" + film.poster}></img>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Cluster;
