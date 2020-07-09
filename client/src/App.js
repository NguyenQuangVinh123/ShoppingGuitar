import React from 'react';
import { Switch,Route } from 'react-router-dom'

import Routes from './routes';
import AdminPage from './hoc/Admin/AdminPage';


function App() {
  return (
    <div>
      <Switch>
          <Route  path= "/webadmin"  ><AdminPage /></Route>
         <Routes />      

      </Switch>
    </div>
  );
}

export default App;
