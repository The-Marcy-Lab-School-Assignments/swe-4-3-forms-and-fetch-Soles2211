const pokeList = document.querySelector('#discovered-list');
const error = document.querySelector('#error');
const success = document.querySelector('#success');

export const renderPokemon = (pokemonObj) => {
    pokeList.innerHTML = "";

    pokemonObj.forEach((pokemon) => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = pokemon.sprite;
    img.alt = pokemon.name;

    const h3 = document.createElement("h3");
    h3.textContent = pokemon.name;

    const p = document.createElement('p');
    p.textContent = pokemon.types;

    li.append(img, h3, p);
    pokeList.append(li);
  });
}

export const renderError = (msg) => {
  error.textContent = msg;
};

export const renderSuccess = (msg) => {
  success.textContent = msg;
};