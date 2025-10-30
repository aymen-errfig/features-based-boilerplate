"use client";

import { lazy } from "react";
import { ToastContainer } from "react-toastify";
import { Header } from "@/components/organisms/Header";
import { TodoList } from "@/features/todo/organisms/TodoList";

const AddTodoDialog = lazy(
	() => import("@/features/todo/components/molecules/add-todo-dialog"),
);

export default function Home() {
	return (
		<div className={"h-screen flex flex-col"}>
			<Header />
			<div className={"h-full flex justify-center items-center "}>
				<div className={" px-4 bg-white border rounded-sm"}>
					<div className={"between-flex gap-10 border-b-1 py-3"}>
						<p>Todo</p>
						<AddTodoDialog />
					</div>
					<TodoList />
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}
