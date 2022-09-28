import { Box, Heading, Stack } from "@chakra-ui/react"
import { Wizard } from "react-use-wizard"
import { useState } from "react"
import {
  ProviderStep,
  RepositoryStep,
  ConfirmStep,
} from "~/features/github/components"

export const SetupWizard = () => {
  const [result, setResult] = useState({})

  const handleStepNext = (params: object) => {
    setResult((val) => ({ ...val, ...params }))
  }

  return (
    <Stack>
      <Heading>Wizard Test</Heading>

      <Wizard startIndex={0}>
        <ProviderStep onStepNext={handleStepNext} />
        <RepositoryStep onStepNext={handleStepNext} />
        <ConfirmStep onStepNext={handleStepNext} />
      </Wizard>

      <Box>{JSON.stringify(result)}</Box>
    </Stack>
  )
}
