import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import ShellForm, {fieldNames} from '../components/ShellForm';
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
  fields: fieldNames,
  validate: ShellAddFormValidation
})
export default class ShellAddForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  static defaultProps = {
    title: 'Create your Shell'
  }

  handleFormSubmit(data) {
    const {dispatch, resetForm} = this.props

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(data), 1000)
    })
    .then(() => {
      dispatch(hideAddForm())
      dispatch(resetForm())
      return dispatch(addShell(data))
    })
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <ShellForm {...this.props} handleSubmit={handleSubmit(this.handleFormSubmit.bind(this))} />
      </div>
    );
  }
}
