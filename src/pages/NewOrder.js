import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles';
import LoginButton from './components/LoginButton'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from "redux";
import {connect} from "react-redux";
import {Button} from "@material-ui/core";

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

        state = {
            pageTitle:'New Order'
        }

    pricelistParser(props){
        var parse={};
        if(!props.pricelists) return "Please Wait"
        const list = props.pricelists.filter(pricelist=>pricelist.id=="MAY2019")[0]["TPT"];

        list.map(card=>{
            parse[card.brand] = [];
            card.itemslist.map(item=>parse[card.brand].push(item))
        })
        return parse;
    }

    render(){
        const {props,state} = this;
        console.log(this.pricelistParser(props))
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
                <div style={{padding:"8px"}}>
                    <Button variant="outlined" style={{margin:"3px"}}>Left</Button>
                </div>
            </div>
        )
    }
}

const stateToProps = (state) =>{
    return{
        pricelists:state.firestore.ordered.pricelists
    }
}

export default  compose(
    connect(stateToProps),
    firestoreConnect([
        {
            collection:"pricelists"
        }
    ]),
    withStyles(css)
    )(NewOrder)