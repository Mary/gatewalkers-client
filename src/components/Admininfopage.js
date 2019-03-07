import React from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { deleteNewsletter, fetchAllNewsletters, updateNewsletter } from '../actions/newsletter';
import { Redirect } from 'react-router-dom';
import Bannerimg from '../logowhite.png'

export class infoPage extends React.Component {
    state = {
        submitted: false
    }
    componentDidMount() {
        return this.props.dispatch(fetchAllNewsletters());
    }

    componentDidUpdate(prevProps) {
        if( this.props.selectedNewsletter.title !== prevProps.selectedNewsletter.title) {
          console.log(this.props.selectedNewsletter.title, prevProps.selectedNewsletter.title,'CONSOLELOG')
        }
      }

    triggerDelete(id) {
        this.props.dispatch(deleteNewsletter(id))
        this.setState({ Redirect: true, to: "/admindashboard" })
    }
    

     handleSubmit = (e) => {
        e.preventDefault()
        const allValues = { title: this.title.value, author: this.author.value, date: this.date.value, intro: this.intro.value, underwraps: this.underwraps.value, qaTitle: this.qaTitle.value, qaContent: this.qaContent.value, communitySpotlightFeature: this.communitySpotlightFeature.value,  communitySpotlightContent: this.communitySpotlightContent.value, fieldTitle: this.fieldTitle.value, fieldContent: this.fieldContent.value }
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
                        <label>Title:</label>
                        <input
                            name="title"
                            label="Title"
                            defaultValue={this.props.selectedNewsletter.title}
                            ref={(node) => { this.title = node }}
                        />
                        <label>Author:</label>
                        <input
                            name="author"
                            label="Author"
                            defaultValue={this.props.selectedNewsletter.author}
                            ref={(node) => { this.author = node }}
                        />
                        <label>Date:</label>
                        <input
                            name="date"
                            label="Date"
                            defaultValue={this.props.selectedNewsletter.date}
                            ref={(node) => { this.date = node }}
                        />
                        <label>Intro:</label>
                        <textarea
                            name="intro"
                            label="Intro"
                            defaultValue={this.props.selectedNewsletter.intro}
                            ref={(node) => { this.intro = node }}
                        />
                        <label>Under Wraps:</label>
                        <textarea
                            name="underwraps"
                            label="UnderWraps"
                            defaultValue={this.props.selectedNewsletter.underwraps}
                            ref={(node) => { this.underwraps = node }}
                        />
                        <label>Q & A Title:</label>
                        <input
                            name="qaTitle"
                            label="qaTitle"
                            defaultValue={this.props.selectedNewsletter.qaTitle}
                            ref={(node) => { this.qaTitle = node }}
                        />
                        <label>Q & A Content:</label>
                        <textarea
                            name="qaContent"
                            label="qaContent"
                            defaultValue={this.props.selectedNewsletter.qaContent}
                            ref={(node) => { this.qaContent = node }}
                        />
                        <label>Community Spotlight Feature:</label>
                        <input
                            name="communitySpotlightFeature"
                            label="communitySpotlightFeature"
                            defaultValue={this.props.selectedNewsletter.communitySpotlightFeature}
                            ref={(node) => { this.communitySpotlightFeature = node }}
                        />
                        <label>Community Spotlight Content:</label>
                        <textarea
                            name="communitySpotlightContent"
                            label="communitySpotlightContent"
                            defaultValue={this.props.selectedNewsletter.communitySpotlightContent}
                            ref={(node) => { this.communitySpotlightContent = node }}
                        />
                        <label>Field Title:</label>
                        <input
                            name="fieldTitle"
                            label="fieldTitle"
                            defaultValue={this.props.selectedNewsletter.fieldTitle}
                            ref={(node) => { this.fieldTitle = node }}
                        />
                        <label>Field Content:</label>
                        <textarea
                            name="fieldContent"
                            label="fieldContent"
                            defaultValue={this.props.selectedNewsletter.fieldContent}
                            ref={(node) => { this.fieldContent = node }}
                        />
                        <button type="submit" onClick={(e) => { this.handleSubmit(e) }}>
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
                {this.state.Redirect ? <Redirect to={this.state.to} /> : null}
                {/* {this.state.submitted ? <Redirect to="/admindashboard" /> : null} */}
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

