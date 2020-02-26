import React from "react";
import { Player } from "video-react";
const MoviePreview = ({ movie }) => {
  return (
    <div className="movie-div m-3 hover-button">
      <Player
        playsInline
        poster="/assets/poster.png"
        src="https://api.themoviedb.org/3/movie/454626/videos?api_key=8a14b7ca9dafe32bc6fc708c1acce3f8&language=en-US"
      />
    </div>
  );
};

export default MoviePreview;
