import {
  ADD_ITEM,
  GET_ITEMS,
  DELETE_ITEM,
  ITEMS_LOADING
} from '../actions/types';
// import { axios } from '../../constant/helper';
import axios from 'axios';

export const getItems = () => {
  return async dispatch => {
    dispatch(itemsLoading(true));
    try {
      const { data } = await axios.get('/api/items');
      console.log(...data);
      dispatch({
        type: GET_ITEMS,
        payload: data,
      })
      dispatch(itemsLoading(false));
    }
    catch (e) {
      dispatch(itemsLoading(false));
      console.log("error in fetching items ", e)
    }
  }
};

export const deleteItem = id => {
  return async dispatch => {
    dispatch(itemsLoading(true));
    try {
      await axios.delete(`/api/items/${id}`);
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
      dispatch(itemsLoading(false));
    }
    catch (e) {
      dispatch(itemsLoading(false));
      console.log("error in adding item ", e)
    }
  }
};

export const addItem = item => {
  return async dispatch => {
    dispatch(itemsLoading(true));
    try {
      const { data } = await axios.post('/api/items', item);
      dispatch({
        type: ADD_ITEM,
        payload: data,
      })
      dispatch(itemsLoading(false));
    }
    catch (e) {
      dispatch(itemsLoading(false));
      console.log("error in adding item ", e)
    }
  }
};

export const itemsLoading = loading => {
  return {
    type: ITEMS_LOADING,
    payload: loading
  }
};