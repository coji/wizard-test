require("tsconfig-paths/register")
require("ts-node").register({ transpileOnly: true })

console.log("mock")
if (typeof window === "undefined") {
  const { server } = require("./server")
  server.listen({ onUnhandledRequest: "warn" })
  console.info("🔶 Mock server running")
  process.once("SIGINT", () => server.close())
  process.once("SIGTERM", () => server.close())
} else {
  const { worker } = require("./browser")
  worker.start()
}
