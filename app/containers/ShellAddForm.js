import React, { Component } from 'react';
import ShellForm from '../components/ShellForm';
import {add as addShell} from '../actions/shell';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

@connect(
  state => ({}),
  dispatch => bindActionCreators({addShell}, dispatch)
)
export default class ShellAddForm extends Component {

  handleSubmit(data) {
    return this.props.addShell(data);
  }

  render() {
    return (
      <ShellForm onSave={this.handleSubmit.bind(this)} />
    );
  }
}
