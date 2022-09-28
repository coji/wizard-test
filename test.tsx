import { Octokit } from "octokit"
import dotenv from "dotenv"
dotenv.config()

const main = async () => {
  const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN })
  const list = await octokit.rest.repos.listForAuthenticatedUser()
  console.log(list)
}

main()
