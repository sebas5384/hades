import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import ShellForm from '../components/ShellForm';
import {add as addShell, hideAddForm} from '../actions/shell';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import ShellAddFormValidation from '../validations/ShellAddFormValidation'

@connect(
  state => ({}),
  dispatch => bindActionCreators({addShell, hideAddForm}, dispatch)
)
@reduxForm({
  form: 'ShellAddForm',
  fields: ['alias', 'host', 'user', 'identityFile'],
  validate: ShellAddFormValidation
})
export default class ShellAddForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  handleFormSubmit(data) {
    this.props.hideAddForm();
    this.props.resetForm();
    return this.props.addShell(data);
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <ShellForm {...this.props} handleSubmit={handleSubmit(this.handleFormSubmit.bind(this))} />
    );
  }
}
