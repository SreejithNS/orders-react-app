import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddItems from './AddItems';
import AlertDialog from "./AlertDialog"

const styles = theme => ({
  root: {
    width: '100%',
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
function content(step){
     switch(step){
         case 0:
         return <AddItems/>
         default:
         return "End Reached"
     }
 }

class OrderSteps extends React.Component {
    constructor(props){
        super(props)
    }
  state = {
    activeStep: 0,
    alert:{
        open:false
    }
  };

  handleNext = () => {
    switch(this.state.activeStep){
        case 0:
        if(this.props.itemsList.length == 0) this.setState({
            alert:{
                open:true,
                title:"No Empty orders",
                content:"You must add atleast one item to the list.",
                button1:"Sure",
                button2:"Ok"
            }
        })
        return true 
        break;
    }
    this.setState(state => ({
      activeStep: state.activeStep + 1,
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

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} nonLinear>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography variant="body1" className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
                {content(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
        <AlertDialog {...this.state.alert}/>
      </div>
    );
  }
}

OrderSteps.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(OrderSteps);