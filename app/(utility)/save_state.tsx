'use client';

import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    username: "User",
    usertype: "User",
    userID: " ",
})

export { setGlobalState, useGlobalState }


