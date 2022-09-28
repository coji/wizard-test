import type { InputProps } from "@chakra-ui/react"
import {
  FormControl,
  FormErrorMessage,
  Input,
  FormLabel,
} from "@chakra-ui/react"
import { useField } from "remix-validated-form"

interface AppFormInputProps extends InputProps {
  name: string
  label: string
}
export const AppFormInput = ({ name, label, ...rest }: AppFormInputProps) => {
  const { getInputProps, error } = useField(name)
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} {...getInputProps()} {...rest}></Input>
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
