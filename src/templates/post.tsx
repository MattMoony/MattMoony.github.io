import React from 'react';
import { graphql } from 'gatsby';

const Post = ({ data }) => {
    const post = data.markdownRemark;

    return (
        <>
            <h1>{post.frontmatter.title}</h1>
            <h3>{post.frontmatter.date}</h3>
            <div dangerouslySetInnerHTML={{ __html: post.html, }}></div>
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
            }
        }
    }
`;