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
  ChevronRight,
  Place
} from "@material-ui/icons";

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
    const { props } = this;
    this.props.data.shop.get().then((docs)=>this.setState({shopName:docs.data().name}))
    return (

        <Grid item xs={12} md={6}>
          <ExpansionPanel
            onChange={(event, e) => this.setState({ panelExpansion: e })}
          >
            <ExpansionPanelSummary style={style.expansionPanelSummary}>
              <Grid container style={style.zeroPadding}>
                <Grid item xs={6}>
                  <Button style={style.button} size="small" disabled>
                    <AccountCircle fontSize="small" />
                    Sreejith N
                  </Button><br/>
                  <Button
                    style={{ ...style.button}}
                    size="small"
                    disabled
                  >
                    <Store fontSize="small" />
                    {(this.state.shopName)?this.state.shopName:"Please Wait"}
                  </Button>
                </Grid>
                <Grid item xs={6} align="right">

                  <Button
                    style={style.button}
                    size="small"
                    disabled
                  >
                    {"Tirupattur"}<Place fontSize="small" />
                  </Button><br/>
                  <Button style={{...style.button}} size="small" disabled>
                    <Timer fontSize="small" />
                    {props.data.timestamp}
                  </Button>
                </Grid>
                {!this.state.panelExpansion ? (
                  <Fragment>
                    <Grid item xs={6}>
                      <div>
                        {props.data.order.map((item,key) => (
                          <Chip
                            key={key}
                            style={style.chip}
                            label={item.itemName + " - " + item.quantity}
                            style={{ margin: "3px" }}
                          />
                        ))}
                      </div>
                    </Grid>
                    <Grid item xs={6} align="right" alignItem="center" style={style.grandTotal}>
                      <Grid container>
                        <Grid item xs={6} align="left" style={{color:"#555"}} >Amount:</Grid>
                        <Grid item xs={6}>{props.data.grandTotal}</Grid>
                      </Grid>
                    </Grid>
                  </Fragment>
                ) : (
                  ""
                )}

                <Grid item xs={12} align="right">
                 {!this.state.panelExpansion? <Chip style={style.chip} label={"Discount: "+props.data.discountPercentage+"%"}/>:""}
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
                      props.data.order.map(order=><TableRow>
                        <TableCell>{order.itemName}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.rate}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                      </TableRow>)
                    }
                    {props.data.discount?
                      <TableRow>
                        <TableCell colSpan={1}/>
                        <TableCell colSpan={2} align="right">Discount of {props.data.discountPercentage}%</TableCell>
                        <TableCell>{props.data.discountAmount}</TableCell>
                      </TableRow>:""
                    }
                    <TableRow>
                      <TableCell colSpan={1}/>
                      <TableCell colSpan={2} align="right"><b>Grand Total</b></TableCell>
                      <TableCell><b>{props.data.grandTotal}</b></TableCell>
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