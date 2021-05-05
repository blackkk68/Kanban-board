import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import Board from './Components/Board/Board';
import Clients from './Components/Clients/Clients';
import Archive from './Components/Archive/Archive';
import GreetingScreen from './Components/GreetingScreen/GreetingScreen';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

function App() {
  const leastColumns = [
    {
      id: 123456789,
      heading: 'В работу',
      tasks: null,
      index: 1,
      deletable: false
    },
    {
      id: 1234567890,
      heading: 'Выполнено',
      tasks: null,
      index: 2,
      deletable: false
    }
  ];
  const [isLogined, setIsLogined] = useState(localStorage.getItem('userId') ? true : false);
  const [columns, setColumns] = useState(localStorage.getItem('columns') ? JSON.parse(localStorage.getItem('columns')) : leastColumns);
  const [clients, setClients] = useState(localStorage.getItem('clients') ? JSON.parse(localStorage.getItem('clients')) : []);
  const [archive, setArchive] = useState(localStorage.getItem('archive') ? JSON.parse(localStorage.getItem('archive')) : []);
  const userId = localStorage.getItem('userId');

  window.addEventListener('load', updateToken);

  async function updateToken() {
    if (isLogined) {
      const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
      const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
        refreshToken: localStorage.getItem('refreshToken'),
        grantType: "refresh_token"
      });
      const token = response.data['id_token'];
      const refreshToken = response.data['refresh_token'];
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  function updateIsLogined(bool) {
    setIsLogined(bool);
  }

  async function updateColumnsData(newColumns) {
    try {
      await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/${userId}/columns.json`, newColumns);
    } catch (err) {
      console.error('err: ', err);
    }
  }

  function updateColumns(newColumns) {
    setColumns(newColumns);
    updateColumnsData(newColumns);
    localStorage.setItem('columns', JSON.stringify(newColumns));
  }

  async function updateClientsData(newClients) {
    try {
      await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/${userId}/clients.json`, newClients);
    } catch (err) {
      console.error('err: ', err);
    }
  }

  function updateClients(newClients) {
    setClients(newClients);
    updateClientsData(newClients);
    localStorage.setItem('clients', JSON.stringify(newClients));
  }

  async function updateArchiveData(newArchive) {
    try {
      await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/${userId}/archive.json`, newArchive);
    } catch (err) {
      console.error('err: ', err);
    }
  }

  function updateArchive(newArchive) {
    setArchive(newArchive);
    localStorage.setItem('archive', JSON.stringify(newArchive));
    updateArchiveData(newArchive);
  }

  useEffect(() => {
    if (isLogined) {
      async function setDataFromServer() {
        const token = localStorage.getItem('token');

        const cls = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/${userId}/columns.json?auth=${token}`);
        setColumns(cls.data ? cls.data : leastColumns);
        localStorage.setItem('columns', JSON.stringify(columns));

        const clts = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/${userId}/clients.json?auth=${token}`);
        setClients(clts.data ? clts.data : []);
        localStorage.setItem('clients', JSON.stringify(clients));

        const arch = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/${userId}/archive.json?auth=${token}`);
        setArchive(arch.data ? arch.data : []);
        localStorage.setItem('archive', JSON.stringify(archive));
      }
      setDataFromServer();
    } else {
      localStorage.clear();
    }
  }, [isLogined]);

  return (
    <React.Fragment>
      <Header isLogined={isLogined} updateIsLogined={updateIsLogined} />
      <main>
        <Switch>
          {isLogined
            ? <React.Fragment>
              <Route path='/' exact render={() => <Board isLogined={isLogined} columns={columns} updateColumns={updateColumns} updateArchive={updateArchive} />} />
              <Route path='/clients' render={() => <Clients clients={clients} updateClients={updateClients} isLogined={isLogined} />} />
              <Route path='/archive' render={() => <Archive isLogined={isLogined} archive={archive} updateArchive={updateArchive} updateColumns={updateColumns} />} />
            </React.Fragment>
            : <GreetingScreen />
          }
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
