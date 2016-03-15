import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import {reduxForm} from 'redux-form';

import ShellForm from './ShellForm';
import ShellList from './ShellList';

export default class Home extends Component {
  render() {
    return (
      <div>
        <ShellList />
      </div>
    );
  }
}
