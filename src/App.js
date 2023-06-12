import './App.css';
import Pokemon from './componentes/pokemon'
import Buscador from './componentes/buscador'
import Boton from './componentes/Boton'
import PokemonLogo from './imagenes/pokemon-logo.png';
import React, {useState, useEffect} from 'react';



function App() {
  
const [pokemonData, setPokemonData] = useState({nombre: '', detipo: '', imagen: '', identificador: 1, evoluciones: []});

useEffect(() => {
getPokemon(pokemonData.identificador);
}, [])

async function getPokemon (name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  const data = await response.json()
  setPokemonData({
    nombre: data.name, 
    detipo: data.types.map(type => type.type.name),
    imagen: data.sprites.other["official-artwork"].front_default, 
    identificador: data.id,
    evoluciones: await getEvolutions(data.id)
  })
};

// /// funcion para obtener cadena evolutiva ///

const [pokemonEvolution, setpokemonEvolution] = useState({identificador: 1});

useEffect (()=>{
  getEvolutions(pokemonEvolution.identificador)
}, [])

async function getEvolutions(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
  const evolutionData = await res.json()
  const evolutionUrl = evolutionData.evolution_chain.url
  const chainRes = await fetch(evolutionUrl)
  const chainData = await chainRes.json()

  const arrayEvoluciones = []
  let pokemonTrigger = chainData.chain
  while (pokemonTrigger) {
    arrayEvoluciones.push(pokemonTrigger.species.name)
    pokemonTrigger = pokemonTrigger.evolves_to[0]
  }
  setpokemonEvolution(arrayEvoluciones)
  return arrayEvoluciones;
};



// FUNCION PARA OBTENER LA RUTA DE LA IMAGEN DE LAS EVOLUCIONES?????
function imgEvo (name) {
  const arrayImg = []
  if (name == pokemonData.nombre) {
    arrayImg.push(pokemonData.imagen)
  } else if (pokemonEvolution.includes(name)) {
    arrayImg.push(pokemonData.imagen)
  }
  console.log(arrayImg)
  return arrayImg;
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
          <Buscador getPokemon={getPokemon} />
        </div>
      <div className='contenedor-principal'> 
        

        <Pokemon nombre= {pokemonData.nombre} identificador={pokemonData.identificador} imagen={pokemonData.imagen} tipo={pokemonData.detipo} detipo={pokemonData.detipo}  imagenDeEvolucion={imgEvo(pokemonData.nombre)}
        />
  
        <div className="contenedor-botones">
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
    </div>
  );
}

export default App;
