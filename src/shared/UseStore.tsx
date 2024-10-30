import React, { useContext, createContext } from "react";
import {RootStore, Task} from "../stores/Root.Store";

export const RootStoreContext = createContext<RootStore | null>(null)

type Props = {
    task: Task;
};

export const useStore = () => {
    const context = useContext(RootStoreContext);
    if (context === null) {
        throw new Error(
            "You have forgotten to wrap your root component with RootStoreProvider"
        );
    }
    return context;
};