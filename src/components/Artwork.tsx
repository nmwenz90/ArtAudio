import React, { useContext, useEffect, useState } from 'react';
import { AdjustmentFilter } from '@pixi/filter-adjustment';
import { ConvolutionFilter } from '@pixi/filter-convolution';
import { ColorOverlayFilter } from '@pixi/filter-color-overlay';
import { ColorReplaceFilter } from '@pixi/filter-color-replace';
import { GlitchFilter } from '@pixi/filter-glitch';
import { BevelFilter } from '@pixi/filter-bevel';
import {
  Stage,
  Sprite,
  Container,
  useTick,
  AppProvider,
  withFilters,
} from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

import palm from '../images/palm.png';
import gweiBackground from '../images/gwei background.png';
import crystal from '../images/gwei back texture.png';
import gradient from '../images/gradient.png';
import diagonalTexture from '../images/diagonal texture.png';
import island1 from '../images/island 1.png';
import island2 from '../images/island 2.png';
import island3 from '../images/island 3.png';
import island4 from '../images/island 4.png';
import island5 from '../images/island 5.png';
import eth1 from '../images/eth1.png';
import eth2 from '../images/eth2.png';
import eth3 from '../images/eth3.png';
import eth4 from '../images/eth4.png';
import eth5 from '../images/eth5.png';

import { ArtMusicEngineContext } from '../store';
import { mapRange } from '../utils/utils';

interface ArtworkProps {
  artFFT: Float32Array;
}

interface SpriteInterface {
  image: string;
}

export const Artwork: React.FC<ArtworkProps> = ({ artFFT }) => {
  // const { store, dispatch } = useContext(ArtMusicEngineContext);

  // states
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);
  // const [i, setI] = useState(0);
  // const [rotation, setRotation] = useState(0);

  // useEffect(() => {
  //   console.log('current fft -->', store.fftData);
  // }, [store]);

  // custom ticker
  // useTick((delta) => {
  //   setI(i + 0.05 * delta);
  //   setX(Math.sin(i) * 100);
  //   setY(Math.sin(i / 1.5) * 100);
  //   setRotation(-10 + Math.sin(i / 10 + Math.PI * 2) * 10);
  // });
  const BackgroundFilter = withFilters(Container, {
    convolution: ConvolutionFilter,
    adjust: AdjustmentFilter,
    // colorReplace: ColorReplaceFilter,
    // overlay: ColorOverlayFilter,
  });

  const EthLogoFilter = withFilters(Container, {
    overlay: ColorOverlayFilter,
    colorReplace: ColorReplaceFilter,
  });

  const GradientFilter = withFilters(Container, {
    glitch: GlitchFilter,
  });
  const DiagonalTextureFilter = withFilters(Container, {
    bevel: BevelFilter,
  });

  // useEffect(() => {
  //   if (artFFT[2]) console.log('currentFFT --> ', artFFT);
  // }, [artFFT[2]]);

  const images: SpriteInterface[] = [
    { image: island1 },
    { image: island2 },
    { image: island3 },
    { image: island4 },
    { image: island5 },
    { image: eth1 },
    { image: eth2 },
    { image: eth3 },
    { image: eth4 },
    { image: eth5 },
  ];

  const sprites: JSX.Element[] = images.map((img, index) => {
    if (index >= 5) {
      return (
        <EthLogoFilter
          key={index + 'ethlogo'}
          overlay={{
            color: 0x9faef2,
            alpha: 0.6,
          }}
          colorReplace={{
            originalColor: 0x090909,
            newColor: 0x2550e8,
            epsilon: 0.6,
          }}
        >
          <Sprite image={img.image} key={index} />
        </EthLogoFilter>
      );
    } else return <Sprite image={img.image} key={index} />;
  });

  const mapRangeFft = (
    value: number,
    targetMin: number,
    targetMax: number
  ): number => {
    return mapRange(value, -100, 90, targetMin, targetMax);
  };

  return (
    <Container scale={0.5}>
      <Sprite image={gweiBackground} />
      <BackgroundFilter
        adjust={{ gamma: 3, brightness: 1 }}
        convolution={{
          matrix: [0.1, 0.2, 0, 0, 0.1, 0.1, 0, 0, 0],
          height: mapRangeFft(artFFT[6], 0, 1),
          width: mapRangeFft(artFFT[12], 0, 1),
        }}
      >
        <Sprite image={crystal} />
      </BackgroundFilter>
      <GradientFilter
        glitch={{
          slices: 15,
          direction: 130,
          // offset: artFFT[4],
          offset: 84,
          fillMode: 2,
          // red: [-20, 2],
          // blue: [10, 4],
          // green: [-10, 4],
        }}
      >
        <Sprite image={gradient} />
      </GradientFilter>
      <DiagonalTextureFilter
        bevel={{
          rotation: mapRangeFft(artFFT[29], 0, 360),
          thickness: 4,
          lightColor: 0xefecec,
          lightAlpha: mapRangeFft(artFFT[28], 0, 1),
          shadowColor: 0x231f1f,
          shadowAlpha: mapRangeFft(artFFT[20], 0, 1),
        }}
      >
        <Sprite image={diagonalTexture} />
      </DiagonalTextureFilter>
      {sprites}
    </Container>
  );
};
