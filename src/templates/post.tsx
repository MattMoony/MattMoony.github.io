import React from 'react';
import { graphql } from 'gatsby';
import style from './post.module.scss';
import { Helmet } from 'react-helmet';
import MainHeader from '../components/MainHeader';
import Footer from '../components/Footer';
import BreadCrumbs from '../components/BreadCrumbs';

const Post = ({ data, location, }) => {
    const post = data.markdownRemark;

    const links: { [url: string]: string } = {
        '/': 'Home',
        '/blog': 'Blog',
    };
    links[location.pathname] = post.frontmatter.title;

    return (
        <>
            <Helmet>
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@MattMoony" />
                <meta name="twitter:title" content={post.frontmatter.title} />
                <meta name="twitter:description" content={post.frontmatter.desc} />
                {
                    post.frontmatter.coverImage
                    ? <meta name="twitter:image" content={post.frontmatter.coverImage.childImageSharp.fluid.src} />
                    : <></>
                }
            </Helmet>
            <MainHeader hideHeader>
                <BreadCrumbs links={links} />
                <div className={style.heading}>
                    <div>
                        <h1>{post.frontmatter.title}</h1>
                        <h6>{post.frontmatter.desc}</h6>
                        <p>{post.frontmatter.date} | ca. {post.timeToRead}min to read</p>
                    </div>
                    {
                        post.frontmatter.coverImage
                        ? <img src={post.frontmatter.coverImage.childImageSharp.fluid.src} />
                        : <></>
                    }
                </div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: post.html, }}></div>
            </MainHeader>
            <Footer />
        </>
    );
};

export default Post;

export const query = graphql`
    query BlogQuery($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            timeToRead
            frontmatter {
                title
                date(fromNow: true)
                ref
                desc
                coverImage {
                    childImageSharp {
                        fluid {
                            src
                        }
                    }
                }
            }
        }
    }
`;