import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import themeObject from '../../Util/theme';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../Util/MyButton';
// import ProfileSkeleton from '../../util/ProfileSkeleton';

// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../Redux/actions/userActions';

//import theme class from app.js page
const styles = {
    paper: themeObject.paper,
    profile: themeObject.profile,
    ...themeObject
};



class Profile extends Component {

  handleImageChange = (event) => {
    //creat var for image selected
    const image = event.target.files[0];
    //create var for formData to be submitted
    const formData = new FormData();
    //add file to object of formData
    formData.append('image', image, image.name);
    //call uploadImage func to upload img to db
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    //get file
    const fileInput = document.getElementById('imageInput');
    //open file selection window
    fileInput.click();
  };


  handleLogout = () => {
      //calls func from props
    this.props.logoutUser();
  };


  render() {
    const { classes, user: { credentials: { userName, createdAt, imageUrl, bio, website, location },
        loading, authenticated } } = this.props;

    //
    let profileMarkup = !loading ? (
        //if not loading, and auth
      authenticated ? (
          //
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file" id="imageInput" hidden="hidden"
                onChange={this.handleImageChange}
              />
              <MyButton tip="Edit profile picture"
                onClick={this.handleEditPicture} btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink component={Link} to={`/users/${userName}`} color="primary" variant="h5">
                @{userName}
              </MuiLink>
              <hr />
              {/* If user has bio then show bio, else dont show */}
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {/* If user has location then show location, else dont show */}
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {/* If user has website then show website, else dont show */}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {' '}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              {/* Show calendar object */}
              <CalendarToday color="primary" />{' '}
              <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
            <MyButton tip="Logout" onClick={this.handleLogout}>
              <KeyboardReturn color="primary" />
            </MyButton>
            <EditDetails />
          </div>
        </Paper>
        //if not loading, and not auth
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="primary" component={Link} to="/login">
              Login
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/signup">
              Signup
            </Button>
          </div>
        </Paper>
      )
      //if loading, show profile skeleton
    ) : (
    //   <ProfileSkeleton />
        <p>loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };


Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));