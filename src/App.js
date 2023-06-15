import './App.css';
import Pokemon from './componentes/pokemon'
import Buscador from './componentes/buscador'
import Boton from './componentes/Boton'
import PokemonLogo from './imagenes/pokemon-logo.png';
import React, {useState, useEffect} from 'react';



function App() {
  
const [pokemonData, setPokemonData] = useState({nombre: '', detipo: '', imagen: '', identificador: 1, evoluciones: []});

useEffect(()=> {
getPokemon(pokemonData.identificador)
}, [pokemonData.identificador]);

async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  const pokemon = await response.json()

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
  const speciesData = await res.json()
  const evolutionUrl = speciesData.evolution_chain.url
  const evolutionRes = await fetch(evolutionUrl)
  const evolutionData = await evolutionRes.json()

  let evol;
  if (evolutionData.chain.evolves_to.length > 0) {
    evol = evolutionData.chain;
  }
  const evolutions = [];
  while (evol) {
    let id = evol.species.url.split("/")[6];
    
    evolutions.push({
      name:evol.species.name,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    });

    evol = evol.evolves_to.length > 0 ? evol.evolves_to[0] : undefined;
  }
  setPokemonData({
    nombre: pokemon.name,
    detipo: pokemon.types.map((type) => type.type.name),
    imagen: pokemon.sprites.other["official-artwork"].front_default,
    identificador: pokemon.id,
    evoluciones: evolutions,
  });
}

function obtenerPokemonAnterior () {
  getPokemon(pokemonData.identificador - 1)
}
function obtenerPokemonSiguiente () {
  getPokemon(pokemonData.identificador + 1)
}



const pokemonApp = []
  return (
    <div className="App">
      
        <div className="pokemon-logo-container">
            <img
              className="pokemon-logo"
              src={PokemonLogo}
              alt="logo de pokemon"
            />
        </div>

        
        <Buscador getPokemon={getPokemon} />
        

        <Pokemon 
        nombre= {pokemonData.nombre} 
        identificador={pokemonData.identificador} 
        imagen={pokemonData.imagen} 
        tipo={pokemonData.detipo} 
        detipo={pokemonData.detipo}
        evoluciones={pokemonData.evoluciones}
        />
  
        
          <div className='contenedor-botones'>
            <Boton 
              texto="Prev"
              BotonDeSiguiente={false}
              siguientePokemon={obtenerPokemonAnterior} 
              />

            <Boton 
              texto="Next"
              BotonDeSiguiente={true}
              siguientePokemon={obtenerPokemonSiguiente} 
              />
          </div>
    </div>
  );
}

export default App;
