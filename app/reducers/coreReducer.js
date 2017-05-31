const initState = {
	loading: true,

	attemptingLogin: false,
	loginFailed: false,
	loggedIn: false,

	saveSearchActionSheetVisible: false,
	searchName: null,
	savingSearch: false,
	saveSearchFailed: false,

	deleteSearchActionSheetVisible: false,
	deletingSearch: false,
	deleteSearchFailed: false,

	bookmarkVisible: false,
	orientation: null,

	searchTerm: null,
	filter: null
};

export default (state = initState, action = {}) => {
	switch (action.type) {

		//-- LOADING --//
		case "LOADED":
			return { ...state, loading: false };

		//-- AUTHENTICATION --//
		case "ATTEMPTING_LOGIN":
			return { ...state, attemptingLogin: true, loginFailed: false };
		case "LOGIN_FAILED":
			return { ...state, attemptingLogin: false, loginFailed: true };
		case "LOGIN_SUCCEEDED":
			return {
				...state,
				attemptingLogin: false,
				loginFailed: false,
				loggedIn: true
			};
		case "LOGGED_OUT":
			return { ...state, loggedIn: false };

		//-- SAVE SEARCH ACTION SHEET --//
		case "OPEN_SAVE_SEARCH_ACTIONSHEET":
			return { ...state, saveSearchActionSheetVisible: true };
		case "CLOSE_SAVE_SEARCH_ACTIONSHEET":
			return { ...state, saveSearchActionSheetVisible: false};
		
		//-- SAVING SEARCH --//
		case "SAVE_SEARCH_NAME_CHANGED":
			return { ...state, searchName: action.searchName };
		case "SAVING_SEARCH":
			return { ...state, savingSearch: true, saveSearchFailed: false };
		case "SAVE_SEARCH_FAILED":
			return { ...state, savingSearch: false, saveSearchFailed: true };
		case "SAVE_SEARCH_SUCCEEDED":
			return {
				...state,
				savingSearch: false,
				saveSearchFailed: false,
				searchName: null
			};

		//-- ORIENTATION CHANGE --//
		case "ORIENTATION_CHANGED":
			return { ...state, orientation: action.orientation };

		//-- SEARCH TERM CHANGE --//
		case "SEARCH_TERM_CHANGED":
			return { ...state, searchTerm: action.searchTerm };

		//-- OPEN, CLOSE, BOOKMAR --//
		case "SHOW_BOOKMARK":
			return { ...state, bookmarkVisible: true };
		case "HIDE_BOOKMARK":
			return { ...state, bookmarkVisible: false };

		default:
			return state;
	}
};
