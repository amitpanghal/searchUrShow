import React from "react";
import renderer from "react-test-renderer";
import Movie from "../components/movies/Movie";

describe("Movie", () => {
  it("should render an  image of movie poster", () => {
    const tree = renderer.create(
      <Movie
        movie={{ poster_path: "7GsM4mtM0worCtIVeiQt28HieeN.jpg" }}
        isLastMovie={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
