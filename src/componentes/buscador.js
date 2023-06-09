import React, {useState} from "react";
import '../hojas-de-estilo/buscador.css'


function Buscador(props) {
  const [pokemonName, setPokemonName] = useState("")

  function handleSubmit(event) {
    event.preventDefault();
    // toLowerCase y expresion regular para hacer el buscador mas flexible
    const pokemonNameLowercase = pokemonName.toLowerCase();
    props.getPokemon(pokemonNameLowercase);
  }

  function handleChange(event) {
    setPokemonName(event.target.value)
  }

  return (

      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" name="pokemon" value={pokemonName} onChange={handleChange} />
        </label>
        <input type="submit" value="Buscar" />
      </form>
    
  )
}

export default Buscador;