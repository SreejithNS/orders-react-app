import React, {Component} from "react";
import { signOut, signIn } from "../components/actions/authActions";
import { connect } from "react-redux";
import { ListItem, ListItemAvatar, Avatar, ListItemText, List, Paper, Typography, withStyles } from "@material-ui/core";
import { compose } from "redux";

const css ={
    content:{
        padding:8
    }
}

class Profile extends Component {
    render(){
        const {props} = this;
         return(

            <Paper className={props.classes.content}>
                <Typography variant="subtitle1" color="textSecondary">
                    Profile
                </Typography>
                <List>
                {(props.user.userLogged)?
                    <ListItem button onClick={()=>props.logout()} alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt={props.user.user.name} src={props.user.user.photoURL} />
                        </ListItemAvatar>
                        <ListItemText primary={props.user.user.name} secondary="Tap to logout"/>
                    </ListItem>
                    :
                    <ListItem button onClick={()=>props.login()}>
                        <ListItemText>Tap to Login</ListItemText>
                    </ListItem>
                }
                </List>
            </Paper>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
            user:state.user
        }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        logout:()=>{dispatch(signOut())},
        login:()=>{dispatch(signIn())}
    }
}

export default compose(  connect(mapStateToProps,mapDispatchToProps), withStyles(css) )(Profile)