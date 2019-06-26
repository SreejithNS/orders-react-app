import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Grid} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles';
import LoginButton from './components/LoginButton';
import {compose} from "redux";
import {connect} from "react-redux";
import { Paper } from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import Loading from './components/Loading';
import { ShoppingBasketRounded } from '@material-ui/icons';
var css = {
    root: {
      flexGrow: 1,
      height:"90%"
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft:-12,
      marginRight: 20,
    },
    itemLabel:{
        padding:8,
        textTransform:"uppercase",
    },
    itemQuantity:{
        borderRadius:8,
        backgroundColor:"#eee",
        textAlign:"center",
        padding:8,
        fontWeight:'bold',
        fontFamily:"Roboto",
    },
    itemRow:{
        margin:"3px 0px"
    },
    title:{
        margin:3,
        fontSize:16
    }
};


class Sale extends Component{
    state = {
        pageTitle:'Sale',

    }

    container=()=>{
        if(this.props.sale === undefined || this.props.sale === null) return false;
        return this.props.sale.containerReturn
    }


    render(){
        const {props,state,container} = this;
        const {itemLabel,itemRow,itemQuantity,title} = this.props.classes;
        return (
            (!props.settings.onSale)?
            <Redirect to="/"/> : 
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
                {!container()?<Loading/>:
                    <Paper elevation={0} style={{margin:"0px",padding:"3px"}}>
                        <Grid container justify="center" className={title} alignItem="center">
                            <ShoppingBasketRounded/>
                            <Typography inline variant="title">Container</Typography>
                        </Grid>
                        <Grid container justify="space-around" alignItems="center">
                        {container().map((item,key)=>
                            <Grid item key={key} className={itemRow} container xs={12} alignItems="center">
                                <Grid item xs={6} className={itemLabel}>{item.itemName}</Grid>
                                <Grid item xs={6} className={itemQuantity}>{item.quantity}</Grid>
                            </Grid>
                        )}
                            <Grid item className={itemRow} container xs={12} alignItems="center">
                                 <Grid item xs={6} className={itemLabel}>Total Discounts</Grid>
                                 <Grid item xs={6} className={itemQuantity}>-{props.sale.discountAmount}</Grid>
                            </Grid>
                            <Grid item className={itemRow} container xs={12} alignItems="center">
                                 <Grid item xs={6} className={itemLabel}>Return Amount</Grid>
                                 <Grid item xs={6} className={itemQuantity}>{props.sale.returnAmount}</Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                }
            </div>
        )
    }
}

const stateToProps = (state) =>{
    return{
        settings:state.settings,
        sale:state.firestore.data.sale
    }
}

export default compose(connect(stateToProps),firestoreConnect(props=>[
    {
        collection:'sales',
        doc:props.settings.saleId,
        storeAs:'sale'
    }
]),withStyles(css))(Sale)