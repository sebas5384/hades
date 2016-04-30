import React, { Component, PropTypes } from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import FolderIcon from 'material-ui/lib/svg-icons/file/folder'
import FolderOpenIcon from 'material-ui/lib/svg-icons/file/folder-open'

export default class GroupList extends Component {

  static propTypes = {
    initiallyOpen: PropTypes.bool,
    items: PropTypes.array.isRequired,
    style: PropTypes.object,
    handleFilter: PropTypes.func.isRequired,
    active: PropTypes.string.isRequired
  }

  render() {
    const { items, initiallyOpen, active} = this.props;

    const PrimaryText = ({name}) => (
      <div>
        <strong>{name}</strong>
      </div>
    )

    const LeftIcon = ({item, active}) => {
      if (item == active) {
        return <FolderOpenIcon />
      }
      return <FolderIcon />
    }

    return (
      <List {...this.props} >
        {items && items.map((item, key) =>
          (
            <div key={key + item}>
              <Divider />
              <ListItem
                primaryText={<PrimaryText name={item} />}
                leftIcon={LeftIcon({item, active})}
                onTouchTap={this.props.handleFilter(item)}

              />
            </div>
          )
        )}
      </List>
    )
  }
}
