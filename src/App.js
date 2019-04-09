import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigationBarOpen: false
    }
    this.toggle= {
      open:()=>{
        this.setState({navigationBarOpen:true})
      },
      close:()=>{
        this.setState({navigationBarOpen:false})
      }
    }
  }
  render() {
    const {state,toggle} = this;
    return (
      <div>
        <SwipeableDrawer open={state.navigationBarOpen} onOpen={toggle.open} onClose={toggle.close}>
          <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          </List>
        </SwipeableDrawer>
      </div>
    );
  }
}
export default App;
