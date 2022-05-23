import './styles.css';
import { AudioEngine } from './components/AudioEngine.tsx';
import { Artwork } from './components/Artwork';
import { Stage } from '@inlet/react-pixi';
import {
  ArtMusicEngineContext,
  initialArtMusicEngineStore,
  artMusicEngineReducer,
} from './store';
import { useReducer } from 'react';

export default function App() {
  const [store, dispatch] = useReducer(
    artMusicEngineReducer,
    initialArtMusicEngineStore
  );
  return (
    <ArtMusicEngineContext.Provider value={{ store, dispatch }}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <AudioEngine />
      </div>
    </ArtMusicEngineContext.Provider>
  );
}
