import React, { useRef, useEffect } from 'react';
import styles from './Page.module.scss';
import { css } from '@emotion/core';

const pageStyle = css`
  margin-bottom: 52px;

  @media screen and (min-width: 685px) {
    & {
      width: calc(99.9% * 7/12 - (30px - 30px * 7/12));
    }
    &:nth-child(1n) {
      float: left;
      margin-right: 30px;
      clear: none;
    }
    &:last-child {
      margin-right: 0;
    }
    &:nth-child(12n) {
      margin-right: 0;
      float: right;
    }
    &:nth-child(12n + 1) {
      clear: both;
    }
  }

  @media screen and (min-width: 960px) {
  }
`;

const innerStyle = css`
  padding: 25px 20px;

  @media screen and (min-width: 685px) {
    padding: 30px 20px;
  }
`;

const titleStyle = css`
  font-size: 40px;
  font-weight: 600;
  line-height: 52px;
  margin-top: 0px;
  margin-bottom: 37.7px;
`;

const bodyStyle = css`
  font-size: 16px;
  line-height: 26px;
  margin: 0px 0px 26px;
`;

const Page = ({ title, children }) => {
  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });

  return (
    <div ref={pageRef} css={pageStyle}>
      <div css={innerStyle}>
        { title && <h1 css={titleStyle}>{title}</h1>}
        <div css={bodyStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;