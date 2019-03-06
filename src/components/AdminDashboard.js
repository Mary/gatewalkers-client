import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import Footer from './footer';
import Bannerimg from '../logowhite.png'


export function AdminDashboard(props) {

    return (
        <React.Fragment>

            <div className="dashboard">
            <div className="banner">
                <img src={Bannerimg}></img>
            </div>
                <h1>Welcome</h1>
                <Link className="black-button" to="/create-newsletter"><i className="fas fa-plus-square"></i>Create Newsletter</Link>
                <Link className="black-button" to="/view-newsletters"><i className="fas fa-list-alt"></i>View Newsletters</Link>
            </div>
            <Footer {...props} />
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.currentUser,
    };
};

export default requiresLogin()(connect(mapStateToProps)(AdminDashboard));