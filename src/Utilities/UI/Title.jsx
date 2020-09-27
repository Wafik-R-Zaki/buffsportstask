import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
  const { children } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography component="h2" variant="h6" color="primary" {...props}>
      {children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};