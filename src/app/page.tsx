"use client"

import {useTodos} from "@/features/todo/hooks/use-todos";
import {DivEmpty, DivError, DivList, DivStatus} from "@/components/global/div_status";

export default function Home() {
    const {
        todos,
        todosLoading,
        todosError,
        todosSuccess,
    } = useTodos();

    return (
        <div className="font-sans min-h-screen bg-white text-foreground">
            <h1>Todo List Example</h1>
            <div className={"rounded-sm border "}>
                <DivStatus value={{loading: todosLoading, error: todosError, success: todosSuccess, empty: false}}>
                    <DivList data={todos!} renderItem={
                        (item) => <p>{item.title}</p>
                    }/>
                    <DivError>
                        <div>error occurred</div>
                    </DivError>
                    <DivEmpty>
                        <div>empty</div>
                    </DivEmpty>
                </DivStatus>
            </div>
        </div>
    );
}
