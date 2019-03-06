import React from 'react';
import { connect } from 'react-redux';
import { fetchAllNewsletters } from '../actions/newsletter';
import { Link } from 'react-router-dom';
import Header from './header';
import Bannerimg from '../logowhite.png'

export class NewsContainer extends React.Component {
    componentDidMount() {
        return this.props.dispatch(fetchAllNewsletters());
    }

    render() {
        const listItems = this.props.newsletters.map((newsletter, i) => <li key={i}><span>{newsletter.date}</span><Link to={`/info/${newsletter.id}`}>{newsletter.title}</Link></li>);
        return (
            <div className="admin-news-container">
                <div className="banner">
                    <img src={Bannerimg}></img>
                </div>
                <Header />
                <ul><h1>Newsletters</h1>
                    {listItems}
                </ul>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    newsletters: state.newsletterReducer.newsletters
});

export default connect(mapStateToProps)(NewsContainer);