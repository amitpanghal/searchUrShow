import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import MovieList from "../components/movies/MovieList";

const renderMovieProps = args => {
  const defaultArgs = {
    movies: [],
    handleClick: jest.fn()
  };
  return { ...defaultArgs, ...args };
};

describe("MovieList", () => {
  it("should render an movies", () => {
    const props = renderMovieProps({
      movies: [
        {
          id: 1,
          poster_path: "7GsM4mtM0worCtIVeiQt28HieeN.jpg",
          title: "abc",
          isFav: true,
          watchLater: false
        },
        {
          id: 2,
          poster_path: "7GsM4mtM0worCtIVeiQt28HiedN.jpg",
          title: "xyz",
          isFav: true,
          watchLater: false
        }
      ]
    });
    const tree = renderer.create(<MovieList {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should render an one movie if poster path is null", () => {
    const props = renderMovieProps({
      movies: [
        {
          id: 1,
          poster_path: "7GsM4mtM0worCtIVeiQt28HieeN.jpg",
          title: "abc",
          isFav: true,
          watchLater: false
        },
        {
          id: 2,
          poster_path: null,
          title: "xyz",
          isFav: true,
          watchLater: false
        }
      ]
    });
    const tree = renderer.create(<MovieList {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should check if fav and Watchlater buttons are added", () => {
    const props = renderMovieProps({
      movies: [
        {
          id: 1,
          poster_path: "7GsM4mtM0worCtIVeiQt28HieeN.jpg",
          title: "abc",
          isFav: true,
          watchLater: false
        }
      ]
    });
    const tree = mount(<MovieList {...props} />);
    expect(tree.find("button").length).toEqual(2);
  });

  it("should highlight fav button if movie is added to fav list", () => {
    const props = renderMovieProps({
      movies: [
        {
          id: 1,
          poster_path: "7GsM4mtM0worCtIVeiQt28HieeN.jpg",
          title: "abc",
          isFav: true,
          watchLater: false
        }
      ]
    });

    const tree = mount(<MovieList {...props} />);
    expect(tree.find(".selected").length).toEqual(1);
  });
});
