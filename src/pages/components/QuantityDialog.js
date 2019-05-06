import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class QuantityDialog extends Component {
  constructor(props){
      super(props);
      this.state = {
        value:0
      };
  }

  handleAdd =()=>{
      const {toggle,name,rate,code} = this.props;
      this.props.addItem({
          itemName:name,
          rate,
          itemCode:code,
          quantity:this.state.value,
          amount:Math.round(this.state.value*rate*100)/100
      })
      toggle()
  }

  onChange=(event)=>{
      var value = event.currentTarget.value;
      this.setState({value:value});
  }

  render() {
      const {props} = this;
      const {name,weight,rate} = props;
    return (
        <Dialog
          open={props.open}
          onClose={props.toggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Quantity</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`${name} - ${weight}g - Rs.${rate}/packet`}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Packets"
              type="number"
              fullWidth
              onChange={this.onChange.bind(this)}
              value={this.state.value}
              placeholder="Enter number of packets"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.toggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}