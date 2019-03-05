import React from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { deleteNewsletter, fetchAllNewsletters } from '../actions/newsletter';
import { Redirect } from 'react-router-dom';

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
    editNewsletter=()=>{
        return(
            <div>Edit</div>
        )
    }

    
    render() {
        
        // if (this.state.submitted) {
        //     return <Redirect to="/admindashboard" />
        // }
        const id = this.props.selectedNewsletter ? this.props.selectedNewsletter.id : null;
        let deleteNewsletterButton;
        let editNewsletterButton;
        if(this.state.editMode){
            return this.editNewsletter()
        }
        if (this.props.username.id) {
            deleteNewsletterButton = (
                <button onClick={() => this.triggerDelete(id)}> Delete Newsletter</button>
            );
            editNewsletterButton = (
                <button onClick={() => this.setState({editMode:true})}>Edit Newsletter</button>
            );
        }
        return (
            <React.Fragment>

            {this.state.submitted?<Redirect to="/admindashboard" /> : null}

                <Header title="Info" />
                
                {this.props.selectedNewsletter &&
                    <div className="info">
                    
                        <dl>
                            <dt>Title:</dt>
                            <dd>{this.props.selectedNewsletter.title}</dd>
                            <dt>Author: </dt>
                            <dd>{this.props.selectedNewsletter.author}</dd>
                            <dt>Intro:</dt>
                            <dd>{this.props.selectedNewsletter.intro}</dd>
                            {editNewsletterButton}
                            {deleteNewsletterButton}
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

export default connect(mapStateToProps)(infoPage);