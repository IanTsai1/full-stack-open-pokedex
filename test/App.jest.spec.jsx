import React from "react";
import { render, screen } from "@testing-library/react";
import axiosMock from "axios";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../src/App";

jest.mock("axios");

describe("<App />", () => {
  it("fetches data", async () => {
    // simulates an API call to get data for Bulbasaur
    axiosMock.get.mockResolvedValueOnce({
      data: {
        results: [
          {
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            name: "bulbasaur",
            id: 1,
          },
        ],
      },
    });
    // by adding await act, we ensure this is fully executed before we make assertions
    // like how many api calls is made and the api url
    await act(async () => {
      render(
        <Router>
          <App />
        </Router>,
      );
    });
    // make sure the api is only called once
    // make sure api url is correct
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/?limit=50",
    );
  });

  // if there's an error, it gracefully handles the error by informing the user
  it("shows error", async () => {
    axiosMock.get.mockRejectedValueOnce(new Error());
    await act(async () => {
      render(
        <Router>
          <App />
        </Router>,
      );
    });
    expect(screen.getByTestId("error")).toBeVisible();
  });
});
