function contactReducer(state, action) {
	switch (action.type) {
		case "SET_CONTACTS":
			return { ...state, contacts: action.payload };
		case "ADD_CONTACT":
			return {
				...state,
				contacts: [...state.contacts, action.payload],
			};
		case "DELETE_CONTACT":
			return {
				...state,
				contacts: state.contacts.filter((c) => c.id !== action.payload),
				selected: state.selected.filter((id) => id !== action.payload),
			};
		case "BATCH_DELETE":
			return {
				...state,
				contacts: state.contacts.filter((c) => !state.selected.includes(c.id)),
				selected: [],
			};
		case "SELECT_CONTACT":
			return {
				...state,
				selected: state.selected.includes(action.payload)
					? state.selected.filter((id) => id !== action.payload)
					: [...state.selected, action.payload],
			};
		case "SET_ALERT":
			return { ...state, alert: action.payload };
		case "SET_MODAL":
			return { ...state, modal: action.payload };
		case "SET_EDIT":
			return {
				...state,
				editId: action.payload.id,
				editContact: action.payload.contact,
			};
		case "SAVE_EDIT":
			return {
				...state,
				contacts: state.contacts.map((c) => (c.id === state.editId ? { ...action.payload, id: state.editId } : c)),
				editId: null,
				editContact: {},
			};
		case "CANCEL_EDIT":
			return { ...state, editId: null, editContact: {} };
		case "SET_SEARCH":
			return { ...state, search: action.payload };
		default:
			return state;
	}
}

export default contactReducer;
