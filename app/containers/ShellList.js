import React, { Component } from 'react';
import ShellList from '../components/ShellList';
import {showEditForm, removeAndSyncToLocal as removeShell, share as shareShell} from '../actions/shell';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

@connect(
  state => {

    const items = state.shell.items
      .filter(item => {
        if (state.group.active !== 'all') {
          if (item.host.split('.')[0] == state.group.active) {
            return true
          }
          else {
            return false
          }
        }
        return true
      })

    return {
      items,
      initiallyOpen: state.shell.initiallyOpen
    }
  },
  dispatch => bindActionCreators({showEditForm, removeShell, shareShell}, dispatch)
)
export default class ShellListContainer extends Component {

  handleShowEditForm(id) {
    const showEditFormAction = this.props.showEditForm
    return () => {
      showEditFormAction(id)
    }
  }

  handleDelete(id) {
    const removeShell = this.props.removeShell
    return () => {
      removeShell(id)
    }
  }

  handleShare = (data) => {
    const shareShellAction = this.props.shareShell
    return () => {
      shareShellAction(data)
    }
  }

  render() {
    const subheader = 'Your Shells';
    const { items } = this.props;

    const itemsSorted = items.slice().reverse()

    return (
      <ShellList {...this.props}
        handleShowEditForm={this.handleShowEditForm.bind(this)}
        handleRemove={this.handleDelete.bind(this)}
        handleShare={this.handleShare}
        subheader={subheader}
        items={itemsSorted} />
    );
  }
}
