import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import "./animation.css";
import {Redirect} from "react-router-dom";

const Tick = ()=>{
  return(
    <svg
          version="1.1"
          id="svg"
          x="0px"
          y="0px"
          viewBox="0 0 1600 1250"
          enable-background="new 0 0 1600 1240"
        >
          <path
            d="m 1671,970 q 0,-40 -28,-68 L 919,178 783,42 Q 755,14 715,14 675,14 647,42 L 511,178 149,540 q -28,28 -28,68 0,40 28,68 l 136,136 q 28,28 68,28 40,0 68,-28 l 294,-295 656,657 q 28,28 68,28 40,0 68,-28 l 136,-136 q 28,-28 28,-68 z"
            fill="rgba(0,0,0,0)"
            className="path"
            strokeWidth="20"
            strokeMiterLimit="50"
          />
        </svg>
  )
}

export default class OrderSent extends Component {
    state={
        redirect:false
    }

  render() {
    setTimeout(()=>this.setState({redirect:true}),1500)
    return (
      <Paper style={{textAlign:"Center",padding:"12px 3px",borderRadius:"8px",margin:"6px",border:"2px solid #0bc"}} elevation={0}>
        <Tick/><br/><br/>
        <Typography variant="subheading" color="textPrimary">
            Order Sent Successfully!
        </Typography>
        {this.state.redirect? <Redirect to="/" />:
            <Typography variant="caption" color="textSecondary">
                ... You will be redirected in a second ...
            </Typography>
        }
      </Paper>
    );
  }
}
