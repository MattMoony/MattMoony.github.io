import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Footer from '../components/Footer';
import MainHeader from '../components/MainHeader';
import { graphql, Link } from 'gatsby';
import style from './blog.module.scss';

const Blog = ({ data, }) => {
    const posts = data.allMarkdownRemark.nodes;

    return (
        <>
            <MainHeader hideHeader>
                <BreadCrumbs links={{
                    '/': 'Home',
                    '/blog': 'Blog',
                }} />
                <h1>Blog</h1>
                <h3>Projects, &#x1f4a9;posts, ...</h3>
                <div>
                    {posts.map(p => 
                        <Link to={p.fields.slug} className={style.post}>
                            <h4>{p.frontmatter.title}</h4>
                            <p>{p.frontmatter.desc}</p>
                        </Link>)}
                </div>
            </MainHeader>
            <Footer />
        </>
    );
}

export default Blog;

export const query = graphql`
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
`;