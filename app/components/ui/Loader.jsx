import React from 'react';
import {Box, Container, Loader} from '@mantine/core'

function LoaderComponent(props) {
  return (
    <Container className="">
      <Box className="pt-24">
        <Loader size="lg" color="indigo"/>
      </Box>
    </Container>
  );
}

export default LoaderComponent;