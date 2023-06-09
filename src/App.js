import './App.css';
import Pokemon from './componentes/pokemon'
import Buscador from './componentes/buscador'
import Boton from './componentes/Boton'
import PokemonLogo from './imagenes/pokemon-logo.png';
import React, {useState, useEffect} from 'react';


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
    detipo: data.types[0].type.name, 
    imagen: data.sprites.other["official-artwork"].front_default, 
    identificador: data.id})
};

// creamos la logica para los botones de prev y next

function obtenerPokemonSiguiente() {
  getPokemon(pokemonData.identificador + 1);
}
function obtenerPokemonAnterior() {
  getPokemon(pokemonData.identificador - 1)
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
        

        <Pokemon nombre= {pokemonData.nombre} identificador={pokemonData.identificador} imagen={pokemonData.imagen} tipo={pokemonData.detipo} />
        
        <div className="contenedor-botones">
          <Boton 
            texto="Prev"
            BotonDeSiguiente={false}
            siguientePokemon={obtenerPokemonAnterior} />

          <Boton 
            texto="Next"
            BotonDeSiguiente={true}
            siguientePokemon={obtenerPokemonSiguiente} />
        </div>
      </div> 
    </div>
  );
}

export default App;
