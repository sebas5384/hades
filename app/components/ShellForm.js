import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './ShellForm.css';
import {reduxForm} from 'redux-form';
import Divider from 'material-ui/lib/divider';

import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

export const fields = ['alias', 'host', 'user', 'identityFile'];

@reduxForm({
  form: 'ShellForm',
  fields
})
export default class ShellForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  handleSubmit(data) {
    return Promise.resolve({data})
  }

  render() {
    const {
      fields: {alias, host, user, identityFile},
      handleSubmit,
      onSave,
      resetForm,
      submitting
    } = this.props;

    const style = {
      marginLeft: 20
    };

    return (
      <Card>
        <form onSubmit={handleSubmit(onSave)}>
          <TextField fullWidth={true} style={style} underlineShow={false} hintText="Alias (Ex: myproject.dev)" {...alias} />
          <Divider />
          <TextField fullWidth={true} style={style} underlineShow={false} hintText="Host (Ex: 127.0.0.1)" {...host} />
          <Divider />
          <TextField fullWidth={true} style={style} underlineShow={false} hintText="User (Ex: root)" {...user} />
          <Divider />
          <TextField fullWidth={true} style={style} underlineShow={false} hintText="Identity File (Ex: ~/.ssh/myproject.pem)" {...identityFile} />
          <Divider />
          <CardActions>
            <RaisedButton type="submit" label={submitting ? 'Saving' : 'Save'} primary={true} disabled={submitting} />
            <FlatButton label="Clear values" disabled={submitting} onClick={resetForm} />
          </CardActions>
        </form>
      </Card>
    );
  }
}

// export default reduxForm({
//   form: 'ShellForm',
//   fields
// })(ShellForm);
