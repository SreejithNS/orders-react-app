import React, {Component} from "react";
import ReactDOM from 'react-dom';
//import { signOut, signIn } from "../components/actions/authActions";
import { connect } from "react-redux";
import {  Paper, Typography, withStyles, Select, OutlinedInput, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { compose } from "redux";
import {firestoreConnect} from 'react-redux-firebase';
import Loading from "../components/Loading"
const css =(theme)=>{
    return{
        content:{
            padding:8
        },
        formControl: {
            margin: theme.spacing.unit,
            minWidth: 120,
        }
    }
}

class Pricelist extends Component {
    state={
        labelWidth:0
    }

    getLocations(){
        if(!this.props.pricelists) return <Loading/>
        const {pricelists,pricelistCode} = this.props;
        var locations = [];
        for(var place in pricelists[pricelistCode]){
            locations.push(place)
        }
        return locations
    }

    componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
    }
    render(){
        const {props} = this;
        const {classes} = props
        
         return(
            <Paper className={classes.content}>
                <Typography variant="subtitle1" color="textSecondary">
                    Location
                </Typography>
                <form>
                <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                    ref={ref => {
                    this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-location-simple"
                >
                    {props.pricelistCode}
                </InputLabel>
                <Select
                    value={props.location}
                    id="outlines-location-simple"
                    onChange={(event)=>props.setLocation(event.target.value)}
                    input={
                    <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="location"
                        id="outlined-location-simple"
                    />
                    }
                >
                {Array.isArray(this.getLocations())?this.getLocations().map((place,key)=><MenuItem value={place} key={key}>{place}</MenuItem>):this.getLocations()}
                </Select>
                </FormControl>
                </form>
            </Paper>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        pricelists:state.firestore.data.pricelists,
        pricelistCode:state.settings.pricelist,
        location:state.settings.location,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        setLocation:(name)=>dispatch({
            type:"SETTINGS_SET_LOCATION",
            payload:name
        })
    }
}

export default compose(connect(mapStateToProps,mapDispatchToProps), firestoreConnect([
    {
        collection:"pricelists"
    }
]) ,withStyles(css))(Pricelist)