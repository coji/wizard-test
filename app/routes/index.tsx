import { Container } from "@chakra-ui/react"
import { SetupWizard } from "~/features/github/components/SetupWizard"

export default function Index() {
  return (
    <Container maxWidth="container.xl">
      <SetupWizard />
    </Container>
  )
}
