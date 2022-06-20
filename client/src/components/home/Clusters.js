import React from "react";
import axios from "axios";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

const backendHost = "http://localhost:5000";

class Clusters extends React.Component {
  constructor() {
    super();
    this.state = {
      clusters: [
        {
          id: "1",
          name: "Korean Films",
          creator: {
            username: "DeCKT",
            id: "256",
          },
          films: [
            {
              name: "movie 1",
              id: "587",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 2",
              id: "346",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 1",
              id: "586",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 2",
              id: "326",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
          ],
        },
        {
          id: "2",
          name: "Best of Edgar Wright",
          creator: {
            username: "Mellwolf",
            id: "216",
          },
          films: [
            {
              name: "movie 1",
              id: "587",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 2",
              id: "346",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
          ],
        },
        {
          id: "3",
          name: "The Starwars Saga",
          creator: {
            username: "CF Team",
            id: "216",
          },
          films: [
            {
              name: "movie 1",
              id: "597",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 2",
              id: "316",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 1",
              id: "527",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 2",
              id: "116",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 1",
              id: "596",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 2",
              id: "319",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
          ],
        },
      ],
      user: {
        username: "DeCKT",
        id: "256",
        following: ["1", "2"],
      },
    };
  }

  render() {
    return (
      <div id="clusters">
        <ul className="clusters-container">
          {this.state.clusters.map((cluster) => {
            return (
              <li className="cluster-container" key={cluster.id}>
                <div className="cluster-info-container">
                  <ul className="cluster-info">
                    <li className="cluster-info-name">
                      <h2>{cluster.name}</h2>
                    </li>
                    <li className="cluster-info-creator">
                      by <a href="">{cluster.creator.username}</a>
                    </li>
                    <li>{cluster.films.length} films</li>
                  </ul>
                  <ul className="cluster-buttons">
                    <li>
                      <button className="action-button" href="">
                        View
                      </button>
                    </li>
                    <li>
                      {cluster.creator.id === this.state.user.id ? (
                        <button className="action-button edit-button" href="">
                          Edit
                        </button>
                      ) : this.state.user.following.includes(cluster.id) ? (
                        <button className="action-button" href="">
                          Unfollow
                        </button>
                      ) : (
                        <button className="action-button follow-button" href="">
                          Follow
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
                <div className="cluster-film-images">
                  <ul className="cluster-film-image-container">
                    {cluster.films.map((film) => {
                      return (
                        <li key={film.id} className="cluster-film-image">
                          <img src={imgBaseUrl + "w300" + film.image_path} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      // <div id="my-clusters">
      //   <ul className="cluster-info">
      //     <li>
      //       <h2 className="cluster-title">{this.state.cluster.name}</h2>
      //     </li>
      //     <li className="cluster-info-name">by {this.state.username}</li>
      //     <li className="cluster-info-count">
      //       {this.state.cluster.items.length} films
      //     </li>
      //     <li className="cluster-info-buttons">
      //       <button>View</button>
      //       <button>
      //         {this.state.cluster.creator.username === this.state.loggedInUser
      //           ? "Edit"
      //           : this.state.following
      //           ? "Unfollow"
      //           : "Follow"}
      //       </button>
      //     </li>
      //   </ul>
      //   <ul className="cluster-container">
      //     {this.state.cluster.items.map((item) => {
      //       return (
      //         <li className="cluster-item" key={item.id}>
      //           <img src={imgBaseUrl + "w300" + item.image_path} />
      //         </li>
      //       );
      //     })}
      //     {this.state.cluster.items.length > 3 ? null : <li>Add new</li>}
      //   </ul>
      // </div>
    );
  }
}

export default Clusters;
