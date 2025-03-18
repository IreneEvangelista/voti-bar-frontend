import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SalaForm({ crea }) {
  const [nomeBar, setNomeBar] = useState('');
  const [codice, setCodice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (crea) {
        response = await axios.post('http://localhost:5000/creaSala', { nomeBar });
        setCodice(response.data.codice);
      } else {
        response = await axios.post('http://localhost:5000/entraSala', { codice });
      }
      navigate(`/sala/${response.data.codice}`);
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore nella creazione/accesso alla sala');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {crea && (
        <input
          type="text"
          placeholder="Nome del bar"
          value={nomeBar}
          onChange={(e) => setNomeBar(e.target.value)}
        />
      )}
      {!crea && (
        <input
          type="text"
          placeholder="Codice della sala"
          value={codice}
          onChange={(e) => setCodice(e.target.value)}
        />
      )}
      <button type="submit">{crea ? 'Crea Sala' : 'Accedi'}</button>
    </form>
  );
}

export default SalaForm;