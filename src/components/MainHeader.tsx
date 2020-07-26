import React from 'react';
import style from './MainHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import gooseGIF from '../images/goose.gif';
import wavesGIF from '../images/waves.gif';
import seaGIF from '../images/sea.gif';
import gooseJPG from '../images/goose.jpg';

interface MainHeaderProps {
  children?: React.ReactElement|React.ReactElement[];
}

interface MainHeaderState {
  banner: boolean;
}

export default class MainHeader extends React.Component<MainHeaderProps, MainHeaderState> {
  private header: HTMLElement;
  private article: HTMLElement;
  private scroll: HTMLButtonElement;

  public constructor (props) {
    super(props);
    this.state = {
      banner: false,
    };
  }

  public componentDidMount(): void {
    window.onscroll = e => {
      if (window.scrollY > window.scrollY + this.scroll.getBoundingClientRect().bottom)
        this.setState({ banner: true, });
      else
        this.setState({ banner: false, });
    };
  }

  private onScroll (): void {
    this.article.scrollIntoView({
      behavior: 'smooth',
    });
    this.scroll.blur(); 
  }

  public render (): React.ReactElement {
    return (
      <>
        <header className={style.banner + " " + (this.state.banner ? style.visible : '')}>
          <div>
            <img src={gooseJPG} alt="Me - *technically not*" />
            <h1>Matt</h1>
          </div>
        </header>
        <div ref={e => this.header = e} className={style.header}>
          <h1>Matt</h1>
          <img className={style.goose} src={gooseGIF} alt="Swimming Goose - *honk*" />
          <img className={style.waves} src={wavesGIF} alt="Waves - *sploosh*" />
          <button onClick={this.onScroll.bind(this)} ref={e => this.scroll = e} className={style.down}><FontAwesomeIcon icon={faChevronDown} /></button>
        </div>
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