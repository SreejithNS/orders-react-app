import React, { Component, Fragment } from "react";
import {Typography, Button} from "material-ui/core";
import connect from "react-redux";

class LoginButton extends Component {
    render(){
        return
        <Fragment>
            {
                (!props.user.userLogged)?
                    <Button color="inherit">Login</Button> :
                    <Typography varient="headline">Username</Typography>
            }
        </Fragment>
    }
}
const stateToProps = (state)=>{
    user:state.user
}

export default connect(stateToProps)(LoginButton);

