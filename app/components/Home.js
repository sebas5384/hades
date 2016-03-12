import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import {reduxForm} from 'redux-form';

import ShellForm from './ShellForm';

export default class Home extends Component {
  render() {
    return (
      <div>
        <ShellForm />
      </div>
    );
  }
}
