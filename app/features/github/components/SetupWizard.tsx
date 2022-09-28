import { Box, Heading, Stack } from "@chakra-ui/react"
import { Wizard } from "react-use-wizard"
import { useState } from "react"
import {
  ProviderStep,
  RepositoryStep,
  ConfirmStep,
} from "~/features/github/components"

export const SetupWizard = () => {
  const [config, setConfig] = useState({})

  const handleStepNext = (params: object) => {
    setConfig((val) => ({ ...val, ...params }))
  }

  return (
    <Stack>
      <Heading>Wizard Test</Heading>

      <Wizard startIndex={0}>
        <ProviderStep config={config} onStepNext={handleStepNext} />
        <RepositoryStep config={config} onStepNext={handleStepNext} />
        <ConfirmStep config={config} onStepNext={handleStepNext} />
      </Wizard>

      <Box>{JSON.stringify(config)}</Box>
    </Stack>
  )
}
