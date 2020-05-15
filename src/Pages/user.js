import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../Components/Post/Post';
import StaticProfile from '../Components/Profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

// import ScreamSkeleton from '../Util/ScreamSkeleton';
// import ProfileSkeleton from '../Util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../Redux/actions/dataActions';

class user extends Component {

 //create a new state
  state = {
    profile: null,
    screamIdParam: null
  };

  //when component mounts fetch specific user data from props (handle, screamId)
  componentDidMount() {
    //create var to store prop values (will later be refrence)
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ screamIdParam: screamId });
    this.props.getUserData(handle);

    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }


  render() {

    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;

    const screamsMarkup = loading ? (
        //If we are loading
      // <ScreamSkeleton />
      <p>Loading data....</p>
      //if user does not have any screams
    ) : screams === null ? (
      <p>No screams from this user</p>
      //if user does have scream display screams
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
      //if user does have scream display screams
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream} />;
        else return <Scream key={scream.screamId} scream={scream} openDialog />;
      })
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {/* if profile is not found */}
          {this.state.profile === null ? (
            // <ProfileSkeleton />
            <p>Loading Profile...</p>
          ) : (
          // if profile exist, but is not logged in user
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

//needed props to workwith 
user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

//get data from state
const mapStateToProps = (state) => ({
  data: state.data
});

//import func getUserData with connect prop
export default connect(mapStateToProps,{ getUserData })(user);