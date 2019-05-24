import React, {Component,Fragment} from "react";
import {Table,TableBody,TableCell,TableHead,TableRow, Paper, Grid, Button} from "@material-ui/core"
//import {compose} from "redux";
import {connect} from "react-redux";
import {Store,AccountCircle,Timer} from '@material-ui/icons';
import DiscountDialog from "./DiscountDialog";
import moment from "moment";

const buttonProps = {
    size:"small",
    disabled:true,
    style:{
        color:"#000"
    }
}

class Bill extends Component {
    state={
        dialogOpen:false,
        discountPercentage:0
    }
    toggle(){
        this.setState({
            dialogOpen:!this.state.dialogOpen
        })
    }

    discount(){
        if(this.state.discountPercentage===0) return false;
        const {totalAmount} = this.props;
        var amnt = Math.round(totalAmount*100)/100;
        const {discountPercentage} = this.state;
        var discountAmount = (amnt*(discountPercentage/100))
        const grandTotal = amnt-discountAmount;
        return {
            discountAmount,discountPercentage,grandTotal
        }
    }

    billData(){
        const {itemsList,user,shop,totalAmount} = this.props;
        //return console.log(itemsList,user,shop);
        const bill = {};
        const {pricelistCode,location} = this.props;
        var order = itemsList;
        order.forEach(item=>{
            item.quantity = parseInt(item.quantity);
            item.rate = parseFloat(item.rate);
        })
        bill.order = order;
        const discount = this.discount();
        bill.discount= Boolean(discount);
        if(bill.discount){
            bill.discountPercentage = parseInt(this.state.discountPercentage);
            bill.discountAmount = discount.discountAmount;
        }
        bill.location = location;
        bill.orderedBy = user.uid;
        bill.ordererName = user.name;
        bill.priceListCode = pricelistCode;
        bill.shop = shop.id;
        bill.shopName = shop.name;
        bill.grandTotal = (discount.grandTotal) || totalAmount;
        bill.totalAmount = totalAmount;
        bill.date = new Date();

        this.props.setBill(bill);
        return bill;
    }

    render(){
        const data = this.billData();
        return(
            <Fragment>
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
                        {data.totalAmount!==data.grandTotal?
                            <TableRow>
                                <TableCell colSpan={1}/>
                                <TableCell colSpan={2} align="right">Total Amount</TableCell>
                                <TableCell>{data.totalAmount}</TableCell>
                            </TableRow>:""
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
            <Paper style={{margin:"6px 8px",padding:"6px"}}>
                <Button size="small" onClick={this.toggle.bind(this)} variant="outlined">{data.discount? "Change":"Provide"} Discount %</Button>
            </Paper>
            <DiscountDialog
                    setDiscount={(perc)=>this.setState({discountPercentage:perc,discount:true})}
                    open={this.state.dialogOpen}
                    toggle={this.toggle.bind(this)}
                    shopName={this.props.shop.name}
                    discount={data.discount}
                    totalAmount={data.totalAmount}
                />
            </Fragment>
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
        totalAmount:state.order.totalAmount,
        location:state.settings.location,
        pricelistCode:state.settings.pricelist,

    }
}

export default connect(stateToProps,dispatchToProps)(Bill);

