import React, { Component } from 'react';
import ShellList from '../components/ShellList';
import {showEditForm} from '../actions/shell';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

@connect(
  state => ({
    items: state.shell.items,
    initiallyOpen: state.shell.initiallyOpen
  }),
  dispatch => bindActionCreators({showEditForm}, dispatch)
)
export default class ShellListContainer extends Component {

  handleShowEditForm(host) {
    const showEditFormAction = this.props.showEditForm
    return () => {
      showEditFormAction(host)
    }
  }

  render() {
    const subheader = 'Your Shells';
    const { items } = this.props;

    const itemsSorted = items.slice().reverse()

    return (
      <ShellList {...this.props} handleShowEditForm={this.handleShowEditForm.bind(this)} subheader={subheader} items={itemsSorted} />
    );
  }
}
