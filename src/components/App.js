import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import LandingPage from './LandingPage';
import News from './News';
import AdminDashboard from './AdminDashboard';
import PartTheVeil from './PartTheVeil';
import Newsletter from './Newsletter';
import EditNewsletter from './AdminEditNewsletter';
import AdminViewNewsletters from './AdminViewNewsletters'
import NewsletterFormContainer from './NewsletterFormContainer';
import InfoPage from './Admininfopage';
import EndUserInfopage from './MoreInfo';



import { refreshAuthToken } from '../actions/auth';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {

            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {

            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/News" component={News} />
                <Route exact path="/News/:newsletterId" component={Newsletter} />
                <Route exact path="/admindashboard" component={AdminDashboard} />
                <Route exact path="/part-the-veil" component={PartTheVeil} />
                <Route exact path="/edit-newsletter/:newsletterId" component={EditNewsletter} />
                <Route exact path="/view-newsletters" component={AdminViewNewsletters} />
                <Route exact path="/create-newsletter" component={NewsletterFormContainer} />
                <Route exact path="/info/:newsletterId" component={InfoPage} />
                <Route exact path="/newsletter/:newsletterId" component={EndUserInfopage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.authToken !== null,
    loggedIn: state.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));