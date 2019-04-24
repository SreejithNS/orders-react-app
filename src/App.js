import React, { Component } from 'react';
import {List,ListItem,ListItemIcon,ListItemText,Divider,SwipeableDrawer} from '@material-ui/core';
import {Check} from '@material-ui/icons';
import {Settings as SettingsIcon} from '@material-ui/icons';


import { Switch, Route, Link } from 'react-router-dom';
import Settings from './pages/Settings';
import YourOrders from './pages/YourOrders';

import {connect} from 'react-redux'

class App extends Component {

    sideMenuOptions = [
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

  render() {
    const {props,sideMenuOptions} = this;
    return (
      <div>
        <SwipeableDrawer open={props.sideMenu} onOpen={()=>props.openSideMenu()} onClose={()=>props.closeSideMenu()}>
          <List>
          {sideMenuOptions.map((tile, index) => (
            <Link to={`/${tile.path}`} key={index} style={{textDecoration:'none'}} onClick={()=>props.closeSideMenu()}>
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
              <YourOrders toggleSideMenu={()=> {props.toggleSideMenu()}}/>
            </Route>
            <Route path="/Settings">
             <Settings toggleSideMenu={()=> {props.toggleSideMenu()}}/>
            </Route>

          </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
  return {
    sideMenu:state.ui.sideMenu
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    toggleSideMenu:()=>{
      dispatch({type:'TOGGLE_SIDEMENU'})
    },
    openSideMenu:()=>{
      dispatch({type:'OPEN_SIDEMENU'})
    },
    closeSideMenu:()=>{
      dispatch({type:'CLOSE_SIDEMENU'})
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
