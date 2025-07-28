import React, { createContext, useReducer } from "react";
import contactReducer from "./contactReducer";

const ContactContext = createContext();

const initialState = {
	contacts: [],
	selected: [],
	alert: "",
	modal: { open: false, type: null, id: null },
	editId: null,
	editContact: {},
	search: "",
};

export const ContactProvider = ({ children }) => {
	const [state, dispatch] = useReducer(contactReducer, initialState);

	return <ContactContext.Provider value={{ state, dispatch }}>{children}</ContactContext.Provider>;
};

export { ContactContext };
