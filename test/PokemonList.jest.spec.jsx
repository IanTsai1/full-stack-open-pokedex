import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import PokemonList from "../src/PokemonList";

const pokemonList = [
  {
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    name: "bulbasaur",
    id: 1,
  },
  {
    url: "https://pokeapi.co/api/v2/pokemon/133/",
    name: "eevee",
    id: 133,
  },
];

// given the pokemon list above, the PokemonList component should
// render bulbasaur and evee in the screen; check if everythign is displayed correctly
describe("<PokemonList />", () => {
  it("should render items", () => {
    render(
      <BrowserRouter>
        <PokemonList pokemonList={pokemonList} />
      </BrowserRouter>,
    );

    // check these two pokemon name text are visible on screen
    expect(screen.getByText("bulbasaur")).toBeVisible();
    expect(screen.getByText("eevee")).toBeVisible();
  });
});
