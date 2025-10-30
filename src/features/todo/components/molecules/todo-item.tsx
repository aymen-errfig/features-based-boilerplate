import type { CheckedState } from "@radix-ui/react-checkbox";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/features/todo/types/todo";

type TodoItemProps = {
	item: Todo;
	onCheck: (checked: CheckedState) => void;
	onDelete: () => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
	item,
	onCheck,
	onDelete,
	...props
}) => {
	"use memo";

	return (
		<div {...props} className={"between-flex gap-20 py-2"}>
			<div className={"between-flex gap-2"}>
				<Checkbox onCheckedChange={onCheck} checked={item.done} />
				<p>{item.title}</p>
			</div>
			<Button onClick={onDelete} variant={"destructive"}>
				delete
			</Button>
		</div>
	);
};
