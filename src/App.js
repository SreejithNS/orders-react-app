import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider'

import { Switch, Route, Link } from 'react-router-dom';
import Settings from './pages/Settings';
import YourOrders from './pages/YourOrders';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigationBarOpen: false
    }
    this.navigationBarOptions = [
      {
        name:'Your orders',
        path:'YourOrders',
        icon:<Check/>
      },
      {
        name:'Settings',
        path:'Settings',
        icon:<SettingsIcon />
      }
    ]
    this.toggle= {
      open:()=>{
        this.setState({navigationBarOpen:true})
      },
      close:()=>{
        this.setState({navigationBarOpen:false})
      }
    }
  }
  render() {
    const {state,toggle,navigationBarOptions} = this;
    return (
      <div>
        <SwipeableDrawer open={state.navigationBarOpen} onOpen={toggle.open} onClose={toggle.close}>
          <List>
          {navigationBarOptions.map((tile, index) => (
            <Link to={`/${tile.path}`} key={index}>
            <ListItem button key={tile.name}>
              <ListItemIcon>{tile.icon}</ListItemIcon>
              <ListItemText primary={tile.name} />
            </ListItem>
            </Link>
          ))}
          </List>
          <Divider/>
        </SwipeableDrawer>

        <Switch>
          
            <Route path="/YourOrders" component={YourOrders}/>
            <Route path="/Settings" component={Settings}/>
          
          </Switch>
      </div>
    );
  }
}
export default App;
