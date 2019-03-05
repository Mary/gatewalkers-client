import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';


///////////Fetch All Newsletters (End User & Admin )
export const FETCH_NEWSLETTERS_SUCCESS = 'FETCH_NEWSLETTERS_SUCCESS';
export const fetchNewslettersSuccess = newsletters => ({
    type: FETCH_NEWSLETTERS_SUCCESS,
    newsletters
});

export const FETCH_NEWSLETTERS_ERROR = 'FETCH_NEWSLETTERS_ERROR';
export const fetchNewslettersError = error => ({
    type: FETCH_NEWSLETTERS_ERROR,
    error
});

export const fetchAllNewsletters = () => (dispatch) => {
    // const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/news`, {
        method: 'GET',
        // headers: {
        //     Authorization: `Bearer ${authToken}`
        // }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((newsletters) => {

            dispatch(fetchNewslettersSuccess(newsletters))
        })
        .catch(err => {
            dispatch(fetchNewslettersError(err));
        });
};


/////////Add Newsletter Post
const createNewsletterSuccess = (newsletter) => ({
    type: 'CREATE_NEWSLETTER_SUCCESS',
    newsletter
})

export const createNewsletter = (author, title, date, intro, underwraps, qaTitle, qaContent, communitySpotlightFeature, communitySpotlightContent, fieldTitle, fieldContent) => {
    return (dispatch, getState) => {
        const authToken = getState().authReducer.authToken;
        return fetch(`${API_BASE_URL}/newsletters`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author, 
                title, 
                date, 
                intro, 
                underwraps, 
                qaTitle, 
                qaContent, 
                communitySpotlightFeature, 
                communitySpotlightContent, 
                fieldTitle, 
                fieldContent
            })
        })
            .then(res => res.json())
            .then(json => dispatch(createNewsletterSuccess(json)))
            .catch(error => console.log(error))
    }
}

///////////Delete Newsletter 
export const DELETE_NEWSLETTER_SUCCESS = 'DELETE_NEWSLETTER_SUCCESS';
export const deleteNewsletterSuccess = id => ({
    type: DELETE_NEWSLETTER_SUCCESS,
    id
});

export const DELETE_NEWSLETTER_ERROR = 'DELETE_NEWSLETTER_ERROR';
export const deleteNewsletterError = error => ({
    type: DELETE_NEWSLETTER_ERROR,
    error
});

export const deleteNewsletter = (id) => (dispatch, getState) => {

    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(() => dispatch(deleteNewsletterSuccess(id)))
        .catch(err => {
            dispatch(fetchNewslettersError(err));
        });
};

