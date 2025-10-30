import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useTodos } from "@/features/todo/hooks/use-todos";
import type { TodoForm } from "@/features/todo/types/todo";
import { cn } from "@/lib/utils";

const TodoSchema = z.object({
	title: z.string().min(1, "title must be at least 1 character").max(255),
	done: z.boolean().transform((value) => value),
});

export const AddTodoForm: React.FC<{
	onClose: () => void;
}> = ({ onClose }) => {
	const { addTodo, adding_todo } = useTodos();
	const { control, handleSubmit } = useForm<TodoForm>({
		resolver: zodResolver(TodoSchema),
		defaultValues: {
			title: "",
			done: false,
		},
	});

	const onSubmit = (data: TodoForm) => {
		addTodo(data);
		onClose();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FieldGroup>
				<FieldSet>
					<FieldLegend>Form Test</FieldLegend>
					<FieldDescription>testing form field</FieldDescription>
					<FieldGroup>
						<Controller
							control={control}
							render={({ field, fieldState }) => (
								<Field className={"gap-1.5"} aria-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>Task Name</FieldLabel>
									<Input
										id={field.name}
										aria-invalid={fieldState.invalid}
										{...field}
										placeholder="test"
									/>
									<FieldError errors={[fieldState.error]} />
								</Field>
							)}
							name={"title"}
						/>
						<Controller
							control={control}
							render={({ field: { onChange, ...field }, fieldState }) => (
								<Field
									className={"gap-1.5"}
									aria-invalid={fieldState.invalid}
									orientation={"horizontal"}
								>
									<Checkbox
										aria-invalid={fieldState.invalid}
										onCheckedChange={onChange}
										checked={field.value}
									/>
									<FieldLabel htmlFor={field.name}>Done</FieldLabel>
									{/*<FieldDescription>testing form field</FieldDescription>*/}
								</Field>
							)}
							name={"done"}
						/>
					</FieldGroup>
				</FieldSet>
				<Field orientation={"horizontal"}>
					<Button onClick={onClose} variant={"outline"} type={"button"}>
						Cancel
					</Button>
					<Button
						type={"submit"}
						className={cn("grow", adding_todo && "opacity-50")}
					>
						{adding_todo && <Spinner />}
						Submit
					</Button>
				</Field>
			</FieldGroup>
		</form>
	);
};
