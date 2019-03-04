import React from 'react';
// import Header from './header';
import { connect } from 'react-redux';
// import { deleteNewsletter } from '../actions/newsletter';
import { Redirect } from 'react-router-dom';
// import Banner from './banner';

export class EditNewsletter extends React.Component {
    state = {
        submitted: false
    }

    render() {

        return (
            <React.Fragment>
                <div><h1>Edit Newsletter Page</h1></div>

            </React.Fragment>
        );
    }
}
const mapStateToProps = (state, originalProps) => {
    const selectedNewsletter = state.newsletterReducer.newsletters.find(newsletter => newsletter.id === originalProps.match.params.newsletterId)
    return {
        username: state.authReducer.currentUser,
        selectedNewsletter
    };
};

export default connect(mapStateToProps)(EditNewsletter);