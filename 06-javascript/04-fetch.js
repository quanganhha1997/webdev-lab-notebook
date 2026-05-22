const pokemonColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#ea7ce8",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const pokemonContainer = document.querySelector("#pokemonContainer");
const searchInput = document.querySelector("#searchInput");

let pokemons = [];

const wait = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetchPokemons = async function () {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25");
    const data = await response.json();

    const pokemonPromises = data.results.map(async function (pokemon) {
      const response = await fetch(pokemon.url);
      return response.json();
    });

    pokemons = await Promise.all(pokemonPromises);

    // Fake delay so you can see the loading animation
    await wait(2000);

    displayPokemons(pokemons);
  } catch (error) {
    pokemonContainer.innerHTML =
      '<p class="no-results">Something went wrong while fetching Pokémon.</p>';
  }
};

const displayPokemons = function (pokemonList) {
  pokemonContainer.innerHTML = "";

  if (pokemonList.length === 0) {
    pokemonContainer.innerHTML =
      '<p class="no-results">No Pokémon matched your search.</p>';
    return;
  }

  pokemonList.forEach(function (pokemon) {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    const name = document.createElement("h2");
    name.textContent = pokemon.name;

    const image = document.createElement("img");
    image.src = pokemon.sprites.other["official-artwork"].front_default;
    image.alt = pokemon.name;

    const typesContainer = document.createElement("div");
    typesContainer.classList.add("types");

    pokemon.types.forEach(function (typeInfo) {
      const typeName = typeInfo.type.name;

      const type = document.createElement("span");
      type.classList.add("type");
      type.textContent = typeName;
      type.style.backgroundColor = pokemonColors[typeName];

      typesContainer.appendChild(type);
    });

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(typesContainer);

    pokemonContainer.appendChild(card);
  });
};

searchInput.addEventListener("input", function () {
  const searchQuery = searchInput.value.toLowerCase();

  const filteredPokemons = pokemons.filter(function (pokemon) {
    const nameMatch = pokemon.name.toLowerCase().includes(searchQuery);

    const typeMatch = pokemon.types.some(function (typeInfo) {
      return typeInfo.type.name.toLowerCase().includes(searchQuery);
    });

    return nameMatch || typeMatch;
  });

  displayPokemons(filteredPokemons);
});

fetchPokemons();
