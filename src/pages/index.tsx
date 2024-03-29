import React from 'react';
import MainHeader from '../components/MainHeader';
import Footer from '../components/Footer';

import style from './index.module.scss';
import { graphql, Link, StaticQuery } from 'gatsby';

export default class Index extends React.Component {
  public render (): React.ReactElement {
    return (
      <>
        <MainHeader>
          <h1>About</h1>
          <h6>Where have I landed here?</h6>
          <p>
            Welcome, Willkommen, Bienvenidos! You have reached my (<a href="https://github.com/MattMoony">@MattMoony</a>) official website - I hope you
            have enjoyed your visit so far :P. <br /><br />
            Just like every other personal blog / personal webpage / portfolio this website will, at some point, contain a lot of information about who I
            am, what I do, what I want to do, etc. However, depending on when you view this, that moment might still be quite far away, since I only started
            working on this new project of mine on the <u>17<sup>th</sup> July 2020</u>. <br /><br />
            Now, without further ado, I will let you to it! I sincerely wish you a pleasant stay on my newly created website! If you want to know
            more about me still, go checkout the <Link to="/about">about</Link> page.
          </p>
          <h1>Projects</h1>
          <h6>What have you done?</h6>
          <p>
            Well, to answer that question, I'd suggest you go over to the <Link to={`/blog`}>blog</Link> part of this website
            right now. I hope you will manage to find <i>something</i> of interest over there!
          </p>
          {/* <div className={style.projectWrapper}>
            <StaticQuery
              query={graphql`
              {
                allMarkdownRemark {
                  nodes {
                    frontmatter {
                      title
                      desc
                    }
                    fields {
                      slug
                    }
                  }
                }
              }
              `}
              render={data => data.allMarkdownRemark.nodes.map(f => (
                <div className={style.project} key={f.fields.slug}>
                  <h2>{f.frontmatter.title}</h2>
                  <p>{f.frontmatter.desc}</p>
                </div>
              ))}
            />
          </div> */}
          <h1>References</h1>
          <h6>Anything else?</h6>
          <ul>
            <li><a href="https://github.com/MattMoony/MattMoony.github.io">Official Repository</a> - Here you can find the source code of what you're currently viewing.</li>
            <li><a href="https://www.piskelapp.com/">Piskel</a> - If you want to create lovely pixel art like what you're seeing above.</li>
          </ul>
        </MainHeader>
        <Footer />
      </>
    );
  }
}
