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
        var listArray=[];
        if(!props.pricelists) return false
        const list = props.pricelists.filter(pricelist=>pricelist.id=="MAY2019")[0]["TPT"];

        list.map(card=>{
            parse[card.brand] = [];
            card.itemslist.map(item=>parse[card.brand].push(item))
        })
        
        for(var brand in parse){
            var array1=[];var array2 =[];var array3=[];
            parse[brand].map(item=>{
                if(((item.itemCode.replace(/\D/g,"").length) == 1) && (!item.itemCode.includes("CP"))){
                    
                    array1.push(item)
                    parse[brand].filter(e=>e!=item)
                }else if(item.itemCode.includes("CP")){
                    
                    array2.push(item)
                    parse[brand].filter(e=>e!=item)
                }else{
                
                    array3.push(item)
                    parse[brand].filter(e=>e!=item)
                }
            })
            listArray.push(array1);
            listArray.push(array2)
            listArray.push(array3)
        }
        return listArray;
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
                    {/*(this.pricelistParser(props)["JITHU"])?this.pricelistParser(props)["JITHU"].map(item=><Button variant="outlined" key={item.itemCode} style={{margin:"3px"}}>{item.itemName}</Button>):"please wait"*/}
                    {(this.pricelistParser(props))? this.pricelistParser(props).map(box=>box.map(item=><Button variant="outlined" key={item.itemCode} style={{margin:"3px"}}>{item.itemName}</Button>)):"please wait"}
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