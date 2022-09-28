import { useQuery } from "@tanstack/react-query"
import { listGithubRepos } from "../services/listGithubRepos"

export const useGithubRepoQuery = (token: string | undefined) =>
  useQuery(["github-repos"], () => listGithubRepos(token ?? ""), {
    enabled: !!token,
  })
