import { useRef, useEffect, useState, useContext, ContextType } from 'react';
import {
  Player,
  loaded,
  start,
  FFT,
  FFTOptions,
  InputNode,
  Destination,
  Draw,
  Transport,
} from 'tone';
import React from 'react';
import { ActionType, ArtMusicEngineContext, InitialState } from '../store';
import { MeterBase } from 'tone/build/esm/component/analysis/MeterBase';
import { Stage } from '@inlet/react-pixi';
import { Artwork } from './Artwork';

interface AudioEngineProps {}

export const AudioEngine: React.FC<AudioEngineProps> = ({}) => {
  const { store, dispatch } = useContext(ArtMusicEngineContext);

  const gweiSong =
    'https://res.cloudinary.com/dvwvkt7iq/video/upload/v1646968232/natekodi_gwei_q52txi.mp3';

  let timer: number;
  const player = useRef<Player | null>(null);
  const fft = useRef(new FFT(32));
  const animationRef = useRef<number>(0);
  // const time = useRef<number>(0);

  const [fftData, setFftData] = useState<any>(fft.current);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [time, setTime] = useState(0);
  const [artFft, setArtFft] = useState<Float32Array>(new Float32Array(32));

  useEffect(() => {
    player.current = new Player(gweiSong).chain(fft.current, Destination);
  }, [player.current?.state]);

  useEffect(() => {
    if (artFft) {
      dispatch({ type: 'UpdateFftData', payload: { fftData: artFft } });
    }
  }, [artFft]);

  useEffect(() => {
    // if (fft.current.getValue()[0]) setFftData(fft.current.getValue());
    console.log('fft value -->', fft.current.getValue());
  }, [time]);

  function loop() {
    if (animationRef.current) {
      setTime(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(loop);
    // console.log('looop');
  }

  const handleClick = () => {
    if (player.current) {
      if (!isButtonPressed) {
        loaded().then(() => {
          setIsButtonPressed(true);
          loop();
          player.current?.start();
          // }
        });
      } else {
        setIsButtonPressed(false);
        cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
        player.current.stop();
      }
    }
  };

  return (
    <>
      <Stage height={540} width={540}>
        <Artwork artFFT={fft.current.getValue()} />
      </Stage>
      <button onClick={() => handleClick()}>Play</button>
    </>
  );
};
