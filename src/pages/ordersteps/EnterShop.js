import React,{Component, Fragment} from "react";
import {TextField, Paper, MenuList, MenuItem,Grid} from '@material-ui/core';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from 'react-redux-firebase';
import {Store} from "@material-ui/icons"
import Loading from "./../components/Loading"
class EnterShop extends Component {
    constructor(){
        super();
        this.selectShop = id => event =>{
            if(this.getSuggestionsList(this.props.shopsList)[id].name == this.props.shop.name) return this.props.unsetShop()
            this.props.setShopName(this.getSuggestionsList(this.props.shopsList)[id].name)
            this.props.setShop(this.getSuggestionsList(this.props.shopsList)[id])
        }
        }
        shopNameInput = event=> this.props.setShopName(event.target.value.toUpperCase())

        getSuggestionsList(shopsList){
            if(shopsList=="" || shopsList == null || shopsList == undefined) return false
            const value = this.props.shopName.toUpperCase();
            var suggestionsList = []
            shopsList.map((shop,key)=>{
                var name = shop.name.toUpperCase().split('');
                var inp = value.split('');
                name.splice(inp.length,name.length-inp.length)
                if(name.join('')==inp.join('')) suggestionsList.push({
                    name:shop.name,
                    id:shop.id
                })
            })
            suggestionsList.splice(5,suggestionsList.length)
            this.props.suggestionsList(suggestionsList)
            return suggestionsList;
        }
    render(){
        const {shopsList} = this.props
        return(
            <Fragment>
            <Grid item style={{textAlign:"center"}}>
            <TextField display="inline-block" label="Search Shop" value={this.props.shopName} onChange={this.shopNameInput} margin="normal" variant="outlined" />
            </Grid>
            <Grid item>
            <Paper margin="normal" elevation="0">
            <MenuList>
            {(shopsList)?
                this.getSuggestionsList(shopsList).map((shop,key)=>{
                    return(
                        <MenuItem key={key} onClick={this.selectShop(key)} selected={this.props.shop.name == shop.name}>{this.props.shop.name == shop.name?<Store fontSize="small"/>:""}{shop.name}</MenuItem>
                    )
                })
            :<Loading/>}
            </MenuList>
            </Paper>
            </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        shopsList:state.firestore.ordered.shops,
        shop:state.order.shop,
        shopName:state.order.shopName,
        settings:state.settings
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        setShop:(shop)=>dispatch({
            type:"SET_SHOP",
            payload:shop
        }),
        setShopName:(name)=>dispatch({
            type:"SET_SHOP_NAME",
            payload:name
        }),
        unsetShop:()=>dispatch({type:"UNSET_SHOP"}),
        suggestionsList:(list)=>dispatch({type:"SUGGESTIONS_PROCESS",payload:list})
    }
}

export default compose(connect(mapStateToProps,mapDispatchToProps),firestoreConnect(props=>[
    { collection: 'shops', where: [ 'location',"==", props.settings.location]}
]))(EnterShop)