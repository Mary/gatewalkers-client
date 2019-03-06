import React from 'react';
import { connect } from 'react-redux';
import { fetchAllNewsletters } from '../actions/newsletter';
import { Link } from 'react-router-dom';
import Header from './header';
import Bannerimg from '../logocolor.png'


export class NewsContainer extends React.Component {
    componentDidMount() {
        return this.props.dispatch(fetchAllNewsletters());
    }

    render() {
        const listItems = this.props.newsletters.map((newsletter, i) => <><dt key={i}>{newsletter.title}</dt><dd>{newsletter.intro}</dd><Link className="read-more" to={`/newsletter/${newsletter.id}`}><span className="blue-span">Read More...</span></Link></>
        );
        return (
            <div className="news-container">
                <div className="banner2">
                    <img src={Bannerimg}></img>
                </div>
                <Header />
                <h1>Newsletters</h1>
                <dl>
                    {listItems}
                </dl>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    newsletters: state.newsletterReducer.newsletters
});

export default connect(mapStateToProps)(NewsContainer);