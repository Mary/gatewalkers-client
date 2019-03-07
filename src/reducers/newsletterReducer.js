const initialState = {
    newsletters: [],
    error: null
    }

    
    const newsletter = (state = initialState, action) => {
        switch (action.type) {
            case 'CREATE_NEWSLETTER_SUCCESS':
                return {
                    ...state,
                    data: action.newsletter
                }
                case 'FETCH_NEWSLETTERS_SUCCESS':
                return {
                    ...state,
                    newsletters: action.newsletters
                }
                case 'DELETE_NEWSLETTER_SUCCESS':
                return {
                    ...state,
                    newsletters: state.newsletters.filter(newsletter=>{
                        return newsletter.id !== action.id
                    })
                }
                case 'UPDATE_NEWSLETTER_SUCCESS':
                return {
                    ...state,
                    newsletters: state.newsletters.map(newsletter=>{
                        if(newsletter.id === action.newsletter.id){
                            return action.newsletter;
                        }
                        return newsletter;
                    })
                }

            default:
                return state
        }
    }
    
    
    
    
    
    export default newsletter