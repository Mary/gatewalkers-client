import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './header';
// import Banner from './banner';
import LoginForm from './LoginForm';

export function PartTheVeil(props) {

    if (props.loggedIn) {
        return <Redirect to="/admindashboard" />;
    }
    return (
        <React.Fragment>
            {/* <Banner/> */}
            <div className="part-the-veil">
                <LoginForm />
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return ({
    loggedIn: state.authReducer.currentUser !== null
});}

export default connect(mapStateToProps)(PartTheVeil);