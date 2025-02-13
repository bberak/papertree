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
	keyboardVisible: false,
	orientation: null,

	searchTerm: null,
	lastSearch: null,
	filter: null,
	lastFilter: null,
	refreshing: false,
	events: [],
	selectedEvent: null,

	refreshingSavedSearches: false,
	savedSearches: [],
	selectedSearch: null,

	settingsOpen: false,
	filterOpen: false,

	refreshingSystemsAndGroups: false,
	systems: [],
	groups: []
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
			return {
				...initState,
				loading: false
			};
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
		//-- KEYBOARD --//
		case "KEYBOARD_SHOWN":
			return { ...state, keyboardVisible: true };
		case "KEYBOARD_HIDDEN":
			return { ...state, keyboardVisible: false };
		//-- ORIENTATION CHANGE --//
		case "ORIENTATION_CHANGED":
			return { ...state, orientation: action.orientation };
		//-- OPEN, CLOSE, BOOKMARK --//
		case "SHOW_BOOKMARK":
			return { ...state, bookmarkVisible: true };
		case "HIDE_BOOKMARK":
			return { ...state, bookmarkVisible: false };
		//-- SEARCH --//
		case "APPLY_FILTER":
			return { ...state, filter: action.filter, selectedEvent: null };
		case "SEARCH_TERM_CHANGED":
			return { ...state, searchTerm: action.searchTerm };
		case "SEARCH_SUBMITTED":
			return { ...state, selectedEvent: null };
		case "SEARCHING":
			return {
				...state,
				refreshing: true,
				events: []
			};
		case "SEARCH_FAILED":
			return { ...state, refreshing: false, events: [] };
		case "SEARCH_SUCCEEDED":
			return {
				...state,
				refreshing: false,
				events: action.events,
				lastSearch: action.lastSearch,
				lastFilter: action.lastFilter
			};
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
				selectedEvent: null,
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
		//-- OPEN, CLOSE, FILTER AND SETTINGS --//
		case "OPEN_SETTINGS":
			return { ...state, settingsOpen: true, filterOpen: false };
		case "CLOSE_SETTINGS":
			return { ...state, settingsOpen: false };
		case "OPEN_FILTER":
			return { ...state, settingsOpen: false, filterOpen: true };
		case "CLOSE_FILTER":
			return { ...state, filterOpen: false };
		//-- SYSTEMS AND GROUPS --..
		case "REFRESHING_SYSTEMS_AND_GROUPS":
			return { ...state, refreshingSystemsAndGroups: true };
		case "REFRESHING_SYSTEMS_AND_GROUPS_SUCCEEDED":
			return {
				...state,
				refreshingSystemsAndGroups: false,
				groups: action.groups,
				systems: action.systems
			};
		case "REFRESHING_SYSTEMS_AND_GROUPS_FAILED":
			return {
				...state,
				refreshingSystemsAndGroups: false,
				groups: [],
				systems: []
			};
		//-- EVENT SELECTION --//
		case "SELECTED_EVENT_CLEARED":
			return { ...state, selectedEvent: null, events: [] };
		case "EVENT_SELECTED":
			return {
				...state,
				selectedEvent: action.selectedEvent,
				selectedSearch: null
			};
		case "SEARCHING_EVENTS":
			return {
				...state,
				refreshing: true,
				searchTerm: null,
				lastSearch: null,
				filter: null,
				lastFilter: null,
				events: action.siblings
			};
		case "EVENT_SEARCH_SUCCEEDED":
			return { ...state, refreshing: false, events: action.events };
		case "EVENT_SEARCH_FAILED":
			return { ...state, refreshing: false, events: [] };

		default:
			return state;
	}
};
