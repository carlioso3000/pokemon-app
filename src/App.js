import './App.css';
import Pokemon from './componentes/pokemon'
import Buscador from './componentes/buscador'
import Boton from './componentes/Boton'
import PokemonLogo from './imagenes/pokemon-logo.png';
import React, {useState, useEffect} from 'react';
import Evoluciones from './componentes/evoluciones';


function App() {
  
const [pokemonData, setPokemonData] = useState({nombre: '', detipo: '', imagen: '', identificador: 1});

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
    identificador: data.id})
};

// ////////////////////////////////////////////////// funcion para obtener cadena evolutiva ///////////////////////////////////////////////////

const [pokemonEvolution, setpokemonEvolution] = useState({evolucion1: '', evolucion2:"", evolucion3:"", evoImagen: "", identificador: 1});

useEffect (()=>{
  getEvolutions(pokemonEvolution.identificador)
}, [])

async function getEvolutions(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
  const evolutionData = await res.json()

  setpokemonEvolution({
    evolucion1: evolutionData.chain.species.name,
    evolucion2: evolutionData.chain.evolves_to[0].species.name,
    evolucion3: evolutionData.chain.evolves_to[0].evolves_to[0].species.name,
    evoImagen: evolutionData.chain.species.name
  })
};

/*
async function evoluciones(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`)
  const speciesData = await res.json()

  const evolutionChain = await fetch(speciesData.evolution_chain.url)
  const evolutionData = await evolutionChain.json()
  const evolution = []

  function recorrerEvoluciones(chain) {
    evolution.push(chain.species.name)

    if (chain.evolves_to.length > 0 ) {
      recorrerEvoluciones(chain.evolves_to[0])
    }
  }

  recorrerEvoluciones(evolutionData.chain)
  return evolution;
}
*/
//evoluciones('rattata').then(evolucionesPokemon => console.log(evolucionesPokemon))

// creamos la logica para los botones de prev y next

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
        

        <Pokemon nombre= {pokemonData.nombre} identificador={pokemonData.identificador} imagen={pokemonData.imagen} tipo={pokemonData.detipo} detipo={pokemonData.detipo} />
        
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

        <Evoluciones 
          nombre1= {pokemonEvolution.evolucion1} nombre2={pokemonEvolution.evolucion2} nombre3={pokemonEvolution.evolucion3}
        />
      </div> 
    </div>
  );
}

export default App;
