import { Octokit } from "octokit"

export const listGithubRepos = async (token: string) => {
  const octokit = new Octokit({
    auth: token,
  })

  const repos = await octokit.paginate(
    octokit.rest.repos.listForAuthenticatedUser,
    {
      page_size: 100,
    },
    (res) =>
      res.data.map((repo) => ({
        id: repo.node_id,
        full_name: repo.full_name,
        defaultBranch: repo.default_branch,
        visibility: repo.visibility,
        owner: repo.owner.login,
        name: repo.name,
        updatedAt: repo.updated_at,
        createdAt: repo.created_at,
      }))
  )

  return repos
}
