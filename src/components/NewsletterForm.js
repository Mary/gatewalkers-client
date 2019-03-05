import React from 'react';
import { reduxForm, Field, focus, reset } from 'redux-form';
import { required, nonEmpty, isTrimmed, isDate } from '../validators';
import Input from './input';
import {createNewsletter} from '../actions/newsletter';

export class newsletterForm extends React.Component {
    onSubmit(values) {
        const {author, title, date, intro, underwraps, qaTitle, qaContent, communitySpotlightFeature, communitySpotlightContent, fieldTitle, fieldContent} = values;
        return this.props.dispatch(createNewsletter(author, title, date, intro, underwraps, qaTitle, qaContent, communitySpotlightFeature,communitySpotlightContent, fieldTitle, fieldContent))
        .then(()=>this.props.dispatch(reset('newsletter')))
    }

        render() {
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
                        <button type="submit"><i className="fas fa-plus-square">
                        </i> Create Newsletter</button>
                    </form>
                </div>
            );
        }
    }


export default reduxForm({
    form: 'newsletter',
    onSubmitFail: (errors, dispatch, err) =>{
        console.log(err)
        dispatch(focus('newsletter', Object.keys(errors)[0]))
    }
})(newsletterForm);
