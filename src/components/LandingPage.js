import React from 'react';
import { connect } from 'react-redux';
import {
    Link,
    Redirect
} from 'react-router-dom';
import logo from '../VSNR_Logo.png';


export function LandingPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/admindashboard" />;
    }

    return (
        <React.Fragment>
       
            <div className="landing-page">
            <img className="logo" src={logo} alt="logo"/>
               
                <i><h1>Visionary Realms Demo</h1></i><br>
                </br>
                <div className="desc">
                    Portal for End Users & Gatewalkers to Create Newsletters
                 </div>
                <br></br>
                <Link className="black-button" to="/part-the-veil">Welcome Gatewalkers</Link>
                <Link className="black-button" to="/news">Latest News</Link>
            </div>
        </React.Fragment>
    );
}
const mapStateToProps = state => ({
    loggedIn: state.authReducer.currentUser !== null
});
export default connect(mapStateToProps)(LandingPage);