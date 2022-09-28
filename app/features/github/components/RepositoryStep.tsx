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
} from "@chakra-ui/react"
import { useWizard } from "react-use-wizard"
import { useGithubRepoQuery } from "../hooks/useGithubReposQuery"
import type { StepProps } from "../interfaces/step-props"
import { uniq } from "remeda"
import dayjs from "dayjs"

export const RepositoryStep = ({ onStepNext, config }: StepProps) => {
  const { previousStep, nextStep } = useWizard()
  const { data, isLoading } = useGithubRepoQuery(config.token)

  const orgs = uniq(data?.map((repo) => repo.owner) ?? [])

  return (
    <>
      <Stack>
        <Accordion allowMultiple>
          {!!orgs &&
            orgs.map((org) => {
              const repos = data?.filter((repo) => repo.owner == org)
              return (
                <>
                  <AccordionItem key={org}>
                    <Box>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {org} {repos?.length}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </Box>

                    <AccordionPanel>
                      <TableContainer>
                        <Table>
                          <Thead>
                            <Tr>
                              <Th minWidth="16rem">Repository</Th>
                              <Th minWidth="16rem">Path</Th>
                              <Th minWidth="10rem">Active Repos</Th>
                              <Th minWidth="10rem">Created</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {repos?.map((repo) => {
                              const isActive =
                                dayjs(repo.pushedAt) > dayjs().add(-90, "days")
                              return (
                                <Tr
                                  key={repo.id}
                                  _hover={{ bgColor: "gray.50" }}
                                >
                                  <Td
                                    minWidth="16rem"
                                    wordBreak="break-all"
                                    whiteSpace="break-spaces"
                                  >
                                    <Stack direction="row">
                                      <Checkbox></Checkbox>
                                      <Box>{repo.name}</Box>
                                    </Stack>
                                  </Td>
                                  <Td
                                    minWidth="16rem"
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
                                    minWidth="10rem"
                                  >
                                    {isActive ? (
                                      <Badge
                                        variant="outline"
                                        colorScheme="green"
                                      >
                                        Active
                                      </Badge>
                                    ) : (
                                      dayjs(repo.pushedAt).format("YYYY-MM-DD")
                                    )}
                                  </Td>
                                  <Td
                                    fontSize="sm"
                                    color="gray.500"
                                    minWidth="10rem"
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
                </>
              )
            })}
        </Accordion>

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
