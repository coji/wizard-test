import {
  Box,
  Stack,
  Spacer,
  Heading,
  Container,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  FormLabel,
} from "@chakra-ui/react"
import { Wizard, useWizard } from "react-use-wizard"
import { useState, useEffect } from "react"
import { useFetcher } from "@remix-run/react"
import { ValidatedForm, useField } from "remix-validated-form"
import { withZod } from "@remix-validated-form/with-zod"
import type { z } from "zod"
import { firstStepSchema } from "./api/first"

//https://codesandbox.io/s/jmxpke?file=/app/routes/index.tsx
const FormInput = ({ name }: { name: string }) => {
  const { getInputProps, error } = useField(name)
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>Name</FormLabel>
      <Input id={name} {...getInputProps()}></Input>
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

interface StepProps {
  onStepNext: (params: object) => void
}
const FirstStep = ({ onStepNext }: StepProps) => {
  const { handleStep, nextStep } = useWizard()
  const [data, setData] = useState({})

  return (
    <>
      <ValidatedForm
        validator={withZod(firstStepSchema)}
        onSubmit={(formData, e) => {
          fetch("/api/first", {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((e) => {
              console.log(e)
              setData(e)
            })
            .catch((e) => console.log("error: ", e))

          e.preventDefault()
        }}
      >
        <Stack>
          <FormInput name="name" />
          <Box>{JSON.stringify(data)}</Box>

          <Stack direction={{ base: "column", md: "row" }}>
            <Button variant="ghost">Cancel</Button>
            <Spacer />
            <Button type="submit" colorScheme="blue">
              Next
            </Button>
          </Stack>
        </Stack>
      </ValidatedForm>
    </>
  )
}

const SecondStep = ({ onStepNext }: StepProps) => {
  const { nextStep } = useWizard()
  const fetcher = useFetcher()

  useEffect(() => {
    const ret = fetcher.load("/api/first")
    console.log(ret)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box>2nd</Box>
      <Button onClick={() => nextStep()}>Next</Button>
    </>
  )
}

const ThirdStep = ({ onStepNext }: StepProps) => {
  const { nextStep } = useWizard()
  return (
    <>
      <Box>3nd</Box>
      <Button onClick={() => nextStep()}>Next</Button>
    </>
  )
}

export default function Index() {
  const [result, setResult] = useState({})

  const handleStepNext = (params: object) => {
    setResult((val) => ({ ...val, ...params }))
  }

  return (
    <Container maxWidth="container.xl">
      <Heading>Wizard Test</Heading>
      <Wizard startIndex={0}>
        <FirstStep onStepNext={handleStepNext} />
        <SecondStep onStepNext={handleStepNext} />
        <ThirdStep onStepNext={handleStepNext} />
      </Wizard>

      <Box>{JSON.stringify(result)}</Box>
    </Container>
  )
}
