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

export default class ShellForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  render() {
    const {
      fields: {alias, host, user, identityFile},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    const fieldStyle = {
      marginBottom: 10,
      paddingLeft: 7
    }

    const actionsStyle = {
      marginBottom: 10
    }

    const style = {
      paddingLeft: 13,
      paddingTop: 10
    }

    return (
      <Card style={style}>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth={true} style={fieldStyle}
            errorText={alias.touched && alias.error && alias.error}
            hintText="Alias (Ex: myproject.dev)" {...alias}
          />
          <TextField fullWidth={true} style={fieldStyle}
            errorText={host.touched && host.error && host.error}
            hintText="Host (Ex: 127.0.0.1)" {...host}
          />
          <TextField fullWidth={true} style={fieldStyle} hintText="User (Ex: root)" {...user} />
          <TextField fullWidth={true} style={fieldStyle} hintText="Identity File (Ex: ~/.ssh/myproject.pem)" {...identityFile} />
          <CardActions style={actionsStyle}>
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
