import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface IButtonProps {
  enabled?: boolean;
}

export const Container = styled(RectButton)<IButtonProps>`
  height: 50px;

  background: #ff9000;
  border-radius: 10px;

  justify-content: center;
  align-items: center;

  margin-top: 8px;

  ${props =>
    props.enabled === false &&
    css`
      opacity: 0.4;
    `}
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;
