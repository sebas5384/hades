import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Home from '../components/Home';
import ShellAddForm from '../containers/ShellAddForm';
import ShellList from '../containers/ShellList';
import Divider from 'material-ui/lib/divider';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import {showAddForm as showAddShellForm, hideAddForm as hideAddShellForm} from '../actions/shell';

@connect(
  state => ({
    showingShellForm: state.shell.showingAddForm,
    shellItems: state.shell.items
  }),
  dispatch => bindActionCreators({showAddShellForm, hideAddShellForm}, dispatch)
)
export default class HomePage extends Component {

  static propTypes = {
    showingShellForm: PropTypes.bool.isRequired,
    showAddShellForm: PropTypes.func.isRequired,
    hideAddShellForm: PropTypes.func.isRequired
  }

  handleShellAddActionButton(event) {
    // Toggle.
    if (this.props.showingShellForm) {
      this.props.hideAddShellForm();
    }
    else {
      this.props.showAddShellForm();
    }
    return true;
  }

  render() {
    const {showingShellForm, shellItems} = this.props;

    const style = {
      marginTop: 10,
      marginBottom: 10
    }

    const subheaderStyle = {
      fontSize: 18
    }

    let shellAddActionButtonStyle = {
      position: 'fixed',
      right: '1em',
      top: '1em'
    }

    return (
      <div>
        {showingShellForm &&
          <ShellAddForm />
        }

        {shellItems.length > 0 &&
          <ShellList subheaderStyle={subheaderStyle} style={style} />
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
