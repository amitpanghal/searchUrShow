import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import { ManageMovies } from "../components/movies/ManageMovies";

const renderMovieProps = args => {
  const defaultArgs = {
    searchedMovies: { results: [], total_pages: 0 },
    latestMovies: { results: [], total_pages: 0 },
    initialLoad: false,
    loadLatestMovies: jest.fn(),
    loadSearchedMovies: jest.fn(),
    resetQueriedMovies: jest.fn(),
    saveOrUpdateFavMovies: jest.fn(),
    saveOrUpdateWatchLaterMovies: jest.fn(),
    resetLatestMovies: jest.fn(),
    loadMoreSearchedMovies: jest.fn()
  };
  return { ...defaultArgs, ...args };
};

describe("ManageMovies", () => {
  it("should render child components with provided props", () => {
    const props = renderMovieProps({
      latestMovies: {
        results: [
          {
            id: 1,
            poster_path: "7GsM4mtM0worCtIVeiQt28HieeN.jpg",
            isFav: false,
            watchLater: false
          }
        ],
        total_pages: 1
      }
    });

    const tree = shallow(<ManageMovies {...props} />);

    expect(tree.find("SearchBox").length).toEqual(1);
    expect(tree.find("ForwardRef").props().movies.length).toEqual(1);
  });

  it("should render child components with provided props", () => {
    const props = renderMovieProps({
      latestMovies: {
        results: [
          {
            id: 1,
            poster_path: "7GsM4mtM0worCtIVeiQt28HieeN.jpg",
            isFav: false,
            watchLater: false
          }
        ],
        total_pages: 1
      },
      searchedMovies: {
        results: [
          {
            id: 1,
            poster_path: "7GsM4mtM0worCtIVeiQt28HieeN.jpg",
            isFav: true,
            watchLater: false
          },
          {
            id: 2,
            poster_path: "7GsM4mtM0worCtIVeiQt28HieeN.jpg",
            isFav: true,
            watchLater: false
          }
        ],
        total_pages: 0
      }
    });

    const tree = shallow(<ManageMovies {...props} />);

    expect(tree.find("SearchBox").length).toEqual(1);
    expect(tree.find("ForwardRef").props().movies.length).toEqual(1);
  });
});
