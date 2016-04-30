import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Home from '../components/Home';
import ShellAddForm from '../containers/ShellAddForm';
import ShellEditForm from '../containers/ShellEditForm';
import ShellList from '../containers/ShellList';
import GroupList from '../containers/GroupList';
import Divider from 'material-ui/lib/divider';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';


import {
  showAddForm as showAddShellForm,
  hideAddForm as hideAddShellForm,
  showEditForm as showEditShellForm,
  hideEditForm as hideEditShellForm,
  syncFromLocal
} from '../actions/shell';

@connect(
  state => ({
    showingShellForm: state.shell.showingAddForm,
    showingEditShellForm: state.shell.showingEditForm,
    shellItems: state.shell.items
  }),
  dispatch => bindActionCreators({
    showAddShellForm, hideAddShellForm,
    showEditShellForm, hideEditShellForm,
    syncFromLocal
  }, dispatch)
)
export default class HomePage extends Component {

  static propTypes = {
    showingShellForm: PropTypes.bool.isRequired,
    showAddShellForm: PropTypes.func.isRequired,
    hideAddShellForm: PropTypes.func.isRequired,
    showingEditShellForm: PropTypes.bool.isRequired,
    showEditShellForm: PropTypes.func.isRequired,
    hideEditShellForm: PropTypes.func.isRequired
  }

  handleShellAddActionButton(event) {
    // Toggle.
    if (this.props.showingShellForm) {
      this.props.hideAddShellForm()
    }
    else {
      this.props.showAddShellForm()
      this.props.hideEditShellForm()
    }
    return true;
  }

  componentWillMount() {
    this.props.syncFromLocal()
  }

  render() {
    const {showingShellForm, showingEditShellForm, shellItems} = this.props;

    const groupListStyle = {
      marginRight: 5,
      width: '30%'
    }

    const shellListStyle = {
      flex: 1,
      marginLeft: 5
    }

    const subheaderStyle = {
      fontSize: 18,
      lineHeight: 4
    }

    const shellAddActionButtonStyle = {
      position: 'fixed',
      right: '1em',
      top: '1em'
    }

    const explorerWrapperStyle = {
      display: 'flex',
      alignContent: 'stretch',
      flexDirection: 'row',
      marginBottom: '3em'
    }

    const shellEditFormStyle = {
      marginBottom: 10
    }

    return (
      <div>
        {showingShellForm &&
          <ShellAddForm style={shellEditFormStyle} />
        }

        {showingEditShellForm &&
          <ShellEditForm style={shellEditFormStyle} />
        }

        {shellItems.length > 0 &&
          <div style={explorerWrapperStyle}>
            <GroupList subheaderStyle={subheaderStyle} style={groupListStyle} />
            <ShellList subheaderStyle={subheaderStyle} style={shellListStyle} />
          </div>
        }

        {shellItems.length > 0 &&
          <FloatingActionButton
            onMouseUp={this.handleShellAddActionButton.bind(this)}
            style={shellAddActionButtonStyle}
            iconStyle={showingShellForm && {transform: 'rotate(112deg)'} || {}}
            secondary={showingShellForm}
          >
            <ContentAdd />
          </FloatingActionButton>
        }
      </div>
    );
  }
}
