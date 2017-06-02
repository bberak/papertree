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
	filter: null,
	refreshing: false,
	events: [],

	refreshingSavedSearches: false,
	savedSearches: [],
	selectedSearch: null,

	settingsOpen: false,
	filterOpen: false
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
				loggedIn: true,
				loading: false
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
			return {
				...state,
				saveSearchActionSheetVisible: false,
				saveSearchFailed: false
			};
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
				searchName: null,
				saveSearchActionSheetVisible: false,
				selectedSearch: action.newSearch,
				savedSearches: [action.newSearch].concat(
					state.savedSearches || []
				)
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
			return {
				...state,
				refreshing: true,
				lastSearch: action.lastSearch,
				events: []
			};
		case "SEARCH_FAILED":
			return { ...state, refreshing: false, events: [] };
		case "SEARCH_SUCCEEDED":
			return { ...state, refreshing: false, events: action.events };
		case "REFRESHING":
			return { ...state, refreshing: true };
		//-- SAVED SEARCHES --//
		case "REFRESHING_SAVED_SEARCHES":
			return { ...state, refreshingSavedSearches: true };
		case "REFRESHING_SAVED_SEARCHES_SUCCEEDED":
			return {
				...state,
				refreshingSavedSearches: false,
				savedSearches: action.savedSearches
			};
		case "REFRESHING_SAVED_SEARCHES_FAILED":
			return {
				...state,
				refreshingSavedSearches: false,
				savedSearches: []
			};
		case "SEARCH_SELECTED":
			return {
				...state,
				selectedSearch: action.selectedSearch,
				searchTerm: action.selectedSearch.query,
				settingsOpen: false,
				filter: {
					groupId: action.selectedSearch.group.id,
					groupName: action.selectedSearch.group.name
				}
			};
		case "SELECTED_SEARCH_CLEARED":
			return {
				...state,
				selectedSearch: null,
				searchTerm: null,
				filter: null
			};
		case "SELECTED_SEARCH_OUT_OF_SYNC":
			return { ...state, selectedSearch: null };
		//-- DELETE SEARCH ACTION SHEET --//
		case "OPEN_DELETE_SEARCH_ACTIONSHEET":
			return {
				...state,
				deleteSearchActionSheetVisible: true,
				deleteSearchFailed: false
			};
		case "CLOSE_DELETE_SEARCH_ACTIONSHEET":
			return {
				...state,
				deleteSearchActionSheetVisible: false,
				deleteSearchFailed: false
			};
		//-- DELETE SEARCH --//
		case "DELETING_SEARCH":
			return {
				...state,
				deletingSearch: true,
				deleteSearchFailed: false
			};
		case "DELETE_SEARCH_FAILED":
			return {
				...state,
				deletingSearch: false,
				deleteSearchFailed: true
			};
		case "DELETE_SEARCH_SUCCEEDED":
			return {
				...state,
				deletingSearch: false,
				deleteSearchFailed: false,
				deleteSearchActionSheetVisible: false,
				selectedSearch: null,
				searchTerm: null,
				filter: null,
				savedSearches: (state.savedSearches || [])
					.filter(x => x.id !== action.deletedSearch.id)
			};

		case "OPEN_SETTINGS":
			return { ...state, settingsOpen: true, filterOpen: false };
		case "CLOSE_SETTINGS":
			return { ...state, settingsOpen: false };
		case "OPEN_FILTER":
			return { ...state, settingsOpen: false, filterOpen: true };
		case "CLOSE_FILTER":
			return { ...state, filterOpen: false };


		default:
			return state;
	}
};
