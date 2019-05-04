import React, {Component,Fragment} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import {Typography,Fab }from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {Menu,Add} from '@material-ui/icons';
import {withStyles} from '@material-ui/core/styles';
import LoginButton from './components/LoginButton';
import OrderSummary from "./components/OrderSummary";
import {firestoreConnect} from 'react-redux-firebase';

import {compose} from "redux";
import {connect} from "react-redux";
var css = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft:-12,
      marginRight: 20,
    },
};

class YourOrders extends Component{


        state = {
            pageTitle:'Your Orders'
        }


    render(){
        const {state,props} = this;
        return(
            <Fragment>
            <div className={props.classes.root}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton className={props.classes.menuButton} color="inherit" aria-label="Menu"  onClick={props.toggleSideMenu}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={props.classes.grow}>
                        {state.pageTitle}
                    </Typography>
                    <LoginButton/>
                    </Toolbar>
                </AppBar>
                <div style={{maxHeight:"91vh",overflowY:"scroll"}}>
                <Grid container>
                    {(props.orders)?props.orders.map((order,key)=><OrderSummary data={order} key={key}/>):"Loading..."}
                </Grid>
                </div>
                <Fab color="primary" aria-label="Add" style={{position:"absolute",bottom:"16px",right:"16px"}}>
                <Add />
            </Fab>
            </div>

            </Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        orders:state.firestore.ordered.orders,
        user:state.user
    }
}

const queryDefiner =(props)=>{
    if(!props.user.user.uid) return []
    return [
        {
            collection:"orders",
            queryParams: [ 'limitToFirst=10' ],
            where: [
                ['orderedBy', '==', props.user.user.uid]
            ]
        }
    ]
}
export default compose(connect(mapStateToProps),firestoreConnect(queryDefiner) ,withStyles(css))(YourOrders)