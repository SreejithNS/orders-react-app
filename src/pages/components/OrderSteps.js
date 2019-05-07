import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddItems from './AddItems';

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
  return ['Add items', 'Shop', 'Discount'];
}
function content(step){
     switch(step){
         case 0:
         return <AddItems/>
         default:
         return "End Reached"
     }
 }
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Add Items to your order';
    case 1:
      return 'Shop Name';
    case 2:
      return 'Provide Discounts if necessary';
    default:
      return 'Unknown stepIndex';
  }
}

class OrderSteps extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
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
              <Typography variant="body1" className={classes.instructions}>{getStepContent(activeStep)}</Typography>
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
      </div>
    );
  }
}

OrderSteps.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(OrderSteps);