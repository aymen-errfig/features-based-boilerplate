import { CirclePlus } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { AddTodoForm } from "@/features/todo/components/molecules/add-todo-form";

export default function AddTodoDialog() {
	const closeRef = useRef<HTMLButtonElement | null>(null);
	return (
		<Dialog>
			<DialogClose ref={closeRef} />
			<DialogTrigger asChild={true}>
				<Button>
					<CirclePlus />
					Add
				</Button>
			</DialogTrigger>
			<DialogContent showCloseButton={false}>
				<DialogTitle hidden={true}>Add to list</DialogTitle>
				<AddTodoForm
					onClose={() => {
						closeRef.current?.click();
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}
