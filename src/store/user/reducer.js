/* eslint-disable import/no-anonymous-default-export */
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	GET_USER_ROLE,
} from './actionTypes';
import Service from '../../services';
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
	? {
			isAuth: user.successful,
			name: user.user.name,
			email: user.user.email,
			token: user.result,
			role: '',
	  }
	: {
			isAuth: false,
			name: '',
			email: '',
			token: '',
			role: '',
	  };

export default function (state = initialState, action) {
	// role should not be empty at page reload
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				isAuth: false,
			};
		case REGISTER_FAIL:
			return {
				...state,
				isAuth: false,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuth: payload.user.successful,
				name: payload.user.user.name,
				email: payload.user.user.email,
				token: payload.user.result,
			};
		case GET_USER_ROLE:
			return {
				...state,
				role: payload,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isAuth: false,
			};
		case LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return state;
	}
}
