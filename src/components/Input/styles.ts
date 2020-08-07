import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;

  background: #232129;
  border: 2px solid #232129;

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #ff9000;
    `}

  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;

  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #f4ede8;
  font-size: 16px;

  margin: 0px 5px;

  font-family: 'RobotoSlab-Medium';
`;
