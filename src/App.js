import React ,{Component}from 'react';
// import {Button} from 'antd'
import {Route,Switch,Redirect} from 'react-router-dom'

import Adm from './paget/Adm/Adm'
import Login from './paget/Login/Login'


export default class App extends Component {
    render() {
      return (
              <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/admin" component={Adm}/>
                <Redirect to="/login"/>
              </Switch>
      )
  }
}
