import React from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { deleteNewsletter, fetchAllNewsletters, handleUpdate } from '../actions/newsletter';
import { Redirect } from 'react-router-dom';
import Input from './input';
import {required, nonEmpty, isTrimmed} from '../validators';
import {Field, reduxForm, focus} from 'redux-form';

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
    onSubmit = () => {
        //get the data from inputs

        let title = this.title.current.value
        //make request 
        this.setState({ editMode: false })
    }
    editNewsletter = () => {
        return (
            <div className="newsletterForm">
            <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                <Field
                    component={Input}
                    name="author"
                    label="Author"
               
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <Field
                    component={Input}
                    name="title"
                    label="Title"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                                        <Field
                    component={Input}
                    name="date"
                    label="Date"
                    validate={[required, nonEmpty]}
                />
               
                <Field
                    component={Input}
                    element="textarea"
                    name="intro"
                    label="Intro"
                />
                <Field
                    component={Input}
                    element="textarea"
                    name="underwraps"
                    label="Under Wraps"
                />
                                        <Field
                    component={Input}
                    name="qaTitle"
                    label="Q & A Title"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                                        <Field
                    component={Input}
                    element="textarea"
                    name="qaContent"
                    label="Q&A Content"
                />
                                                                <Field
                    component={Input}
                    name="communitySpotlightFeature"
                    label="Community Spotlight Feature"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                    <Field
                    component={Input}
                    element="textarea"
                    name="communitySpotlightContent"
                    label="Community Spotlight Content"
                />
                                                                <Field
                    component={Input}
                    name="fieldTitle"
                    label="Field Title"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                                        <Field
                    component={Input}
                    element="textarea"
                    name="fieldContent"
                    label="Field Content"
                />
                <button type="submit">
                Update Newsletter</button>
            </form>
        </div>
    
        )
    }


    render() {

        // if (this.state.submitted) {
        //     return <Redirect to="/admindashboard" />
        // }
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
                                <dt>{this.props.selectedNewsletter.communitySpotlightFeature}</dt>
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
        initialValues: {author: selectedNewsletter.author},
        username: state.authReducer.currentUser,
        selectedNewsletter
    };
};
export default reduxForm({
    form: 'newsletter',
    onSubmitFail: (errors, dispatch, err) =>{
        console.log(err)
        dispatch(focus('newsletter', Object.keys(errors)[0]))
    }
})( connect(mapStateToProps)(infoPage));