import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VotiForm({ codice }) {
  const [nomePersona, setNomePersona] = useState('');
  const [votes, setVotes] = useState({
    location: '',
    space: '',
    comfort: '',
    menu: '',
    music: '',
    parking: '',
    waiters: '',
    price: '',
    bathroom: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVotiEsistenti = async () => {
      try {
        const response = await axios.get(`https://voti-bar-backend-production.up.railway.app/voti/${codice}/${localStorage.getItem('nomePersona')}`);
        if (response.data) {
          setVotes(response.data.voti);
          setNomePersona(response.data.nomePersona);
        }
      } catch (error) {
        console.error('Errore nel recupero voti:', error);
      }
    };

    if (localStorage.getItem('nomePersona')) {
      setNomePersona(localStorage.getItem('nomePersona'));
      fetchVotiEsistenti();
    }
  }, [codice]);

  const handleChange = (e) => {
    setVotes({ ...votes, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://voti-bar-backend-production.up.railway.app/inviaVoti', {
        codice,
        nomePersona,
        votes,
      });
      alert('Voti inviati con successo!');
      localStorage.setItem('nomePersona', nomePersona);
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore nell\'invio dei voti');
    }
  };

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Inserisci i tuoi voti</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nomePersona}
          onChange={(e) => setNomePersona(e.target.value)}
          required
        />
        {Object.keys(votes).map((category) => (
          <div key={category}>
            <label>{category}:</label>
            <input
              type="number"
              name={category}
              value={votes[category]}
              onChange={handleChange}
              min="1"
              max="5"
              required={category !== 'bathroom'}
            />
          </div>
        ))}
        <button type="submit">Invia Voti</button>
        <button type="button" onClick={handleExit}>Esci</button>
      </form>
    </div>
  );
}

export default VotiForm;