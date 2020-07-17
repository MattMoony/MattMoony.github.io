import React from 'react';
import style from './MainHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import gooseGIF from '../images/goose.gif';
import wavesGIF from '../images/waves.gif';
import seaGIF from '../images/sea.gif';

export default class MainHeader extends React.Component {
  private article: HTMLElement;
  private scroll: HTMLButtonElement;

  private onScroll (): void {
    this.article.scrollIntoView({
      behavior: 'smooth',
    });
    this.scroll.blur(); 
  }

  public render (): React.ReactElement {
    return (
      <>
        <header className={style.header}>
          <h1>Matt</h1>
          <img className={style.goose} src={gooseGIF} alt="Swimming Goose - *honk*" />
          <img className={style.waves} src={wavesGIF} alt="Waves - *sploosh*" />
          <button onClick={this.onScroll.bind(this)} ref={e => this.scroll = e} className={style.down}><FontAwesomeIcon icon={faChevronDown} /></button>
        </header>
        <article ref={e => this.article = e} className={style.article}>
          <img className={style.sea} src={seaGIF} alt="Underwater - *Under the seaaaa*" />
          <div className={style.content}>
            <div>
              {this.props.children}
            </div>
          </div>
        </article>
      </>
    );
  }
}