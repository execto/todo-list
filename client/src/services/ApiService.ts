import { store } from "../App";

export class ApiService {
	async handleApiError(res: Response) {
		const r = await res.json();
		if (res.status >= 500) {
			throw new Error(r);
		}
		return r;
	}
}
