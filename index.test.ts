import { createServer } from "vite";
import { beforeAll, describe, expect, test } from "vitest";

import config from "./vite.config";

describe("vite ssrLoadModule dev module resolution", () => {
  let jsonOutput: Record<string, unknown> = {};

  beforeAll(async () => {
    jsonOutput = (await fetchJsonFromViteDevServer()) ?? {};
  });

  test('can successfully import "React"', () => {
    expect(jsonOutput["typeof React"]).toEqual("object");
    expect(jsonOutput["typeof React.cloneElement"]).toEqual("function");
    expect(jsonOutput["reactVersionsMatch"]).toEqual(true);
  });

  test("can successfully use the discord-api-types/v10 package", () => {
    expect(
      jsonOutput["[discord-api-types/v10] RPCErrorCodes.InvalidUser"]
    ).toEqual(4010);
  });
});

async function fetchJsonFromViteDevServer(): Promise<null | Record<
  string,
  unknown
>> {
  const viteServer = await createServer({
    ...config,
  });

  await viteServer.listen();

  const addressInfo = viteServer.httpServer?.address();

  if (!addressInfo) {
    return null;
  }

  const address =
    typeof addressInfo === "string"
      ? addressInfo
      : `http://localhost:${addressInfo.port}`;
  const resp = await fetch(address);
  await viteServer.close();
  return await resp.json();
}
