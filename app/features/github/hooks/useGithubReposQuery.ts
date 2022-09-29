import { useQuery } from "@tanstack/react-query"
import type { listGithubRepos } from "../services/listGithubRepos"
import { sortBy } from "remeda"
//import fixture from "~/../fixture.json"

export const useGithubRepoQuery = (token: string | undefined) =>
  useQuery(
    ["github-repos"],
    async () => {
      const params = new URLSearchParams()
      params.append("token", token!)
      const ret = await fetch("/api/github?" + params.toString())
      return (await ret.json()) as ReturnType<typeof listGithubRepos>
    },
    {
      enabled: !!token,
      select: (repos) =>
        sortBy(repos, [
          (repo) => repo.pushedAt ?? "2000-01-01T00:00:00Z",
          "desc",
        ]),
    }
  )
