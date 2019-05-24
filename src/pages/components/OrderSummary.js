import React, { Component, Fragment } from "react";
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
  ExpansionPanelSummary
} from "@material-ui/core";
import {
  AccountCircle,
  Store,
  Timer,
  Place
} from "@material-ui/icons";
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
                  <Button style={style.button} size="small" disabled>
                    <AccountCircle fontSize="small" />
                    {data.ordererName.split(' ')[0]}
                  </Button><br/>
                  <Button
                    style={{ ...style.button}}
                    size="small"
                    disabled
                  >
                    <Store fontSize="small" />
                    {data.shopName}
                  </Button>
                </Grid>
                <Grid item xs={6} align="right">

                  <Button
                    style={style.button}
                    size="small"
                    disabled
                  >
                    {data.location}<Place fontSize="small" />
                  </Button><br/>
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
                        <Grid item container justify="flex-end" alignItems="flex-center" style={style.grandTotal}>
                        <Grid item style={{color:"#555",textAlign:"right"}} >Amount:</Grid>
                        <Grid item >{data.grandTotal}</Grid>
                        </Grid>
                    </Grid>
                  </Fragment>
                ) : (
                  ""
                )}

                <Grid item xs={12} align="right">
                 {((!this.state.panelExpansion) && data.discount)? <Chip style={style.chip} label={"Discount: "+data.discountPercentage+"%"}/>:""}
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
                        <TableCell>{data.totalAmount}</TableCell>
                      </TableRow>:""
                    }
                    {data.discount?
                      <TableRow>
                        <TableCell colSpan={1}/>
                        <TableCell colSpan={2} align="right">Discount of {data.discountPercentage}% :</TableCell>
                        <TableCell>-{data.discountAmount}</TableCell>
                      </TableRow>:""
                    }
                    <TableRow>
                      <TableCell colSpan={1}/>
                      <TableCell colSpan={2} align="right"><b>Grand Total</b></TableCell>
                      <TableCell><b>{data.grandTotal}</b></TableCell>
                    </TableRow>
                    </TableBody>
                  </Table>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

    );
  }
}

export default OrderSummary;