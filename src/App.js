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
        path:'',
        icon:<Check/>
      },
      {
        name:'Settings',
        path:'Settings',
        icon:<SettingsIcon />
      }
    ]
    this.toggleNavigationBar= {
      open:()=>{
        this.setState({navigationBarOpen:true})
      },
      close:()=>{
        this.setState({navigationBarOpen:false})
      }
    }
  }
  render() {
    const {state,toggleNavigationBar,navigationBarOptions} = this;
    return (
      <div>
        <SwipeableDrawer open={state.navigationBarOpen} onOpen={toggleNavigationBar.open} onClose={toggleNavigationBar.close}>
          <List>
          {navigationBarOptions.map((tile, index) => (
            <Link to={`/${tile.path}`} key={index} style={{textDecoration:'none'}} onClick={toggleNavigationBar.close}>
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
          
            <Route exact path="/">
              <YourOrders toggleNavigationBar={this.toggleNavigationBar}/>
            </Route>
            <Route path="/Settings">
             <Settings toggleNavigationBar={this.toggleNavigationBar}/>
            </Route>
            
          </Switch>
      </div>
    );
  }
}
export default App;
