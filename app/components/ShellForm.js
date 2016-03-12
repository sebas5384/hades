import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './ShellForm.css';
import {reduxForm} from 'redux-form';

export const fields = ['alias', 'host', 'user', 'identityFile'];

class ShellForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  saveSubmit(data) {
    // console.log(data, 'DATA')
    this.props.handleSubmit(data)
  }

  render() {
    const {
      fields: {alias, host, user, identityFile},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.saveSubmit.bind(this))}>
        <input type="text" placeholder="Alias (Ex: myproject.dev)" {...alias} />
        <input type="text" placeholder="Host (Ex: 127.0.0.1)" {...host} />
        <input type="text" placeholder="User (Ex: root)" {...user} />
        <input type="text" placeholder="Identity File (Ex: ~/.ssh/myproject.pem)" {...identityFile} />
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Saving' : 'Save'}
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'ShellForm',
  fields
})(ShellForm);
