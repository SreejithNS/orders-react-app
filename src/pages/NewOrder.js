import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles';
import LoginButton from './components/LoginButton';
import OrderSteps from './components/OrderSteps';

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


class NewOrder extends Component{
    constructor(props){
        super()
    }
        state = {
            pageTitle:'New Order',

        }
  
    render(){
        const {props,state} = this;
        console.log(state)
        return(
            <div className={props.classes.root}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton className={props.classes.menuButton} color="inherit" aria-label="Menu"  onClick={props.toggleSideMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={props.classes.grow}>
                        {state.pageTitle}
                    </Typography>
                    <LoginButton/>
                    </Toolbar>
                </AppBar>
                
                <OrderSteps/>

            </div>
        )
    }
}

const stateToProps = (state) =>{
    return{
        pricelists:state.firestore.ordered.pricelists
    }
}

export default withStyles(css)(NewOrder)