import { store } from "../App";
import { Dispatch } from "redux";
import { makeActionCreator } from "../helpers/appHelpers";

export class ApiService {
	async handleApiError(res: Response) {
		const r = await res.json();
		if (res.status >= 500) {
			throw new Error(r);
		}
		return r;
	}

	request(asyncAction) {
		const { actions, shouldFetch, apiCall } = asyncAction;
		const [fetching, fetchSuccess, fetchError] = actions.map((action) =>
			makeActionCreator(action)
		);

		return (dispatch: Dispatch, getState) => {
			if (shouldFetch && !shouldFetch(getState())) {
				return;
			}

			fetching && dispatch(fetching());

			return apiCall()
				.then(
					(res) => this.handleApiError(res),
					(err) => {
						fetchError && dispatch(fetchError(err));
						throw new Error(err);
					}
				)
				.then((res) => fetchSuccess && dispatch(fetchSuccess(res)));
		};
	}
}
