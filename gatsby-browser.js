const React = require('react');
const Meta = require('./src/components/Meta').default;

exports.wrapPageElement = ({ element, props }) => {
  return <Meta {...props}>{element}</Meta>;
};