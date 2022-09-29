import { Container } from "@chakra-ui/react"
import { SetupWizard } from "~/features/github/components/SetupWizard"
import { Link } from "@remix-run/react"

export default function Index() {
  return (
    <Container maxWidth="container.xl">
      <SetupWizard />

      <Link to="test">Test</Link>
    </Container>
  )
}
