import { Stack, Box, Spacer, Button } from "@chakra-ui/react"
import { useWizard } from "react-use-wizard"
import { useGithubRepoQuery } from "../hooks/useGithubReposQuery"
import type { StepProps } from "../interfaces/step-props"

export const RepositoryStep = ({ onStepNext, config }: StepProps) => {
  const { previousStep, nextStep } = useWizard()
  const { data, isLoading } = useGithubRepoQuery(config.token)

  return (
    <>
      <Stack>
        <Box>{JSON.stringify(data)}</Box>
        <Stack direction="row">
          <Button variant="ghost" onClick={() => previousStep()}>
            Back
          </Button>
          <Spacer />
          <Button
            colorScheme="blue"
            onClick={() => {
              onStepNext({ repositories: data && data[0] })
              nextStep()
            }}
            isLoading={isLoading}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
