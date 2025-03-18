import React from 'react';
import { useParams } from 'react-router-dom';
import VotiForm from './VotiForm';
import Classifica from './Classifica';

function Sala() {
const { codice } = useParams();

return (
<div>
<h1>Sala: {codice}</h1>
<VotiForm codice={codice} />
<Classifica codice={codice} />
</div>
);
}

export default Sala;