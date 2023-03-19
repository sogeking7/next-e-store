import React from 'react';
import {Box, Container, Loader} from '@mantine/core'

function LoaderComponent(props) {
  return (
    <Container size="lg" className="flex justify-center p-16">
      <Loader size="lg" color="blue" variant="oval"/>
    </Container>
  );
}

export default LoaderComponent;