import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import Board from './Components/Board/Board';
import Clients from './Components/Clients/Clients';
import Archive from './Components/Archive/Archive';
import Spaces from './Components/Spaces/Spaces';
import GreetingScreen from './Components/GreetingScreen/GreetingScreen';
import { Route, Switch, useHistory } from 'react-router-dom';
import { leastColumns } from './StaticData';
import axios from 'axios';
import { updateToken } from './UpdateToken';

function App() {
  const [isLogined, setIsLogined] = useState(localStorage.getItem('userData') ? true : false);
  const [columns, setColumns] = useState(localStorage.getItem('columns') ? JSON.parse(localStorage.getItem('columns')) : leastColumns);
  const [clients, setClients] = useState(localStorage.getItem('clients') ? JSON.parse(localStorage.getItem('clients')) : []);
  const [archive, setArchive] = useState(localStorage.getItem('archive') ? JSON.parse(localStorage.getItem('archive')) : []);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  const [spaces, setSpaces] = useState(localStorage.getItem('spaces') ? JSON.parse(localStorage.getItem('spaces')) : []);
  const [activeSpace, setActiveSpace] = useState(localStorage.getItem('activeSpace') ? JSON.parse(localStorage.getItem('activeSpace')) : '');
  const [tokenData, setTokenData] = useState(localStorage.getItem('tokenData') ? JSON.parse(localStorage.getItem('tokenData')) : {});
  const history = useHistory();

  function updateIsLogined(bool) {
    setIsLogined(bool);
  }

  function updateUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
    setUserData(userData);
  }

  function updateTokenData(tokenData) {
    localStorage.setItem('tokenData', JSON.stringify(tokenData));
    setTokenData(tokenData);
  }

  async function updateColumns(newColumns) {
    try {
      updateTokenData(updateToken(tokenData));
      setColumns(newColumns);
      await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/columns.json`, newColumns);
      localStorage.setItem('columns', JSON.stringify(newColumns));
    } catch (err) {
      console.error('err: ', err);
    }
  }

  async function updateClients(newClients) {
    try {
      updateTokenData(updateToken(tokenData));
      setClients(newClients);
      await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/clients.json`, newClients);
      localStorage.setItem('clients', JSON.stringify(newClients));
    } catch (err) {
      console.error('err: ', err);
    }
  }

  async function updateArchive(newArchive) {
    try {
      updateTokenData(updateToken(tokenData));
      setArchive(newArchive);
      await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/archive.json`, newArchive);
      localStorage.setItem('archive', JSON.stringify(newArchive));
    } catch (err) {
      console.error('err: ', err);
    }
  }

  async function updateSpaces(newSpaces, newActiveSpace) {
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    console.log(userData);
    try {
      updateTokenData(updateToken(tokenData));
      setSpaces(newSpaces);
      await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userId}/spaces.json`, newSpaces);
      localStorage.setItem('spaces', JSON.stringify(newSpaces));
      if (newActiveSpace) {
        setActiveSpace(newActiveSpace);
        localStorage.setItem('activeSpace', JSON.stringify(newActiveSpace));
      }
    } catch (err) {
      console.error('err: ', err);
    }
  }

  useEffect(() => {
    if (isLogined) {
      updateTokenData(updateToken(tokenData));
      async function setDataFromServer() {
        const colsData = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/columns.json?auth=${tokenData.token}`);
        const newColumns = colsData.data ? colsData.data : leastColumns;
        setColumns(newColumns);
        localStorage.setItem('columns', JSON.stringify(newColumns));

        const clientsData = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/clients.json?auth=${tokenData.token}`);
        const newClients = clientsData.data ? clientsData.data : [];
        setClients(newClients);
        localStorage.setItem('clients', JSON.stringify(newClients));

        const archiveData = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/archive.json?auth=${tokenData.token}`);
        const newArchive = archiveData.data ? archiveData.data : [];
        setArchive(newArchive);
        localStorage.setItem('archive', JSON.stringify(newArchive));
      }
      setDataFromServer();
    } else {
      localStorage.clear();
      history.replace('/login');
    }
  }, [isLogined, activeSpace]);

  return isLogined
    ? <React.Fragment>
      <Header userData={userData} isLogined={isLogined} updateIsLogined={updateIsLogined} activeSpace={activeSpace} />
      <main>
        <Switch>
          <Route exact
            path={`/${activeSpace.id}/clients`}
            render={() => <Clients clients={clients} updateClients={updateClients} isLogined={isLogined} />} />
          <Route exact
            path={`/${activeSpace.id}/archive`}
            render={() => <Archive isLogined={isLogined} archive={archive} updateArchive={updateArchive} updateColumns={updateColumns} />} />
          <Route exact
            path='/spaces'
            render={() => <Spaces spaces={spaces} activeSpace={activeSpace} updateSpaces={updateSpaces} />} />
          <Route exact
            path={`/${activeSpace.id}/`}
            render={() => <Board isLogined={isLogined} columns={columns} updateColumns={updateColumns} updateArchive={updateArchive} />} />
        </Switch>
      </main>
    </React.Fragment>
    : <Route path='/login'
      render={() => <GreetingScreen
        updateIsLogined={updateIsLogined}
        updateUserData={updateUserData}
        updateSpaces={updateSpaces}
        updateTokenData={updateTokenData} />
      }
    />
}

export default App;