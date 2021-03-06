import React, { Component, Fragment } from "react";
import {deleteOrder} from './actions/orderActions';
import {
  Button,
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  ExpansionPanelSummary,
  //Fab,
  //IconButton
} from "@material-ui/core";
import {
  //AccountCircle,
  Store,
  Timer,
  Place,
  Delete
} from "@material-ui/icons";
import {connect} from "react-redux";
import moment from "moment";

const style = {
  button: {
    color: "#282828"
  },
  chip: {
    margin: "3px"
  },
  zeroPadding: {
    padding: "0px"
  },
  expansionPanelSummary: {
    padding: "0px 12px 0px 8px"
  },
  grandTotal:{
    padding:"8px",
    margin:"0px",
    fontSize:"120%",
    borderRadius:"8px",
    backgroundColor:"#eee"
  },
  expansionPanelDetails:{
    padding:"6px"
  }
};

class OrderSummary extends Component {
  constructor(props) {
    super();
    this.state = {
      panelExpansion: false,
      shopName : false
    };
  }


  render() {
    const {data} = this.props
    return (

        <Grid item xs={12} md={6} style={{margin:"3px 5px"}}>
          <ExpansionPanel
            onChange={(event, e) => this.setState({ panelExpansion: e })}
          >
            <ExpansionPanelSummary style={style.expansionPanelSummary}>
              <Grid container style={style.zeroPadding}>
                <Grid item xs={6}>
                  <Button
                    style={{ ...style.button}}
                    size="small"
                    disabled
                  >
                    <Store fontSize="small" />
                    {data.shopName}
                  </Button><br/>
                  <Button
                    style={style.button}
                    size="small"
                    disabled
                  >
                    {data.location}<Place fontSize="small" />
                  </Button>
                </Grid>
                <Grid item xs={6} align="right">
                <Button aria-label="Delete" onClick={()=>this.props.deleteOrder(data.id)} size="small">
                    <Delete fontSize="small" /> Delete
                </Button>
                <Button style={{...style.button}} size="small" disabled>
                    <Timer fontSize="small" />
                    {moment(data.date.toDate()).format('MMMM Do YYYY')}
                  </Button>

                </Grid>
                {!this.state.panelExpansion ? (
                  <Fragment>
                    <Grid item xs={6}>
                      <div>
                        {data.order.map((item,key) => (
                          <Chip
                            key={key}
                            label={item.itemName + " - " + item.quantity+"p"}
                            style={{...style.chip, margin: "3px" }}
                          />
                        ))}
                      </div>
                    </Grid>

                    <Grid item container justify="flex-end" alignItems="flex-end" xs={6} >
                        <Grid item container justify="flex-end" alignItems="center" style={style.grandTotal}>
                            <Grid item style={{color:"#555",textAlign:"right"}} >Amount:</Grid>
                            <Grid item >{data.grandTotal}</Grid>
                        </Grid>
                         {((!this.state.panelExpansion) && data.discount)? <Chip style={style.chip} label={"Discount: "+data.discountPercentage+"%"}/>:""}
                    </Grid>

                  </Fragment>
                ) : (
                  ""
                )}

                <Grid item xs={12} align="right">

                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={style.expansionPanelDetails}>
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
                        <TableCell>{Math.floor(data.totalAmount*100)/100}</TableCell>
                      </TableRow>:""
                    }
                    {data.discount?
                      <TableRow>
                        <TableCell colSpan={1}/>
                        <TableCell colSpan={2} align="right">Discount of {data.discountPercentage}% :</TableCell>
                        <TableCell>-{Math.floor(data.discountAmount*100)/100}</TableCell>
                      </TableRow>:""
                    }
                    <TableRow>
                      <TableCell colSpan={1}/>
                      <TableCell colSpan={2} align="right"><b>Grand Total</b></TableCell>
                      <TableCell><b>{Math.floor(data.grandTotal*100)/100}</b></TableCell>
                    </TableRow>
                    </TableBody>
                  </Table>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

    );
  }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        deleteOrder:(id)=>{dispatch(deleteOrder(id))}
    }
}
export default connect(null,mapDispatchToProps)(OrderSummary);

/*
                <Button style={style.button} size="small" disabled>
                    <AccountCircle fontSize="small" />
                    {data.ordererName.split(' ')[0]}
                </Button>
*/