import { FormControl, Input as InputNB, IInputProps } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string
}

export const Input = ({ errorMessage, isInvalid, ...rest }: Props) => {
  const invalid = !!errorMessage || isInvalid
  
  return (
    <FormControl isInvalid={invalid}>
      <InputNB
        variant="underlined"
        isInvalid={invalid}
        size="2xl"
        _focus={{
          borderColor: '#7A08FA'
        }}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
          borderRadius: 4
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
} 