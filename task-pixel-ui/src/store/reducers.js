import {DATA_LOADED, MODAL_UPDATE, PAGINATION} from './action_types.js';
import initialState from './initialState.js';

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADED:
      let obj = Object.assign({},state,{
        remoteArticles : state.remoteArticles.concat(action.loaded)
      });
      return obj;
    case PAGINATION:
      let obj_page = Object.assign({},state,{
          pagination : action.loaded.articles
      });
      return obj_page;
    case MODAL_UPDATE:
      let obj_modal_update = Object.assign({}, state,{
        modal:{
          modalBody: action.loaded.body,
          modalTitle: action.loaded.title,
          modalCreateDate: action.loaded.created_at,
          modalUpdateDate: action.loaded.updated_at
        }
      });
      return obj_modal_update;
    default:
      return state;
  }
}
