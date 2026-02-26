export const getRandomPokemon = async () => {
  try {
    const id = Math.floor(Math.random() * 150) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }

    const { data } = await response.json();

    const pokemonObj = [
      {
        name: data.name,
        types: data.types.map((t) => t.type.name).join(", "),
        sprite: data.sprites.front_default,
      },
    ];

    return { data: [pokemonObj], error: null };

  } catch (error) {
    console.log(`Error: ${error.message}`);
    return { data: null, error: error };
  }
};

export const postDiscoveredPokemon = async (formData) => {
    const config = {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    try {
        const response = await fetch('https://formspree.io/f/xeelaoar', config);

        if (!response.ok) {
            throw Error(`Failed to submit. ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        return { data: responseData, error: null };
    }
    catch (error) {
        return { data: null, error };
    }
}