import React from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { fetchAllNewsletters } from '../actions/newsletter';
import { Redirect } from 'react-router-dom';
import Bannerimg from '../logocolor.png'
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
                <div className="banner2">
                    <img src={Bannerimg}></img>
                </div>
                <Header title={this.props.selectedNewsletter.title} />
                {this.props.selectedNewsletter &&
                    <div className="info">

                        <dl>
                            <dt>Title:</dt>
                            <dd>{this.props.selectedNewsletter.title}</dd>
                            <dt>Author: </dt>
                            <dd>{this.props.selectedNewsletter.author}</dd>
                            <dt>Date:</dt>
                            <dd>{this.props.selectedNewsletter.date}</dd>
                            <dt>Intro:</dt>
                            <dd>{this.props.selectedNewsletter.intro}</dd>
                            <dt>Under Wraps: </dt>
                            <dd>{this.props.selectedNewsletter.underwraps}</dd>
                            <dt>{this.props.selectedNewsletter.qaTitle}:</dt>
                            <dd>{this.props.selectedNewsletter.qaContent}</dd>
                            <dt>Community Spotlight: {this.props.selectedNewsletter.communitySpotlightFeature}</dt>
                            <dd>{this.props.selectedNewsletter.communitySpotlightContent}</dd>
                            <dt>{this.props.selectedNewsletter.fieldTitle}</dt>
                            <dd>{this.props.selectedNewsletter.fieldContent}</dd>

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