import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from "redux";
import {connect} from "react-redux";
import {Button, Chip} from "@material-ui/core";
import QuantityDialog from "./QuantityDialog";

class AddItems extends Component {
    constructor(props){
        super(props);
    }
    state={
        dialogOpen:false,
        totalAmount:0,
        itemsList:[]
    }
    toggle(){
        this.setState({
            dialogOpen:!this.state.dialogOpen
        })
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

    selectItem(event){
        event.preventDefault();
        event.persist();
        var code,name,weight,rate;
        code = event.currentTarget.attributes.code.value;
        weight = event.currentTarget.attributes.weight.value;
        rate = event.currentTarget.attributes.rate.value;
        name = event.currentTarget.attributes.itemname.value;
        this.setState({
            dialogOpen:true,
            selectedItem:{code,weight,rate,name}
        })
    }

    addItem(item){
        var newList = [...this.state.itemsList,item];
        var newTotal = this.state.totalAmount+item.amount;
        this.setState({
            itemsList:newList,
            totalAmount:newTotal
        })
    }
    tempList(){
        if(this.state.itemsList.length == 0) return ''
        return this.state.itemsList.map((item,key)=>
            <Chip
                label={item.itemName+" - "+item.amount}
                key={key}
                onDelete={(e)=>this.handleChipDelete(e,key)}
                style={{margin:"3px"}}
                color="primary"
            />
        )
    }
    handleChipDelete(e,key){
        e.preventDefault();
        var newList = this.state.itemsList;
        newList.splice(key,1)
        this.setState({itemsList:newList});
    }
    render(){
        const {props,state} = this;
        if(state.itemsList.length > 0)props.storeOrder(state.itemsList)
        return(
            <Fragment>
                <div style={{padding:"8px"}}>
                {(this.pricelistParser(props))? 
                    this.pricelistParser(props).map(box=>box.map(item=>
                    <Button 
                        variant="outlined"
                        code={item.itemCode}
                        itemname={item.itemName}
                        weight={item.itemWeight}
                        rate={item.itemRate}
                        style={{margin:"3px"}}
                        onClick={(e)=>this.selectItem(e)}
                        >
                        {item.itemName}
                        </Button>))
                    :"please wait"}
                </div>
                <div style={{padding:"8px"}}>
                {(this.tempList() != '')?
                    <Fragment>
                    <Typography
                        variant="body2"
                        style={{marginLeft:"3px"}}
                        color="textSecondary"
                        >
                    Items in your order:
                    </Typography>
                    {this.tempList()}
                    </Fragment>
                :""}
                </div>
                
                <QuantityDialog
                    addItem={this.addItem.bind(this)}
                    open={this.state.dialogOpen}
                    toggle={this.toggle.bind(this)} {...this.state.selectedItem}
                />
            
            </Fragment>
        )
    }
}

const stateToProps = (state) =>{
    return{
        pricelists:state.firestore.ordered.pricelists
    }
}
const dispatchToProps = (dispatch)=>{
    return{
        storeOrder:(list)=>dispatch({
            type:'STORE_ORDER',
            payload:list
        })
    }
}
export default  compose(
    connect(stateToProps,dispatchToProps),
    firestoreConnect([
        {
            collection:"pricelists"
        }
    ])
    )(AddItems)