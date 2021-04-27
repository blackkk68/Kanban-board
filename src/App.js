import React from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import Board from './Components/Board/Board';
import Clients from './Components/Clients/Clients';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact component={Board} />
          <Route path='/clients' component={Clients} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
