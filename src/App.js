import React, { useEffect, useState } from 'react';
import api from './services/api'

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {

  const [devs, setDevs] = useState([]); //armazenar num vetor o vetor que vem da api com os dados de devs

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data)
    }

    loadDevs(); //chamando função assim que o useEffect for executando o get
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    console.log(response.data)

    setDevs([...devs, response.data]); //adiciona todos os devs já existente, depois adiciona o novo
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />

      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}

        </ul>
      </main>

    </div>
  );
}

export default App;
