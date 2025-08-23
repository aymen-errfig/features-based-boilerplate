"use client"

import {createContext} from "react";

export type StatusData = {
    loading: boolean,
    error: boolean,
    success: boolean,
    empty: boolean,
}

export const StatusContext = createContext<StatusData>({
    loading: false,
    error: false,
    success: false,
    empty: false,
});