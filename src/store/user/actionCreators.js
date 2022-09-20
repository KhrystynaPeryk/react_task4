import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	GET_USER_ROLE,
} from './actionTypes';
import AuthService from '../../services';
export const register = (name, email, password) => (dispatch) => {
	return AuthService.register(name, email, password).then(
		(response) => {
			dispatch({
				type: REGISTER_SUCCESS,
			});
			return Promise.resolve();
		},
		(error) => {
			dispatch({
				type: REGISTER_FAIL,
			});
			return Promise.reject();
		}
	);
};
export const login = (email, password) => (dispatch) => {
	return AuthService.login(email, password)
		.then(
			(data) => {
				return dispatch({
					type: LOGIN_SUCCESS,
					payload: { user: data },
				});
			},
			() => {
				return dispatch({
					type: LOGIN_FAIL,
				});
			}
		)
		.then((data) => {
			const token = data.payload.user.result;
			return AuthService.getUserRole(token).then((data) => {
				return dispatch({
					type: GET_USER_ROLE,
					payload: data.data.result.role,
				});
			});
		});
};
export const logout = (token) => (dispatch) => {
	AuthService.logout(token);
	dispatch({
		type: LOGOUT,
	});
};
