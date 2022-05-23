import React, { Dispatch } from 'react';

export type  InitialState = {
    fftData: Float32Array;
}


export enum ActionType {
    UpdateFftData = 'UpdateFftData'
}

type Action = {type: "UpdateFftData"; payload: InitialState}

export const initialArtMusicEngineStore: InitialState = {
  fftData: new Float32Array(32),
};

export type GlobalContext = {
  store: InitialState,
  dispatch: Dispatch<Action>
}

export const ArtMusicEngineContext = React.createContext<GlobalContext>({store: initialArtMusicEngineStore, dispatch: () => null});

export const artMusicEngineReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "UpdateFftData": 
      return {
        ...state,
        ...action.payload
      }
    break
    default:
      return state;
  }
};