import React, {Component} from "react";
import {Table,TableBody,TableCell,TableHead,TableRow, Paper, Grid, Button} from "@material-ui/core"
//import {compose} from "redux";
import {connect} from "react-redux";
import {Store,AccountCircle,Timer} from '@material-ui/icons';
import moment from "moment";
const buttonProps = {
    size:"small",
    disabled:true,
    style:{
        color:"#000"
    }
}



class Bill extends Component {

    billData(){
        const {itemsList,user,shop,totalAmount} = this.props;
        //return console.log(itemsList,user,shop);
        const bill = {};
        var order = itemsList;
        order.forEach(item=>{
            item.quantity = parseInt(item.quantity);
            item.rate = parseFloat(item.rate);
        })
        bill.order = order;
        bill.discount= false;
        bill.location = "VANIYAMBADI";
        bill.orderedBy = user.uid;
        bill.ordererName = user.name;
        bill.priceListCode = "MAY2019";
        bill.shop = shop.id;
        bill.shopName = shop.name;
        bill.grandTotal = totalAmount;
        bill.date = new Date();

        this.props.setBill(bill);
        return bill;
    }

    render(){
        const data = this.billData();
        return(
            <Paper style={{paddingTop:"6px",margin:"0px 6px"}}>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-end"
                    >
                    <Grid item>
                        <Button {...buttonProps}>
                            <Store fontSize="small"/>{data.shopName}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button {...buttonProps}>
                            <AccountCircle fontSize="small"/>{data.ordererName.split(' ')[0]}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button {...buttonProps}>
                            <Timer fontSize="small"/>{moment(data.date.toString()).format('MMMM Do YYYY')}
                        </Button>
                    </Grid>
                </Grid>
                <Table padding="dense">
                        <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                        data.order.map((order,key)=><TableRow key={key}>
                            <TableCell>{order.itemName}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>{order.rate}</TableCell>
                            <TableCell>{order.amount}</TableCell>
                        </TableRow>)
                        }
                        {data.discount?
                        <TableRow>
                            <TableCell colSpan={1}/>
                            <TableCell colSpan={2} align="right">Discount of {data.discountPercentage}%</TableCell>
                            <TableCell>{data.discountAmount}</TableCell>
                        </TableRow>:""
                        }
                        <TableRow>
                        <TableCell colSpan={1}/>
                        <TableCell colSpan={2} align="right"><b>Grand Total</b></TableCell>
                        <TableCell><b>{data.grandTotal}</b></TableCell>
                        </TableRow>
                        </TableBody>
                </Table>
            </Paper>
        )
    }
}
const dispatchToProps = (dispatch)=>{
    return {
        setBill:(bill)=>dispatch({
            type:"SET_BILL",
            payload:bill
        })
    }
}
const stateToProps = (state)=>{
    return{
        itemsList:state.order.itemsList,
        shop:state.order.shop,
        user:state.user.user,
        totalAmount:state.order.totalAmount
    }
}

export default connect(stateToProps,dispatchToProps)(Bill);

