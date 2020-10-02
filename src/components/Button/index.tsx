import React from 'react';

import { RectButtonProperties } from 'react-native-gesture-handler';
import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string | React.ReactElement;
}

const Button: React.FC<ButtonProps> = ({ children, enabled, ...rest }) => {
  return (
    <Container {...rest} enabled={enabled}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export { Button };
