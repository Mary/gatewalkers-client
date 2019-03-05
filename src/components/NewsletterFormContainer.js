import React from 'react';

import Header from './header';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import NewsletterForm from './NewsletterForm';

export function NewsletterFormContainer(props) {

    return (
        <React.Fragment>
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
