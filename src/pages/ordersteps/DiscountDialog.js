import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

export default class QuantityDialog extends Component {
  constructor(props){
      super(props);
      this.state = {
        value:undefined
      };
  }

  handleAdd =()=>{
      const {toggle} = this.props;
      this.props.setDiscount(this.state.value)
      toggle()
      this.setState({
          value:null
      })
  }

  onChange=(event)=>{
      var value = event.target.value;
      this.setState({value:value});
  }

  render() {
      const {props} = this;
      const {shopName,totalAmount,discount} = props;
    return (
        <Dialog
          open={props.open}
          onClose={props.toggle}
          TransitionComponent={Transition}
          fullWidth={true}
          maxWidth={"md"}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Discount</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Shop:<b>{shopName}</b><br/>Total:<b>Rs.{totalAmount}</b>
            </DialogContentText>
            <form onSubmit={(e)=>{e.preventDefault();this.handleAdd()}}>
            <TextField
              autoFocus
              margin="dense"
              label="Discount Percentage"
              type="number"
              fullWidth
              onChange={this.onChange}
              value={this.state.value}
              placeholder="Discount in %"
            />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.toggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              {discount? "Change":"Provide"}
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}