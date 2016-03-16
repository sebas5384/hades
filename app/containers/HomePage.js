import React, { Component } from 'react';
import Home from '../components/Home';
import ShellAddForm from '../containers/ShellAddForm';
import ShellList from '../containers/ShellList';
import Divider from 'material-ui/lib/divider';

export default class HomePage extends Component {

  render() {
    const style = {
      marginTop: 10,
      marginBottom: 10
    }

    const subheaderStyle = {
      fontSize: 18
    }

    return (
      <div>
        <ShellAddForm />
        <ShellList subheaderStyle={subheaderStyle} style={style} />
      </div>
    );
  }
}
