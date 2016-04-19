import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import ShellForm, {fieldNames} from '../components/ShellForm';
import {save as saveShell, hideEditForm} from '../actions/shell';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import ShellEditFormValidation from '../validations/ShellEditFormValidation'

@connect(
  state => ({}),
  dispatch => bindActionCreators({saveShell, hideEditForm}, dispatch)
)
@reduxForm(
  {
    form: 'ShellEditForm',
    fields: fieldNames,
    validate: ShellEditFormValidation
  },
  state => ({
    initialValues: state.shell.items.filter(shell => {
      return shell.id == state.shell.editingHost
    })[0]
  })
)
export default class ShellEditForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    initialValues: PropTypes.object
  }

  static defaultProps = {
    title: 'Edit your Shell'
  }

  handleFormSubmit(data) {
    const {dispatch, resetForm} = this.props

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(data), 1000)
    })
    .then(() => {
      dispatch(hideEditForm())
      dispatch(resetForm())
      return dispatch(saveShell(data))
    })
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <ShellForm {...this.props} hideReset={true} handleSubmit={handleSubmit(this.handleFormSubmit.bind(this))} />
      </div>
    );
  }
}
