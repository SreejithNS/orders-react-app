import React,{Component, Fragment} from "react";
import {TextField, Paper, MenuList, MenuItem,Grid} from '@material-ui/core';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from 'react-redux-firebase';

class EnterShop extends Component {
    constructor(props){
        super();
        this.state={
            shopName:""
        }
    }
        shopNameInput = event=> this.setState({shopName:event.target.value.toUpperCase()})
        getSuggestionsList(shopsList){
            if(shopsList=="" || shopsList == null || shopsList == undefined) return false
            const value = this.state.shopName.toUpperCase();
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
            return suggestionsList;
        }
    render(){
        const {shopsList} = this.props
        return(
            <Fragment>
            <Grid item>
            <TextField label="Search Shop" value={this.state.shopName} onChange={this.shopNameInput} margin="normal" variant="outlined" />
            </Grid>
            <Grid item>
            <Paper margin="normal" elevation="0">
            <MenuList>
            {(shopsList)?
                this.getSuggestionsList(shopsList).map((shop,key)=>{
                    return(
                        <MenuItem key={key} id={shop.id} >{shop.name}</MenuItem>
                    )
                })
            :""}
            </MenuList>
            </Paper>
            </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        shopsList:state.firestore.ordered.shops
    }
}

export default compose(connect(mapStateToProps),firestoreConnect([
    { collection: 'shops', queryParams: [ 'orderByChild=name' ]}
]))(EnterShop)