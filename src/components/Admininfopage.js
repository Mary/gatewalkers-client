import React from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { deleteNewsletter, fetchAllNewsletters,updateNewsletter } from '../actions/newsletter';
import { Redirect } from 'react-router-dom';
import Bannerimg from '../logowhite.png'

export class infoPage extends React.Component {
    state = {
        submitted: false
    }
    componentDidMount() {
        return this.props.dispatch(fetchAllNewsletters());
    }
    triggerDelete(id) {
        this.props.dispatch(deleteNewsletter(id))
            .then(() => {
                this.setState({
                    submitted: true
                })
            })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        const allValues={author: this.author.value, date: this.date.value}
        this.props.dispatch(updateNewsletter(this.props.selectedNewsletter.id, allValues))

        this.setState({ editMode: false })
    }
    editNewsletter = () => {
        return (
            <>
                <div className="banner">
                    <img src={Bannerimg}></img>
                </div>
                <Header title={this.props.selectedNewsletter.title} />
                <div className="newsletterForm">
                    <form>
                        <label>Author</label>
                        <input
                            name="author"
                            defaultValue={this.props.selectedNewsletter.author}
                            ref={(node)=>{this.author=node}}
                        />
                       
                        <input
                            name="date"
                            label="Date"
                            defaultValue={this.props.selectedNewsletter.date}
                            ref={(node)=>{this.date=node}}
                        />
                        <input
                            name="title"
                            label="Title"
                            defaultValue={this.props.selectedNewsletter.title}
                        />
                        <textarea
                            name="intro"
                            label="Intro"
                            defaultValue={this.props.selectedNewsletter.intro}
                        />
                        <button type="submit" onClick={(e)=>{this.handleSubmit(e)}}>
                            Update Newsletter</button>
                    </form>
                </div>
            </>
        )
    }


    render() {
        
        const id = this.props.selectedNewsletter ? this.props.selectedNewsletter.id : null;
        let deleteNewsletterButton;
        let editNewsletterButton;
        if (this.state.editMode) {
            return this.editNewsletter()
        }
        if (this.props.username.id) {
            deleteNewsletterButton = (
                <button onClick={() => this.triggerDelete(id)}> Delete Newsletter</button>
            );
            editNewsletterButton = (
                <button onClick={() => this.setState({ editMode: true })}>Edit Newsletter</button>
            );
        }
        return (
            <React.Fragment>

                {this.state.submitted ? <Redirect to="/admindashboard" /> : null}
                <div className="banner">
                    <img src={Bannerimg}></img>
                </div>
                <Header title={this.props.selectedNewsletter.title} />
                {this.state.editMode ? this.editNewsletter() : (
                    this.props.selectedNewsletter && (
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

                                {editNewsletterButton}
                                {deleteNewsletterButton}
                            </dl>
                        </div>)
                )}
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
export default (connect(mapStateToProps)(infoPage));

