import React from 'react';
import { graphql } from 'gatsby';

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
            <MainHeader hideHeader>
                <BreadCrumbs links={links} />
                <h1>{post.frontmatter.title}</h1>
                <h3>{post.frontmatter.desc}</h3>
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
            frontmatter {
                title
                date
                ref
                desc
            }
        }
    }
`;