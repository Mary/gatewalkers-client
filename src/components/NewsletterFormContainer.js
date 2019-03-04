import React from 'react';
// import Header from './header';
// import Banner from './banner';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import NewsletterForm from './NewsletterForm';

export function NewsletterFormContainer(props) {

    return (
        <React.Fragment>

            <div className="createNewsletter">
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
