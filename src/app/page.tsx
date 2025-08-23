"use client"

import {useTodos} from "@/features/todo/hooks/use-todos";
import {DivEmpty, DivError, DivStatus, DivSuccess} from "@/components/global/div_status";

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
                    <DivSuccess>
                        <div>{
                            todos?.map((item) => (
                                <div key={item.id}>{item.title}</div>
                            ))
                        }</div>
                    </DivSuccess>
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
