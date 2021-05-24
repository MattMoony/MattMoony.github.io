import React from 'react';
import style from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faInstagram, faStackOverflow } from '@fortawesome/free-brands-svg-icons';

import seabed from '../images/seabed.gif';

export default class Footer extends React.Component {
  public render (): React.ReactElement {
    return (
      <footer className={style.footer}>
        <img src={seabed} />
        <div>
          <div>
            &copy; 2021 Matthias Monschein
          </div>
          <div>
            <a href="https://github.com/MattMoony/"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="https://twitter.com/MattMoony/"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://instagram.com/matt_moony"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://stackoverflow.com/users/9143069/matthias-m"><FontAwesomeIcon icon={faStackOverflow} /></a>
          </div>
        </div>
      </footer>
    );
  }
};