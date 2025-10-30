import { apiInstance } from "@/api/client";

export const globalFetcher = async (route: string) => {
	const resp = await apiInstance.get(route);
	return resp.data;
};
