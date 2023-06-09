import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../hojas-de-estilo/pokemon.css';

function Pokemon({ nombre, imagen, tipo, identificador }) {

  return (
    <div className="card-container">
      <div className="card">
        
          <img className="card-img-top" src={imagen} alt={nombre} width="250" height="250" />
        
        <div className="card-body">
          <h5 className="card-title">{nombre} <span className="pokemon-id">#{identificador}</span></h5>
          
        </div>
      </div>
      <div className=''>
        <ul className="tipos-container list-group list-group-horizontal">
          
          <li className={`list-group-item ${tipo}`}><span className='tipo'>{tipo}</span></li>
          <li className={`list-group-item ${tipo}`}><span className='tipo'>{tipo}</span></li>
          <li className={`list-group-item ${tipo}`}><span className='tipo'>{tipo}</span></li>
        
      </ul>
      </div>
    </div>
  )
}

export default Pokemon;
