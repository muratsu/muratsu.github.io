import React from 'react';
import { css } from '@emotion/core';

const style = css`
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  font-style: normal;
  font-weight: normal;
  speak: none;
  margin-right: .2em;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1em;
  margin-left: .2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Icon = ({ icon }) => (
  <svg css={style} viewBox={icon.viewBox}>
    <path d={icon.path} />
  </svg>
);

export default Icon;
