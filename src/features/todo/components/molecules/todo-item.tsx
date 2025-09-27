import {Todo} from "@/features/todo/types/todo";
import {CheckedState} from "@radix-ui/react-checkbox";
import React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";

type TodoItemProps = {
    item: Todo;
    onCheck: (checked: CheckedState) => void;
    onDelete: () => void;
}

export const TodoItem: React.FC<TodoItemProps>
    = ({
           item,
           onCheck,
           onDelete,
           ...props
       }) => {
    return (
        <div {...props} className={"between-flex gap-20 py-2"}>
            <div className={"between-flex gap-2"}>
                <Checkbox onCheckedChange={onCheck} checked={item.done}/>
                <p>{item.title}</p>
            </div>
            <Button onClick={onDelete} variant={"destructive"}>delete</Button>
        </div>
    );
}