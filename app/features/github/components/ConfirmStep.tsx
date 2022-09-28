import { Stack, Heading, Spacer, Button } from "@chakra-ui/react"
import { useWizard } from "react-use-wizard"
import type { StepProps } from "../interfaces/step-props"

export const ConfirmStep = ({ onStepNext }: StepProps) => {
  const { previousStep, nextStep } = useWizard()

  return (
    <Stack>
      <Heading>Confirm</Heading>
      <Stack direction="row">
        <Button variant="ghost" onClick={() => previousStep()}>
          Back
        </Button>
        <Spacer />
        <Button colorScheme="blue" onClick={() => nextStep()}>
          Next
        </Button>
      </Stack>
    </Stack>
  )
}
