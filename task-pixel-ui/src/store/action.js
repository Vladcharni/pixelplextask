import {DATA_LOADED, MODAL_UPDATE,PAGINATION} from './action_types.js';
const api = 'http://localhost:8080/articles?secretget=getall';

export function getDate(){
  return function(dispatch){
    return fetch(api)
    .then(response => response.json())
    .then(json => {
      dispatch({type: DATA_LOADED, loaded: json});
    })
  }
}

export function pagination(page, limit){
  return function(dispatch){
    let api = "http://localhost:8080/articles/?page=" + page + "&limit=" + limit;
    return fetch(api)
    .then(response => response.json())
    .then(json => {
      dispatch({type: PAGINATION, loaded: json});
    }).catch(error => console.log(error))
  }
}

export function modalUpdate(id){
  return function(dispatch){
    let api = "http://localhost:8080/articles/" + id;
    return fetch(api)
    .then(response => response.json())
    .then(json => {
      dispatch({type: MODAL_UPDATE, loaded: json});
    })
  }
}
