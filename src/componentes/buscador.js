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

      <div className="buscador-container input-group mb-3">
        <form onSubmit={handleSubmit}>
          <label>
            <input className="form-control input-text" type="text" name="pokemon" placeholder="Nombre o Id" value={pokemonName} onChange={handleChange} />
          </label>
          <input className="input submit btn btn-primary" type="submit" value="Buscar" />
        </form>
      </div>
    
  )
}

export default Buscador;