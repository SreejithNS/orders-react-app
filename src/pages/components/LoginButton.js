import React, { Component, Fragment } from "react";
import {Button} from "@material-ui/core";
import {Typography} from "@material-ui/core"
import {connect} from "react-redux";
import {signIn} from "./actions/authActions";
class LoginButton extends Component {
    render(){
        const {props} = this;
        return(
        <Fragment>
            {
                (!props.user.userLogged)?
                    <Button color="inherit" onClick={()=>props.login()}>Login</Button> :
                    <Typography varient="headline" color="inherit">props.user.user.name</Typography>
            }
        </Fragment>
        )
    }
}
const stateToProps = (state)=>{
    return {
            user:state.user
        }
}
const dispatchToProps = (dispatch)=>{
    return{
        login:()=>{dispatch(signIn())}
    }
}

export default connect(stateToProps,dispatchToProps)(LoginButton);