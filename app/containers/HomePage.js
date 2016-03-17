import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Home from '../components/Home';
import ShellAddForm from '../containers/ShellAddForm';
import ShellList from '../containers/ShellList';
import Divider from 'material-ui/lib/divider';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import {showAddForm, hideAddForm} from '../actions/shell';

@connect(
  state => ({showShellForm: state.shell.showAddForm}),
  dispatch => bindActionCreators({showAddForm, hideAddForm}, dispatch)
)
export default class HomePage extends Component {

  static propTypes = {
    showShellForm: PropTypes.bool.required,
    showAddForm: PropTypes.func.required,
    hideAddForm: PropTypes.func.required
  }

  handleShellAddActionButton(event) {
    // Toggle.
    if (this.props.showShellForm) {
      this.props.hideAddForm();
    }
    else {
      this.props.showAddForm();
    }
    return true;
  }

  render() {
    const {showShellForm} = this.props;

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

    // Rotate add action to appear as an X.
    if (showShellForm) {
      shellAddActionButtonStyle = {
        ...shellAddActionButtonStyle,
        transform: 'rotate(43deg)'
      }
    }

    return (
      <div>
        {showShellForm &&
          <ShellAddForm />
        }
        <ShellList subheaderStyle={subheaderStyle} style={style} />
        <FloatingActionButton
          onMouseUp={this.handleShellAddActionButton.bind(this)}
          style={shellAddActionButtonStyle}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}
