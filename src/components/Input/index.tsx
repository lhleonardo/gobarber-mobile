import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';

import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useField } from '@unform/core';
import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRefProps {
  focus(): void;
}

const MyInput: React.ForwardRefRenderFunction<InputRefProps, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const [filled, setIsFilled] = useState(false);
  const [focus, setFocused] = useState(false);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef<InputValueReference>({
    value: defaultValue,
  });

  const inputElementRef = useRef<any>(null);

  const handleInputFocus = useCallback(() => setFocused(true), []);

  const handleInputBlur = useCallback(() => {
    setFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  // passar funcionalidade de um componente interno para componente pai
  // Quando alguém chamar o componente e usar uma referência,
  // tal como  <MyInput ref={inputRef}>, inputRef terá o método focus()
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    inputValueRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(elementRef: unknown, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },

      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });

    setIsFilled(!!inputValueRef.current.value);
  }, [fieldName, registerField]);
  return (
    <Container isFocused={focus} hasErrors={!!error}>
      <Icon
        name={icon}
        size={20}
        color={focus || filled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        placeholderTextColor="#666360"
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

const InputForward = forwardRef(MyInput);

export { InputForward as Input };
