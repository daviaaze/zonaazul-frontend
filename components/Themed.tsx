import React, { useEffect, useRef, useCallback } from 'react'
import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput, TextInputProps, StyleSheet } from 'react-native'

import { MaterialIcons as DefaultIcon } from '@expo/vector-icons'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { useField } from '@unform/core'

export function useThemeColor (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme()
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type DefaultIconProps = {
  name: string;
  style?: object;
  size: number;
}

type DefaultInputProps = {
  name: string;
  rawValue?: string;
}

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type IconProps = ThemeProps & DefaultIconProps
export type InputProps = ThemeProps & TextInputProps & DefaultInputProps

export function Text (props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function TextInput (props: InputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <DefaultTextInput style={[{ color }, style]} {...otherProps} />
}

export function Input (props: InputProps) {
  const { name, onChangeText, rawValue, ...rest } = props
  const { style, lightColor, darkColor, ...otherProps } = rest
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const inputRef = useRef<TextInputRef>(null)
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name)

  const handleOnChange = useCallback(
    text => {
      if (inputRef.current) inputRef.current.value = text
      if (onChangeText) onChangeText(text)
    },
    [onChangeText]
  )

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
      clearValue (ref) {
        ref.value = ''
        ref.clear()
      },
      setValue (ref, value) {
        ref.setNativeProps({ text: value })
        if (inputRef.current) inputRef.current.value = value
      },
      getValue (ref: { value: any }) {
        return rawValue || ref.value
      }
    })
  }, [fieldName, rawValue, registerField])

  return (
    <>
      <DefaultTextInput ref={inputRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onFocus={clearError}
        placeholderTextColor="#666360"
        onChangeText={handleOnChange}
        style={[{ color }, style]}
        {...otherProps} />
      {error && <Text style={styles.error}>{error}</Text>}
    </>)
}

export function Icon (props: IconProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <DefaultIcon style={[{ color }, style]} {...otherProps} />
}

export function Box (props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border')

  return <DefaultView style={[{ borderColor }, style]} {...otherProps} />
}

export function View (props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

const styles = StyleSheet.create({
  error: {
    color: 'red'
  }
})
