import { useContext } from "react";
import { StatusContext } from "@/context/status-context";

export function useStatus() {
	const context = useContext(StatusContext);
	if (!context) {
		throw new Error(
			"Status compound components must be rendered within the DivStatus component",
		);
	}
	return context;
}
