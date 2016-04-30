import React, { Component } from 'react';
import GroupList from '../components/GroupList';
import {showEditForm, removeAndSyncToLocal as removeShell} from '../actions/shell';
import {filter as filterGroup} from '../actions/group';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

@connect(
  state => ({
    items: state.group.items,
    active: state.group.active
  }),
  dispatch => bindActionCreators({showEditForm, removeShell, filterGroup}, dispatch)
)
export default class ShellListContainer extends Component {

  handleFilter(name) {
    const filterGroupAction = this.props.filterGroup
    return () => {
      filterGroupAction(name)
    }
  }

  render() {
    const subheader = 'Your Groups';

    const { items, active } = this.props;

    // const itemsSorted = items.slice().reverse()

    return (
      <GroupList {...this.props}
        handleFilter={this.handleFilter.bind(this)}
        subheader={subheader}
        items={items}
        active={active} />
    );
  }
}
