import React, { Component } from 'react';
import GroupList from '../components/GroupList';
import {showEditForm, removeAndSyncToLocal as removeShell} from '../actions/shell';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

@connect(
  state => ({
    items: state.group.items
  }),
  dispatch => bindActionCreators({showEditForm, removeShell}, dispatch)
)
export default class ShellListContainer extends Component {

  handleOpen(name) {
    // const showEditFormAction = this.props.showEditForm
    return () => {
      // showEditFormAction(name)
      console.log('=> Open: ' + name)
    }
  }

  render() {
    const subheader = 'Your Groups';

    const { items } = this.props;

    // const itemsSorted = items.slice().reverse()

    return (
      <GroupList {...this.props}
        handleOpen={this.handleOpen.bind(this)}
        subheader={subheader}
        items={items} />
    );
  }
}
