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

function Result() {
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

    getResult(params.type, params.result_id).then((resp) => {
      let resultsPage = (
        <div>
          <h2>{resp.title || resp.name}</h2>
          {resp.poster_path ? (
            <img src={imgBaseUrl + "w200" + resp.poster_path} />
          ) : resp.profile_path ? (
            <img src={imgBaseUrl + "w200" + resp.profile_path} />
          ) : null}
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
          {resp.overview ? <p>{resp.overview}</p> : null}
          {resp.genres ? (
            <ul>
              {resp.genres.map((genre) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
            </ul>
          ) : null}
        </div>
      );

      console.log(resp);
      setResult(resultsPage);
    });
  });

  return <div>{result}</div>;
}

export default Result;
