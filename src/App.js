import React, { Component } from 'react';
import {List,ListItem,ListItemIcon,ListItemText,ListItemAvatar,Divider,SwipeableDrawer,Avatar} from '@material-ui/core';
import {Check} from '@material-ui/icons';
import {Settings as SettingsIcon} from '@material-ui/icons';
import {signIn,signOut} from "./pages/components/actions/authActions";
import { Switch, Route, Link } from 'react-router-dom';
import Settings from './pages/Settings';
import NewOrder from './pages/NewOrder';
import YourOrders from './pages/YourOrders';
import store from './redux/store';
import {connect} from 'react-redux';

class App extends Component {
    sideMenuOptions = [
      {
        name:'Your orders',
        path:'',
        icon:<Check/>
      },
      {
        name:'Settings',
        path:'settings',
        icon:<SettingsIcon />
      },
      {
        name:'New Order',
        path:'neworder',
        icon:<SettingsIcon />
      }
    ]
  render() {
    const {props,sideMenuOptions} = this;
    return (
      <div>
        <SwipeableDrawer open={props.sideMenu} onOpen={()=>props.openSideMenu()} onClose={()=>props.closeSideMenu()}>
          <List>
          {(props.user.userLogged)?
            <ListItem button onClick={()=>props.logout()} alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt={props.user.user.name} src={props.user.user.photoURL} />
                </ListItemAvatar>
                <ListItemText primary={props.user.user.name} secondary="Tap to logout"/>
            </ListItem>:
            <ListItem button onClick={()=>props.login()}>
                <ListItemText>Tap to Login</ListItemText>
            </ListItem>
          }
          <Divider/>
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
            <Route path="/settings">
             <Settings toggleSideMenu={()=> {props.toggleSideMenu()}}/>
            </Route>
            <Route path="/neworder">
             <NewOrder toggleSideMenu={()=> {props.toggleSideMenu()}}/>
            </Route>

          </Switch>
      </div>
    );
  }
}
// SETTINGS UPDATE LISTENER
store.firestore.collection('admin').doc('appSettings').onSnapshot((doc)=>{
    const data = doc.data();
    return store.dispatch({
        type:'SET_SETTINGS',
        payload:{
            ...data
        }
    })
})

const mapStateToProps = (state)=>{
  return {
    sideMenu:state.ui.sideMenu,
    user:state.user
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
    },
    login:()=>{dispatch(signIn())},
    logout:()=>{dispatch(signOut())}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
//Binoy edit this also