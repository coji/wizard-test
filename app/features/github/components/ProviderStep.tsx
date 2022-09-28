import { Stack, Heading, Spacer, Button } from "@chakra-ui/react"
import { useWizard } from "react-use-wizard"
import { useFetcher } from "@remix-run/react"
import { ValidatedForm } from "remix-validated-form"
import { withZod } from "@remix-validated-form/with-zod"
import { AppFormInput } from "~/components/AppFormInput"
import type { StepProps } from "../interfaces/step-props"
import { z } from "zod"

export const providerStepFormSchema = z.object({
  token: z.string({ required_error: "shoud input github private token" }),
})

export const ProviderStep = ({ onStepNext }: StepProps) => {
  const { nextStep } = useWizard()
  const fetcher = useFetcher()

  return (
    <Stack>
      <Heading>Provider</Heading>
      <ValidatedForm
        validator={withZod(providerStepFormSchema)}
        onSubmit={async (formData, e) => {
          onStepNext(formData)
          nextStep()
        }}
      >
        <Stack>
          <AppFormInput
            name="token"
            label="Github Private Token"
            type="password"
            defaultValue={
              typeof document === "undefined"
                ? ""
                : window.env.GITHUB_AUTH_TOKEN
            }
          />
          <Stack direction={{ base: "column", md: "row" }}>
            <Button variant="ghost">Cancel</Button>
            <Spacer />
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={fetcher.state !== "idle"}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </ValidatedForm>
    </Stack>
  )
}
