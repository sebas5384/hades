import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade'
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox'
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts'
import DevicesIcon from 'material-ui/lib/svg-icons/device/devices'
import CommunicationVpnKey from 'material-ui/lib/svg-icons/communication/vpn-key'
import FileCloud from 'material-ui/lib/svg-icons/file/cloud'
import ActionAccountCircle from 'material-ui/lib/svg-icons/action/account-circle'

export default class ShellList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    style: PropTypes.object,
    subheader: PropTypes.string,
    subheaderStyle: PropTypes.object
  }

  renderShellProps(item) {
    let itemProps = [];

    if (item.hasOwnProperty('user') && item.user && item.user !== '') {
      itemProps = itemProps.concat(
        <ListItem primaryText={item.user} leftIcon={<ActionAccountCircle />} />
      )
    }

    if (item.hasOwnProperty('host') && item.host && item.host !== '') {
      itemProps = itemProps.concat(
        <ListItem primaryText={item.host} leftIcon={<FileCloud />} />
      )
    }

    if (item.hasOwnProperty('identityFile') && item.identityFile && item.identityFile !== '') {
      itemProps = itemProps.concat(
        <ListItem primaryText={item.identityFile} leftIcon={<CommunicationVpnKey />} />
      )
    }

    return itemProps;
  }

  render() {
    const { items } = this.props;
    return (
      <List {...this.props} >
        {items && items.map((item, key) =>
          (
            <div>
              <Divider />
              <ListItem
                key={key}
                primaryText={item.alias}
                leftIcon={<DevicesIcon />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={this.renderShellProps(item)}
                initiallyOpen={key === 0}
              />
            </div>
          )
        )}
      </List>
    )
  }
}
