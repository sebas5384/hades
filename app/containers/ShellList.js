import React, { Component } from 'react';
import ShellList from '../components/ShellList';
// import {add as addShell} from '../actions/shell';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

@connect(
  state => ({
    items: state.shell.items,
    initiallyOpen: state.shell.initiallyOpen
  })
  // dispatch => bindActionCreators({addShell}, dispatch)
)
export default class ShellListContainer extends Component {

  render() {
    const subheader = 'Your Shells';
    const { items } = this.props;

    const itemsSorted = items.slice().reverse()

    return (
      <ShellList {...this.props} subheader={subheader} items={itemsSorted} />
    );
  }
}
