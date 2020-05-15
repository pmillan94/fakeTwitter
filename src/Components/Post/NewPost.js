import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../Util/MyButton';
import themeObject from '../../Util/theme';

// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../Redux/actions/dataActions';

const styles = (theme) => ({
  ...themeObject,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
});

class newPost extends Component {

//create a new state (Object)
  state = {
    open: false,
    body: '',
    errors: {}
  };

  //to recieve errors in the UI
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }

  //func to handle when user clicks new scream
  handleOpen = () => {
    this.setState({ open: true });
  };


  handleClose = () => {
    //clear errors in state
    this.props.clearErrors();
    //set state variables
    this.setState({ open: false, errors: {} });
  };


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };


  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body });
  };


  render() {

    //create ref to import var imported in props
    const { errors } = this.state;
    const { classes, UI: { loading } } = this.props;
    
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Scream!">
          <AddIcon />
        </MyButton>

        {/* Once user clicks btn open Dialog box */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
        {/* In Dialog if user clicks close, close dialog */}
          <MyButton tip="Close" onClick={this.handleClose} 
          tipClassName={classes.closeButton}>
            <CloseIcon />
          </MyButton>

        {/* In Dialog, display newPost Form */}
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SCREAM!!"
                multiline
                rows="3"
                placeholder="Scream at your fellow apes"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
            {/* show loading wheel only if user clicks submit */}
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

newPost.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(newPost));