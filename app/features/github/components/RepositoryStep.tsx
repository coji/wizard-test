import { useState, useEffect } from "react"
import { Stack, Box, Spacer, Button } from "@chakra-ui/react"
import { useWizard } from "react-use-wizard"
import { listGithubRepos } from "../services/listGithubRepos"
import type { StepProps } from "../interfaces/step-props"

export const RepositoryStep = ({ onStepNext }: StepProps) => {
  const { previousStep, nextStep } = useWizard()
  const [data, setData] = useState<Awaited<ReturnType<typeof listGithubRepos>>>(
    []
  )

  useEffect(() => {
    const fetchRepos = async () => {
      const list = await listGithubRepos(window.env.GITHUB_AUTH_TOKEN)
      setData(list)
    }
    fetchRepos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              onStepNext({ repositories: data[0] })
              nextStep()
            }}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
