import { Loader2 } from "lucide-react";
import React, { type JSX } from "react";
import { StatusContext, type StatusData } from "@/context/status-context";
import { useStatus } from "@/hooks/use-status";

type StatusComponent = React.FC<{
	value: StatusData;
	children: React.ReactNode;
}> & {
	Loading: React.FC<{ children?: React.ReactNode }>;
	Error: React.FC<{ children: React.ReactNode }>;
	Success: React.FC<{ children: React.ReactNode }>;
	Empty: React.FC<{ children: React.ReactNode }>;
	List: <T>(props: {
		data: T[];
		renderItem: (item: T, index: number) => React.ReactNode;
	}) => JSX.Element | null;
};

export const Status: StatusComponent = ({ value, children }) => {
	const memoValue = React.useMemo(() => value, [value]);
	return (
		<StatusContext.Provider value={memoValue}>
			{children}
		</StatusContext.Provider>
	);
};

Status.Loading = function Loading({ children }) {
	const { loading } = useStatus();
	return loading ? (
		children ? (
			children
		) : (
			<div className={"w-full h-full"}>
				<Loader2 className={"animate-spin"} />
			</div>
		)
	) : null;
};

Status.Error = function Error({ children }) {
	const { error } = useStatus();
	return error ? children : null;
};

Status.Success = function Success({ children }) {
	const { success } = useStatus();
	return success ? children : null;
};

Status.Empty = function Empty({ children }) {
	const { empty } = useStatus();
	return empty ? children : null;
};

Status.List = function List<T>({
	data,
	renderItem,
}: {
	data: T[];
	renderItem: (item: T, index: number) => React.ReactNode;
}) {
	if (!data) return null;
	// biome-ignore lint/performance/useSolidForComponent: <>
	return <>{data.map((item, index) => renderItem(item, index))}</>;
};
