import { rest } from "msw"
import fixture from "../fixture.json"

export const handlers = [
  rest.get("https://api.github.com/user/repos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fixture))
  }),
]
