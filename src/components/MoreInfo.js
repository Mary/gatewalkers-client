import React from 'react';
import Header from './header';
import { connect } from 'react-redux';
import {  fetchAllNewsletters } from '../actions/newsletter';
import { Redirect } from 'react-router-dom';

export class enduserinfoPage extends React.Component {

    componentDidMount() {
        return this.props.dispatch(fetchAllNewsletters());
    }

    render() {
        if (this.props.selectedNewsletter === null) {
            return <Redirect to="/" />
        }
        
        return (
            <React.Fragment>
                <Header title={this.props.selectedNewsletter.title} />
                {this.props.selectedNewsletter &&
                    <div className="info">
                        <dl>
                            <dt>Title:</dt>
                            <dd>{this.props.selectedNewsletter.title}</dd>
                            <dt>Author: </dt>
                            <dd>{this.props.selectedNewsletter.author}</dd>
                            <dt>Intro:</dt>
                            <dd>{this.props.selectedNewsletter.intro}</dd>
                    
                        </dl>
                    </div>
                }
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

export default connect(mapStateToProps)(enduserinfoPage);