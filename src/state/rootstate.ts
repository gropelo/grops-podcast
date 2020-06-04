import React from 'react'
import { IAction } from '../types/app.types';

export const initialState = {
  url: '',
  searchQuery: ''
}

export function rootReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'PLAY':
      return {
        ...state,
        url: action.payload
      }
    case 'SEARCH':
      return {
        ...state,
        searchQuery: action.payload
      }
    default:
      return state;
  }
}

export const rootContext = React.createContext({ state: initialState, dispatch: (value: IAction) => { } });