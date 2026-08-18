import { getRandomPokemon, postDiscoveredPokemon } from "./fetch-helpers";
import { renderPokemon, renderError, renderSuccess } from "./dom-helpers";

const getAndRenderPokemon = async () => {
    const pokemon = await getRandomPokemon();
    console.log(pokemon);
    if (pokemon.error) {
      renderError(pokemon.error);
    } else {
      renderPokemon(pokemon.data);
      renderSuccess(`${pokemon.data.name} was discovered!`);
    }
}

getAndRenderPokemon();

const button = document.querySelector('#discover-button');

button.addEventListener('click' , () => {
  getAndRenderPokemon();
});

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const success = document.querySelector('#success');
  const failed = document.querySelector('#error');
  const formValues = Object.fromEntries(new FormData(form));
  const { name, types, favorite } = formValues;
  formValues.favorite = Boolean(favorite);

  try {
    const formData = await postDiscoveredPokemon(formValues);
    if (formData.data) {
      success.textContent = `${formValues.name} has been captured!`;
    }
  }
  catch (error) {
    failed.textContent = 'Error: unable to capture Pokémon. Please try again';
  }

  form.reset();
});