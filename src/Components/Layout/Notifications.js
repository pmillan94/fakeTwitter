import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../Redux/actions/userActions';

class Notifications extends Component {
  //create a state
  state = {
    anchorEl: null
  };

  //func that handles what happens when user presses notification btn
  handleOpen = (event) => {
    //update state 
    this.setState({ anchorEl: event.target });
  };

  //func that handles what happens when user closes notification btn
  handleClose = () => {
    //once user view Notifications, setState to null
    this.setState({ anchorEl: null });
  };

  //
  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };

  render() {
    //create var from var in props
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationsIcon;

    //if there notifications, and are more than 0
    if (notifications && notifications.length > 0) {
      //filter notifications to return only the unread ones
      notifications.filter((not) => not.read === false).length > 0
        //set badge to icon
        ? (notificationsIcon = (
            //set number to badge by the number of unread notifications
            <Badge badgeContent={
                notifications.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          ))
          //else return the regular notificationsIcon withOut badges
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      //else if you have no notifications, show notification icon
      notificationsIcon = <NotificationsIcon />;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? 'primary' : 'secondary';
          const icon =
            not.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/users/${not.recipient}/scream/${not.screamId}`}
              >
                {not.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      );
      
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications
});

export default connect(mapStateToProps,{ markNotificationsRead })(Notifications);