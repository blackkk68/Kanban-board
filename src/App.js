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
import { observer } from 'mobx-react';

const App = observer(() => {
  const [isLogined, setIsLogined] = useState(localStorage.getItem('userData') ? true : false);
  const history = useHistory();

  function logIn() {
    setIsLogined(true);
  }

  function logOut() {
    history.replace('/login');
    setIsLogined(false);
    localStorage.clear();
  }

  window.addEventListener('load', () => {
    if (isLogined && history.location.pathname.indexOf(`/${spacesStore.activeSpace.id}/`) === -1) {
      history.replace(`/${spacesStore.activeSpace.id}/`);
    }
    if (!isLogined) {
      history.replace('/login');
    }
  })

  return isLogined
    ? <React.Fragment>
      <Header isLogined={isLogined} logOut={logOut} />
      <main>
        <Switch>
          <Route exact path={`/${spacesStore.activeSpace.id}/`} component={Board} />
          <Route exact path={`/${spacesStore.activeSpace.id}/clients`} component={Clients} />
          <Route exact path={`/${spacesStore.activeSpace.id}/archive`} component={Archive} />
          <Route exact path='/spaces' component={Spaces} />
        </Switch>
      </main>
    </React.Fragment>
    : <Route path='/login' render={() => <GreetingScreen logIn={logIn} />} />
});

export default App;