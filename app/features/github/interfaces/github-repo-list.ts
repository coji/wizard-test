import type { listGithubRepos } from "../services/listGithubRepos"

export type GithubRepo = Awaited<ReturnType<typeof listGithubRepos>>[0]