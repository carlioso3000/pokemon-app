import React from "react";
import '../hojas-de-estilo/boton.css';

function Boton({ texto, BotonDeSiguiente, siguientePokemon }) {
  return (
    
      <button
      className= {BotonDeSiguiente ? "boton-siguiente btn btn-primary" : "boton-anterior btn btn-primary"}
      onClick={siguientePokemon}>
      {texto}
      </button>
    )
}

export default Boton;