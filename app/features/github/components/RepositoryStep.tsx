import {
  Stack,
  Box,
  Spacer,
  Button,
  Accordion,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Badge,
  chakra,
} from "@chakra-ui/react"
import React, { useState, useCallback, useEffect } from "react"
import { useWizard } from "react-use-wizard"
import { useGithubRepoQuery } from "../hooks/useGithubReposQuery"
import type { StepProps } from "../interfaces/step-props"
import { uniq } from "remeda"
import dayjs from "dayjs"

export const RepositoryStep = ({ onStepNext, config }: StepProps) => {
  const { previousStep, nextStep } = useWizard()
  const { data, isLoading } = useGithubRepoQuery(config.token)
  const [checkedRepos, setCheckedRepos] = useState<{ [id: string]: boolean }>(
    {}
  )
  const orgs = uniq(data?.map((repo) => repo.owner) ?? [])
  const selectedRepos =
    data?.filter((repo) => Object.keys(checkedRepos).includes(repo.id)) || []

  const handleClickOrgCheckbox = useCallback(
    (org: string, isPrevChecked: boolean) => {
      if (!data) return
      const orgRepos = data.filter((repo) => repo.owner === org) || []
      const newCheckedRepos = { ...checkedRepos }
      for (const repo of orgRepos) {
        if (isPrevChecked) {
          delete newCheckedRepos[repo.id]
        } else {
          newCheckedRepos[repo.id] = true
        }
      }
      setCheckedRepos(newCheckedRepos)
    },
    [data, checkedRepos]
  )

  const handleClickRepoCheckbox = useCallback(
    (id: string) => {
      const newCheckedRepos = { ...checkedRepos }
      if (checkedRepos[id]) {
        delete newCheckedRepos[id]
      } else {
        newCheckedRepos[id] = true
      }
      setCheckedRepos(newCheckedRepos)
    },
    [checkedRepos]
  )

  useEffect(() => {
    if (data && config.repositories) {
      const prevCheckedRepos: { [id: string]: boolean } = {}
      for (const repo of config.repositories) {
        prevCheckedRepos[repo.id] = true
      }
      setCheckedRepos(prevCheckedRepos)
    }
  }, [data, config.repositories])

  return (
    <>
      <Stack>
        <Accordion allowToggle>
          {!!orgs &&
            orgs.map((org) => {
              const repos = data?.filter((repo) => repo.owner == org) || []
              const checkedRepoNum = repos.filter(
                (repo) => !!checkedRepos[repo.id]
              ).length
              const isOrgChecked = checkedRepoNum > 0
              const isOrgIndeterminate =
                checkedRepoNum > 0 && checkedRepoNum != repos.length

              return (
                <React.Fragment key={org}>
                  <AccordionItem>
                    <Box>
                      <AccordionButton display="flex">
                        <Stack direction="row" align="center">
                          <Checkbox
                            isChecked={isOrgChecked}
                            isIndeterminate={isOrgIndeterminate}
                            onClick={(e) => {
                              e.stopPropagation() // acordion 開閉させない
                            }}
                            onChange={(e) => {
                              console.log("changed")
                              handleClickOrgCheckbox(org, isOrgChecked)
                            }}
                          ></Checkbox>
                          <Box>{org}</Box>
                          <Box fontSize="sm" color="gray.500">
                            {checkedRepoNum} / {repos.length} repos
                          </Box>
                        </Stack>

                        <Spacer />
                        <AccordionIcon />
                      </AccordionButton>
                    </Box>

                    <AccordionPanel>
                      <TableContainer>
                        <Table size="sm">
                          <Thead>
                            <Tr>
                              <Th width="16rem">Repository</Th>
                              <Th width="16rem">Path</Th>
                              <Th width="10rem" textAlign="center">
                                Last Pushed
                              </Th>
                              <Th width="10rem" textAlign="center">
                                Created
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {repos.map((repo) => {
                              const isActive =
                                dayjs(repo.pushedAt) > dayjs().add(-90, "days")

                              return (
                                <Tr
                                  key={repo.id}
                                  _hover={{
                                    bgColor: "gray.50",
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => {
                                    handleClickRepoCheckbox(repo.id)
                                  }}
                                >
                                  <Td
                                    width="16rem"
                                    wordBreak="break-all"
                                    whiteSpace="break-spaces"
                                  >
                                    <Stack direction="row">
                                      {/* Checkbox はアニメーションするためまとめて変更するとめっちゃ遅いので数が多いこれは input に */}
                                      <chakra.input
                                        type="checkbox"
                                        checked={checkedRepos[repo.id]}
                                        onClick={(e) => {
                                          // テーブル行クリックを発動させない
                                          e.stopPropagation()
                                        }}
                                        onChange={(e) =>
                                          handleClickRepoCheckbox(repo.id)
                                        }
                                        sx={{
                                          "accent-color": "#3182ce",
                                        }}
                                      />
                                      <Box>{repo.name}</Box>
                                    </Stack>
                                  </Td>

                                  <Td
                                    width="16rem"
                                    wordBreak="break-all"
                                    whiteSpace="break-spaces"
                                    fontSize="xs"
                                    color="gray.500"
                                  >
                                    {repo.full_name}
                                  </Td>

                                  <Td
                                    fontSize="sm"
                                    color="gray.500"
                                    width="10rem"
                                    textAlign="center"
                                  >
                                    <Box>
                                      {isActive ? (
                                        <Badge
                                          variant="outline"
                                          colorScheme="green"
                                        >
                                          Active
                                        </Badge>
                                      ) : (
                                        <Badge
                                          variant="outline"
                                          colorScheme="gray"
                                        >
                                          Inactive
                                        </Badge>
                                      )}
                                    </Box>

                                    <Box fontSize="xs">
                                      {dayjs(repo.pushedAt).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </Box>
                                  </Td>

                                  <Td
                                    fontSize="xs"
                                    color="gray.500"
                                    width="10rem"
                                    textAlign="center"
                                  >
                                    {dayjs(repo.createdAt).format("YYYY-MM-DD")}
                                  </Td>
                                </Tr>
                              )
                            })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </AccordionPanel>
                  </AccordionItem>
                </React.Fragment>
              )
            })}
        </Accordion>

        <Stack direction="row">
          <Button variant="ghost" onClick={() => previousStep()}>
            Back
          </Button>

          <Spacer />

          <Stack direction="row" align="center">
            {selectedRepos.length > 0 && (
              <Box fontSize="sm" color="gray.500">
                {selectedRepos?.length} repos selected
              </Box>
            )}

            <Button
              colorScheme="blue"
              onClick={() => {
                onStepNext({ repositories: selectedRepos })
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
