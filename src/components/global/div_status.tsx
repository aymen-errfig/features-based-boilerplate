import React from "react";
import {StatusContext, StatusData} from "@/context/status-context";
import {useStatus} from "@/hooks/use-status";

const DivLoading: React.FC<{ children: React.ReactNode }>
    = ({children}) => {
    const {loading} = useStatus();
    return loading ? <>{children}</> : null;
}

const DivError: React.FC<{ children: React.ReactNode }>
    = ({children}) => {
    const {error} = useStatus();
    return error ? <>{children}</> : null;
}

function DivList<T>({
                        data,
                        renderItem,
                    }: {
    data: T[];
    renderItem: (item: T) => React.ReactNode;
}) {
    return <>{data.map((item) => renderItem(item))}</>;
}

const DivSuccess: React.FC<{ children: React.ReactNode }>
    = ({children}) => {
    const {success} = useStatus();
    return success ? <>{children}</> : null;
}

const DivEmpty: React.FC<{ children: React.ReactNode }>
    = ({children}) => {
    const {empty} = useStatus();
    return empty ? <>{children}</> : null;
}

const DivStatus: React.FC<{ value: StatusData; children: React.ReactNode }> = ({value, children}) => {
    const memoValue = React.useMemo(() => value, [value]);
    return <StatusContext.Provider value={memoValue}>{children}</StatusContext.Provider>;
};


export {DivLoading, DivError, DivSuccess, DivEmpty, DivStatus, DivList};