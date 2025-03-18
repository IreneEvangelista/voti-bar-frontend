import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SalaChoice() {
  const [classifica, setClassifica] = useState([]);

  useEffect(() => {
    const fetchClassifica = async () => {
      try {
        const response = await axios.get('http://localhost:5000/classifica');
        setClassifica(response.data);
      } catch (error) {
        console.error('Errore:', error);
      }
    };
    fetchClassifica();
  }, []);

  return (
    <div>
      <h1>Benvenuto nel sistema di valutazione dei bar</h1>
      <Link to="/crea-sala">Crea una Sala</Link>
      <br />
      <Link to="/entra-sala">Accedi alla Sala</Link>

      <h2>Classifica Generale</h2>
      <ul>
        {classifica.map((item, index) => (
          <li key={index} style={{
            backgroundColor: index === 0 ? 'gold' : index === classifica.length - 1 ? 'red' : 'white',
          }}>
            {item.bar} - Media: {item.media.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalaChoice;