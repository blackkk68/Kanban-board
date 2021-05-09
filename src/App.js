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

function App() {
  const [isLogined, setIsLogined] = useState(localStorage.getItem('userId') ? true : false);
  const [columns, setColumns] = useState(localStorage.getItem('columns') ? JSON.parse(localStorage.getItem('columns')) : leastColumns);
  const [clients, setClients] = useState(localStorage.getItem('clients') ? JSON.parse(localStorage.getItem('clients')) : []);
  const [archive, setArchive] = useState(localStorage.getItem('archive') ? JSON.parse(localStorage.getItem('archive')) : []);
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [spaces, setSpaces] = useState(localStorage.getItem('spaces') ? JSON.parse(localStorage.getItem('spaces')) : []);
  const [activeSpace, setActiveSpace] = useState(localStorage.getItem('activeSpace') ? JSON.parse(localStorage.getItem('activeSpace')) : '');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const history = useHistory();

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
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  function updateIsLogined(bool) {
    setIsLogined(bool);
  }

  function updateUserName(userName) {
    setUserName(userName);
  }

  // function updateSpaces(spaces) {
  //   setSpaces(spaces);
  // }

  function updateToken(token) {
    setToken(token);
  }

  function updateActiveSpace(activeSpace) {
    setActiveSpace(activeSpace);
  }

  async function updateColumnsData(newColumns) {
    try {
      await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/columns.json`, newColumns);
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
      await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/clients.json`, newClients);
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
      await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/archive.json`, newArchive);
    } catch (err) {
      console.error('err: ', err);
    }
  }

  function updateArchive(newArchive) {
    setArchive(newArchive);
    localStorage.setItem('archive', JSON.stringify(newArchive));
    updateArchiveData(newArchive);
  }

  async function updateSpacesData(newSpaces) {
    const userId = localStorage.getItem('userId');
    try {
      await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userId}/spaces.json`, newSpaces);
    } catch (err) {
      console.error('err: ', err);
    }
  }

  function updateSpaces(newSpaces) {
    setSpaces(newSpaces);
    localStorage.setItem('spaces', JSON.stringify(newSpaces));
    updateSpacesData(newSpaces);
  }

  useEffect(() => {
    if (isLogined) {
      async function setDataFromServer() {
        const colsData = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/columns.json?auth=${token}`);
        const newColumns = colsData.data ? colsData.data : leastColumns;
        setColumns(newColumns);
        localStorage.setItem('columns', JSON.stringify(newColumns));

        const clientsData = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/clients.json?auth=${token}`);
        const newClients = clientsData.data ? clientsData.data : [];
        setClients(newClients);
        localStorage.setItem('clients', JSON.stringify(newClients));

        const archiveData = await axios.get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${activeSpace.id}/archive.json?auth=${token}`);
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

  return (
    <React.Fragment>
      {isLogined
        ? <Header userName={userName} isLogined={isLogined} updateIsLogined={updateIsLogined} activeSpace={activeSpace} />
        : null}
      <main>
        <Switch>
          <React.Fragment>
            {isLogined
              ? <React.Fragment>
                <Route exact
                  path={`/${activeSpace.id}/`}
                  render={() => <Board isLogined={isLogined} columns={columns} updateColumns={updateColumns} updateArchive={updateArchive} />} />
                <Route exact
                  path={`/${activeSpace.id}/clients`}
                  render={() => <Clients clients={clients} updateClients={updateClients} isLogined={isLogined} />} />
                <Route exact
                  path={`/${activeSpace.id}/archive`}
                  render={() => <Archive isLogined={isLogined} archive={archive} updateArchive={updateArchive} updateColumns={updateColumns} />} />
                <Route exact
                  path='/spaces'
                  render={() => <Spaces updateSpaces={updateSpaces} updateActiveSpace={updateActiveSpace} />} />
              </React.Fragment>
              : null}
            <Route path='/login'
              render={() => <GreetingScreen
                updateIsLogined={updateIsLogined}
                updateUserName={updateUserName}
                updateSpaces={updateSpaces}
                updateActiveSpace={updateActiveSpace}
                updateToken={updateToken} />
              }
            />
          </React.Fragment>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
