import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Post from '../Components/Post/Post';
import Profile from '../Components/Profile/Profile';
//redux stuff
import { connect } from 'react-redux';
import { getScreams } from '../Redux/actions/dataActions';


class home extends Component {
    
    //call func imported by props called getScreams
    componentDidMount() {
        this.props.getScreams();
      }


    render() {
        //declare var from props
        const { screams, loading } = this.props.data;

        //create func to show recentPosts
        let recentScreamsMarkup = !loading ? (
            screams.map((scream) => <Post key={scream.screamId} scream={scream} />)
          ) : (
              //else
            <p>Loading..</p>
        );
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup} {/* Content  */}
                </Grid>
                <Grid item sm={4} xs={12}>
                   <Profile />
                </Grid>

            </Grid>
        );
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(mapStateToProps, { getScreams })(home);
