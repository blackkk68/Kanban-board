import React, { useState } from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import Board from './Components/Board/Board';
import Clients from './Components/Clients/Clients';
import Archive from './Components/Archive/Archive';
import Spaces from './Components/Spaces/Spaces';
import GreetingScreen from './Components/GreetingScreen/GreetingScreen';
import { Route, Switch, useHistory } from 'react-router-dom';
import spacesStore from './Store/spaces';
import tokenDataStore from './Store/tokenData';
import columnsStore from './Store/columns';
import clientsStore from './Store/clients';
import archiveStore from './Store/archive';
import { leastColumns } from './Other/Data';
import { observer } from 'mobx-react';
import axios from 'axios';

const App = observer(() => {
  const [isLogined, setIsLogined] = useState(localStorage.getItem('userData') ? true : false);
  const history = useHistory();

  function logOut() {
    setIsLogined(false);
    localStorage.clear();
    history.replace('/login');
  }

  async function setDataFromServer() {
    const columnsData = await axios.get(`
    https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${spacesStore.activeSpace.id}/columns.json?auth=${tokenDataStore.tokenData.token}`);
    const newColumns = columnsData.data ? columnsData.data : leastColumns;
    columnsStore.updateColumns(newColumns);

    const clientsData = await axios.get(`
    https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${spacesStore.activeSpace.id}/clients.json?auth=${tokenDataStore.tokenData.token}`);
    const newClients = clientsData.data ? clientsData.data : [];
    clientsStore.updateClients(newClients);

    const archiveData = await axios.get(`
    https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${spacesStore.activeSpace.id}/archive.json?auth=${tokenDataStore.tokenData.token}`);
    const newArchive = archiveData.data ? archiveData.data : [];
    archiveStore.updateArchive(newArchive);

    setIsLogined(true);
  }

  return isLogined
    ? <React.Fragment>
      <Header isLogined={isLogined} logOut={logOut} />
      <main>
        <Switch>
          <Route exact path='/spaces' render={() => <Spaces setDataFromServer={setDataFromServer} />} />
          <Route exact path={`/${spacesStore.activeSpace.id}/clients`} render={() => <Clients />} />
          <Route exact path={`/${spacesStore.activeSpace.id}/archive`} render={() => <Archive />} />
          <Route exact path={`/${spacesStore.activeSpace.id}/`} render={() => <Board />} />
        </Switch>
      </main>
    </React.Fragment>
    : <Route path='/login' render={() => <GreetingScreen setDataFromServer={setDataFromServer} />} />
});

export default App;