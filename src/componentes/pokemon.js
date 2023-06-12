import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../hojas-de-estilo/pokemon.css';
import getPokemon from '../App'


function Pokemon({ nombre, imagen, tipo, identificador, detipo, imagenDeEvolucion}) {

  return (
    <div className="card-container">
      <div className="card">
          <img className="card-img-top" src={imagen} alt={nombre} width="250" height="250" />
        
        <div className="card-body">
          <h5 className="card-title">{nombre} <span className="pokemon-id">#{identificador}</span></h5>
          
        </div>
      </div>
      <div className=''>
        {detipo.length === 2 ? (
          <ul className="tipos-container list-group list-group-horizontal">
            <li className={`list-group-item ${tipo[0]}`}><span className='tipo'>{tipo[0]}</span></li>
            <li className={`list-group-item ${tipo[1]}`}><span className='tipo'>{tipo[1]}</span></li>
          </ul>
        ) : (
          <ul className="tipos-container list-group list-group-horizontal">
            <li className={`list-group-item ${tipo}`}><span className='tipo'>{tipo}</span></li>
          </ul>
        )}
  {/* creo que solo me hace falta mapear algo pero aun no se que es */}
          
          

          <img width="90px" src={imagenDeEvolucion}/>
          <img width="90px" src={imagenDeEvolucion}/>
          <img width="90px" src={imagenDeEvolucion}/>
        
    
      
      
      </div>
    </div>
  )
}
export default Pokemon;
