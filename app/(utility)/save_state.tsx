'use client';

import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    username: "User",
    usertype: "User",
})

export { setGlobalState, useGlobalState }


