import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core"
import {Send} from "@material-ui/icons"
import Typography from '@material-ui/core/Typography';
import AddItems from './AddItems';
import Bill from './Bill';
import AlertDialog from "./../components/AlertDialog"
import EnterShop from "./EnterShop";
import {compose} from "redux";
import {connect} from "react-redux";
import {createShop,sendBill} from "./actions/NewOrderActions";
import OrderSent from "./OrderSent";
const styles = theme => ({
  root: {
    width: '100%',
    minHeight:"90%"
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions:{
      marginLeft:theme.spacing.unit*1.5
  }
});

function getSteps() {
  return ['Items', 'Shop', 'Bill'];
}


class OrderSteps extends React.Component {
    constructor(props){
        super(props)
    }
  state = {
    activeStep: 0,
    alert:{
        open:false
    },
    completed:[]
  };

    content(step){
     switch(step){
         case 0:
         return <AddItems/>

         case 1:
         return <EnterShop />

         case 2:
         return <Bill/>

         case 3:
         return <OrderSent/>
         }
    }
  handleNext = () => {
    switch(this.state.activeStep){
        case 0:
        if(this.props.itemsList.length == 0){ this.setState({
            alert:{
                open:true,
                title:"No Empty orders",
                content:"You must add atleast one item to the list.",
                button1:"Sure",
                button2:"Ok"
            }
        })
        return true
        }
        break;
        case 1:
        if(this.props.shopName == ""){ this.setState({
            alert:{
                open:true,
                title:"No Shop name!",
                content:"Search for shops by typing into the button and \n select the shop from the list.",
                button1:"Sure",
                button2:"Ok"
            }
        })
        return true;
        }else if(this.props.suggestionsList.length > 0 && (!this.props.shop.name)){this.setState({
            alert:{
                open:true,
                title:"Select from the list",
                content:"Seems like you forgot to select the shop from the list.Tap on the name to select.To add new shop name just enter it without clashing other names.",
                button1:"Sure",
                button2:"Ok"
            }
        })
        return true;
        }else if(!this.props.shop.name && this.props.shopName != ""){
            this.setState({
            alert:{
                open:true,
                title:"Seems like a new shop",
                content:"Do you want to add this shop to your list?",
                button1:"Yes",
                button2:"No",
                button1Action:()=>{
                    this.props.createShop();
                }
            }
        })
        return true
        }
        break;
        case 2:
        this.props.sendBill();
        break;
    }
    var completed=this.state.completed
    completed[this.state.activeStep] = true;
    this.setState(state => ({
      activeStep: state.activeStep + 1,
      completed
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  stepCompleted(index){
      return this.state.completed[index] || false
  }
  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
    <Fragment>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} nonLinear>
          {steps.map((label,key) => (
            <Step key={label} completed={this.stepCompleted(key)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="stretch"
            >
          {this.state.activeStep === steps.length+1 ? (
            <Grid item>
              <Typography variant="body1" className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </Grid>
          ) : (
               <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
                 >
              <Grid item>
              {this.content(activeStep)}
            </Grid>
            <Grid item>
                <Grid container direction="row" style={{marginTop:"6px"}} alignItem="center" justify="space-between">
                    <Grid item>
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.backButton}
                            >
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" style={{marginRight:"6px"}} onClick={this.handleNext}>
                        {(activeStep === steps.length - 1 )? (<Send fontSize="small"/>) : (activeStep === steps.length)? 'Finish':"Next"}
                        </Button>
                    </Grid>
                </Grid>
              </Grid>
              </Grid>
          )}
        </Grid>
        <AlertDialog {...this.state.alert} handleClose={()=>this.setState({alert:{...this.state.alert,open:false}})}/>
      </div>
    </Fragment>
    );
  }
}

OrderSteps.propTypes = {
  classes: PropTypes.object,
};
const dispatchToProps=(dispatch)=>{
    return {
        createShop:()=>dispatch(createShop()),
        sendBill:()=>dispatch(sendBill())
    }
}
const stateToProps = (state)=>{
    return {
        itemsList:state.order.itemsList,
        shop:state.order.shop,
        shopName:state.order.shopName,
        bill:state.order.bill,
        suggestionsList:state.order.suggestionsList
    }
}

export default compose(connect(stateToProps,dispatchToProps),withStyles(styles))(OrderSteps);