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
	lastSearch: null,
	refreshing: false,
	events: [],

	//filter: null,
	//savedSearches: [],
	//selectedSearch: null,
	//events: [],
	//selectedEvent: null
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
			return {
				...state,
				saveSearchActionSheetVisible: true,
				saveSearchFailed: false
			};
		case "CLOSE_SAVE_SEARCH_ACTIONSHEET":
			return { ...state, saveSearchActionSheetVisible: false };
		
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
		
		//-- OPEN, CLOSE, BOOKMARK --//
		case "SHOW_BOOKMARK":
			return { ...state, bookmarkVisible: true };
		case "HIDE_BOOKMARK":
			return { ...state, bookmarkVisible: false };

		//-- SEARCH --//
		case "SEARCH_TERM_CHANGED":
			return { ...state, searchTerm: action.searchTerm };
		case "SEARCHING":
			return { ...state, refreshing: true, lastSearch: action.lastSearch, events: [] }
		case "SEARCH_FAILED":
			return { ...state, refreshing: false, events: [] }
		case "SEARCH_SUCCEEDED":
			return { ...state, refreshing: false, events: action.events}
		case "REFRESHING":
			return { ...state, refreshing: true }

		default:
			return state;
	}
};
