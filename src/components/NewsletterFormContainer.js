import React from 'react';
import Header from './header';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Bannerimg from '../logowhite.png'
import NewsletterForm from './NewsletterForm';

export function NewsletterFormContainer(props) {

    return (
        <React.Fragment>
                        <div className="banner">
                <img src={Bannerimg}></img>
            </div>
<Header />
            <div className="createNewsletter">
            <h1>Newsletter Creation Form</h1>
                <NewsletterForm />
            </div>
      
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.currentUser,
    };
};

export default requiresLogin()(connect(mapStateToProps)(NewsletterFormContainer));
