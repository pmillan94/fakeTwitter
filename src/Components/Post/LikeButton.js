import React, { Component } from 'react';
import MyButton from '../../Util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../Redux/actions/dataActions';

export class LikeButton extends Component {

   //check if likes array has this post from this user 
  likedScream = () => {
    if ( this.props.user.likes && this.props.user.likes.find(
        //find like, with the same screamId 
        (like) => like.screamId === this.props.screamId)
    )
        //if screamId is present in likes array,
      return true;
      //else return false
    else return false;
  };

  //if likeScream func gets called, call likeScream func in props
  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  //if unlikeScream func gets called, call unlikeScream func in props refrencing screamId
  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };


  render() {
    //import aunthenticated from props
    const { authenticated } = this.props.user;


    const likeButton = !authenticated ? (
        //if not auth, link user to login page
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>

      //if auth and liked, then unlike post
    ) : this.likedScream() ? (
      <MyButton tip="Undo like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
    //if auth and not liked, then like post
      <MyButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unlikeScream
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);