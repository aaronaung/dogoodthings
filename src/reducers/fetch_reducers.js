import { actionTypes } from "../actions/fetch_actions"

export const fetchCategories = (state = [], action)=>{
    switch(action.type){
        case actionTypes.FETCH_CATE_SUCCESS:
            return action.payload;
        //object assign merge all objects to the target [0] and return new
        default:
            return state;
    }
}

export const fetchFacts = (state = [], action) =>{
    switch(action.type){
        case actionTypes.FETCH_FACTS_SUCCESS:
            return action.payload.data;
        //object assign merge all objects to the target [0] and return new
        default:
            return state;
    }
}

export const fetchCharityCategories = (state = [], action) => {
    switch(action.type){
        case actionTypes.FETCH_CHARITY_CATE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export const fetchCharities = (state = [] , action) => {
    switch(action.type){
        case actionTypes.FETCH_CHARITIES_SUCCESS:
            return action.payload;
        case actionTypes.FETCH_CHARITIES_ERROR:
            return [];
        default:
            return state;
    }
}

export const getFetchStatus = (state = {}, action) => {
    switch(action.type){
        case actionTypes.FETCHING_CHARITIES:
            return Object.assign( {} , state, action.payload);
        case actionTypes.FETCH_CHARITIES_ERROR:
            return Object.assign( {} , state, action.payload);
        default:
            return state;
    }
}

export const emptyCharitySearch = (state = false, action) =>{
    switch(action.type){
        case actionTypes.FETCH_CHARITIES_ERROR:
            return action.payload;
        case actionTypes.EMPTY_CHARITIES:
            return action.payload; 
        default:
            return false;
    }
}

export const fetchFeatured = (state = [], action) => {
    switch(action.type){
        case actionTypes.FETCH_FEATURED_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}