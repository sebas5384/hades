import React, { Component, PropTypes } from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import FolderIcon from 'material-ui/lib/svg-icons/file/folder'

export default class GroupList extends Component {

  static propTypes = {
    initiallyOpen: PropTypes.bool,
    items: PropTypes.array.isRequired,
    style: PropTypes.object,
    handleOpen: PropTypes.func.isRequired
  }

  render() {
    const { items, initiallyOpen } = this.props;

    const PrimaryText = ({name}) => (
      <div>
        <strong>{name}</strong>
      </div>
    )

    return (
      <List {...this.props} >
        {items && items.map((item, key) =>
          (
            <div key={key + item}>
              <Divider />
              <ListItem
                primaryText={<PrimaryText name={item} />}
                leftIcon={<FolderIcon />}
                onTouchTap={this.props.handleOpen(item)}
              />
            </div>
          )
        )}
      </List>
    )
  }
}
