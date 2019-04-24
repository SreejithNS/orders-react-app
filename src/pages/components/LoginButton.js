import React, { Component, Fragment } from "react";
import {Button} from "@material-ui/core";
import {Typography} from "@material-ui/core"
import {connect} from "react-redux";

class LoginButton extends Component {
    render(){
        const {props} = this;
        return(
        <Fragment>
            {
                (!props.user.userLogged)?
                    <Button color="inherit">Login</Button> :
                    <Typography varient="headline" color="inherit">Username</Typography>
            }
        </Fragment>
        )
    }
}
const stateToProps = (state)=>{
    return {user:state.user}
}

export default connect(stateToProps)(LoginButton);