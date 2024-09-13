import React, { version as ReactVersion } from "react";

import { RPCErrorCodes } from "discord-api-types/v10";

export const json = {
  // resolving React imports
  "typeof React": typeof React,
  "typeof React.cloneElement": typeof React.cloneElement,
  reactVersionsMatch: React.version === ReactVersion,

  // resolving discord-api-types/v10 (package which uses `require()`s without extensions
  // which can be problematic, see: https://github.com/dario-piotrowicz/vitest-pool-workers-ext-repro)
  "[discord-api-types/v10] RPCErrorCodes.InvalidUser":
    RPCErrorCodes.InvalidUser,
};
