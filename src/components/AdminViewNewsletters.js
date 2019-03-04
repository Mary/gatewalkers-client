import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import { fetchAllNewsletters } from '../actions/newsletter';
// import NavBar from './nav-bar';

export class AdminViewNewsletters extends React.Component {
  // componentDidMount() {
  //   return this.props.dispatch(fetchAllNewsletters());
  // }
  render() {

    const ActiveNewsletters = this.props.newsletters.map((newsletter, i) => {
      return (
        <li className="newsletter-box" key={`newsletter-${i}`}>
        <Link className="a-box-2" to={`/edit-newsletter/${newsletter.id}`}>
        {newsletter.title}</Link>
        </li>
      )
    })

    return (
      <React.Fragment>
      {/* <NavBar /> */}
      <div className="outer-div">
        <div className="header-section">
        </div>
        <div className="main-div">
          <section className="newsletter-list">
            <ul>
              {ActiveNewsletters ? ActiveNewsletters : 'Loading.....'}
            </ul>
          </section>
        </div>
      </div>
   </React.Fragment >
        );
  }
}

const mapStateToProps = state => {
  return {
    polls: state.newsletters.ActiveNewsletters
  }
};

export default requiresLogin()(connect(mapStateToProps)(AdminViewNewsletters));
