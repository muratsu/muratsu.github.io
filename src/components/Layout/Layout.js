import React from 'react';
import Helmet from 'react-helmet';
// import styles from './Layout.module.scss';
import { css, Global } from '@emotion/core';
import normalize from 'normalize.css';

const style = css`
  lost-center: 1070px;
`;

const Layout = ({ children, title, description }) => (
  <div css={style}>
    <Global
      styles={css`
        ${normalize}
      `}
    />
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

export default Layout;
