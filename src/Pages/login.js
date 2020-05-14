import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Images/no-img.png';
import { Link } from 'react-router-dom';
import themeObject from '../Util/theme';

//MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../Redux/actions/userActions';


//import theme class from app.js page
const styles = {
    form: themeObject.form,
    logoImg: themeObject.image,
    pageTitle: themeObject.pageTitle,
    textField: themeObject.textField,
    button: themeObject.button,
    customError: themeObject.customError,
    progress: themeObject.progress
};

class Login extends Component {
    //controled component
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    //func to recieve UI props and display errors at login, signup
    componentWillReceiveProps(nextProps) {
        //if we get errors, set errors to that errors object
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
    }


    //func to handle once user clicks submit
    handleSubmit = (event) => {
        //prevent user from submitting empty values
        event.preventDefault();

        //Get data before submitting
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        //call func loginUser to redirect, if successful
        this.props.loginUser(userData, this.props.history);
        
    };

    //func to handleChnage in Textfields and get user input
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        //import classes
        const { classes, UI: { loading }} = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={Icon} alt="NewUser" className={classes.logoImg}/>
                    <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField 
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth 
                        />
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            fullWidth 
                        />
                        {errors.general && (
                            <Typography variant="h2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            //Disable button when loading
                            disabled={loading}
                        >
                            Login
                            {/* Will show a loading circle after user clicks login btn */}
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                            {/* Text that will redirect user to creat a new account(signup) */}
                            <br/><br/><small>Dont have an account? Sign up <Link to="/signup">here</Link></small>

                    </form> 
                </Grid>
                <Grid item sm/> 
            </Grid>
        )
    }
}

//import func and objects
Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  };

//func that looks at global state and take what it needs
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});
  
//func that checks what actions are going to be used
const mapActionsToProps = {
    loginUser
};

//use connect to redirect states and props
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));