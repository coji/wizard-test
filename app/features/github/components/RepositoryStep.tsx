import { Stack, Box, Spacer, Button } from "@chakra-ui/react"
import { useState, useCallback } from "react"
import { useWizard } from "react-use-wizard"
import { useGithubRepoQuery } from "../hooks/useGithubReposQuery"
import type { StepProps } from "../interfaces/step-props"
import { RepositoryList } from "./RepositoryList"
import type { GitRepo } from "../interfaces/model"

export const RepositoryStep = ({ onStepNext, config }: StepProps) => {
  const { previousStep, nextStep } = useWizard()
  const { data, isLoading } = useGithubRepoQuery(config.token)
  const [checkedRepos, setCheckedRepos] = useState<GitRepo[]>([])

  const handleChangeCheckedRepos = useCallback((checkedRepos: GitRepo[]) => {
    setCheckedRepos(checkedRepos)
  }, [])

  return (
    <>
      <Stack>
        <RepositoryList
          allRepos={data ?? []}
          onChange={handleChangeCheckedRepos}
        />

        <Stack direction="row">
          <Button variant="ghost" onClick={() => previousStep()}>
            Back
          </Button>

          <Spacer />

          <Stack direction="row" align="center">
            {checkedRepos.length > 0 && (
              <Box fontSize="sm" color="gray.500">
                {checkedRepos.length} repos selected
              </Box>
            )}

            <Button
              colorScheme="blue"
              onClick={() => {
                onStepNext({ repositories: checkedRepos })
                nextStep()
              }}
              isDisabled={Object.keys(checkedRepos).length === 0}
              isLoading={isLoading}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
