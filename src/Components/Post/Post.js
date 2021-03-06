import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../Util/MyButton';
import LikeButton from './LikeButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Post extends Component {
    render() {
        //initialize relativeTime
        dayjs.extend(relativeTime);

        const {
            classes,
            scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
            user: { authenticated, credentials: { userName } }
          } = this.props;


        //create func to allow user to see delete btn only if they are auth, and they are the ones that created it
        const deleteButton = authenticated && userHandle === userName ? (
            <DeletePost screamId={screamId} />
        ) : null;

        return (

            //render post objects with data from databse
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile Image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} />
                        <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                        <span>{commentCount} comments</span>
                    <PostDialog
                        screamId={screamId}
                        userHandle={userHandle}
                        openDialog={this.props.openDialog}
                    />
                </CardContent>
            </Card>
        )
    }
}


Post.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
  };
  
const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));