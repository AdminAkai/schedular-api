import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import EditProfile from './components/EditProfile'
import Messages from './components/Messages'
import CreateUser from './components/CreateUser'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/dashboard/edit/:id" component={EditProfile}></Route>
          <Route path="/dashboard/messages/:id" component={Messages}></Route>
          <Route path="/dashboard/createuser/:id" component={CreateUser}></Route>
          <Route path="/dashboard/:id" component={Dashboard}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
