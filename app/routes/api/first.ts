import type { ActionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { z } from "zod"
import { Octokit } from "octokit"

export const firstStepSchema = z.object({
  name: z.string().min(1, { message: "name should input" }),
})

export const action = async ({ request }: ActionArgs) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN })

  try {
    const repos = await octokit.rest.repos.listForAuthenticatedUser()

    /*
    const data = firstStepSchema.parse(await request.json())
    if (data.name) {

    }
    */
    return json({
      repos: repos.data.map((repo) => ({
        full_name: repo.full_name,
        owner: repo.owner.login,
        name: repo.name,
        updatedAt: repo.updated_at,
      })),
    })
  } catch (e) {
    return json(e)
  }
}
