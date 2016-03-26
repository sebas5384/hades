import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './ShellForm.css';
import {reduxForm} from 'redux-form';
import Divider from 'material-ui/lib/divider';

import Paper from 'material-ui/lib/paper'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import CircularProgress from 'material-ui/lib/circular-progress';

export const fieldNames = ['host', 'hostName', 'user', 'identityFile']

export default class ShellForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    title: PropTypes.string
  }

  render() {
    const {
      fields: {host, hostName, user, identityFile},
      handleSubmit,
      resetForm,
      submitting,
      errors,
      title
    } = this.props

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

    const hasErrors = (Object.keys(errors).length !== 0)

    return (
      <Card style={style}>
        {title &&
          <CardTitle title={title}/>
        }
        <form onSubmit={handleSubmit}>
          <TextField fullWidth={true} style={fieldStyle}
            errorText={host.touched && host.error && host.error}
            hintText="Alias (Ex: myproject.dev)" {...host}
          />
          <TextField fullWidth={true} style={fieldStyle}
            errorText={hostName.touched && hostName.error && hostName.error}
            hintText="Host (Ex: 127.0.0.1)" {...hostName}
          />
          <TextField fullWidth={true} style={fieldStyle} hintText="User (Ex: root)" {...user} />
          <TextField fullWidth={true} style={fieldStyle} hintText="Identity File (Ex: ~/.ssh/myproject.pem)" {...identityFile} />

          <CardActions style={actionsStyle}>
            <RaisedButton type="submit"
              label={submitting ? 'Saving' : 'Save'}
              primary={true}
              disabled={submitting || hasErrors}
            />
            <FlatButton label="Clear values" disabled={submitting} onClick={resetForm} />
          </CardActions>
          {submitting &&
            <CircularProgress style={{margin: '1em auto', display: 'block'}} />
          }
        </form>
      </Card>
    )
  }
}
