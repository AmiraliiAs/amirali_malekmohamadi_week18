import { useContext, useEffect, useState } from "react";
import ContactsList from "./ContactsList";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";
import Modal from "./Modal";
import { ContactContext } from "../context/contactContext.jsx";

const API_URL = "http://localhost:3001/contacts";

const input = [
	{ type: "text", name: "name", placeholder: "Name" },
	{ type: "text", name: "lastname", placeholder: "LastName" },
	{ type: "email", name: "email", placeholder: "Email" },
	{ type: "number", name: "phone", placeholder: "Phone" },
];

function Contacts() {
	const { state, dispatch } = useContext(ContactContext);
	const [contact, setContact] = useState({
		name: "",
		lastname: "",
		email: "",
		phone: "",
	});

	// دریافت مخاطبین از json-server
	useEffect(() => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((data) => dispatch({ type: "SET_CONTACTS", payload: data }))
			.catch(() =>
				dispatch({
					type: "SET_ALERT",
					payload: "خطا در دریافت مخاطبین",
				})
			);
	}, [dispatch]);

	const changeHandler = (event) => {
		const { name, value } = event.target;
		setContact((prev) => ({ ...prev, [name]: value }));
	};

	// افزودن مخاطب جدید
	const addHandler = () => {
		if (!contact.name || !contact.lastname || !contact.email || !contact.phone) {
			dispatch({
				type: "SET_ALERT",
				payload: "Please enter valid data.",
			});
			return;
		}
		dispatch({ type: "SET_ALERT", payload: "" });
		const newContact = { ...contact, id: v4() };
		fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newContact),
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch({ type: "ADD_CONTACT", payload: data });
				setContact({ name: "", lastname: "", email: "", phone: "" });
			})
			.catch(() =>
				dispatch({
					type: "SET_ALERT",
					payload: "خطا در افزودن مخاطب",
				})
			);
	};

	// حذف تکی
	const askDeleteHandler = (id) =>
		dispatch({
			type: "SET_MODAL",
			payload: { open: true, type: "single", id },
		});

	// حذف گروهی
	const askBatchDeleteHandler = () =>
		dispatch({
			type: "SET_MODAL",
			payload: { open: true, type: "batch" },
		});

	// بستن مدال
	const closeModal = () =>
		dispatch({
			type: "SET_MODAL",
			payload: { open: false, type: null, id: null },
		});

	// تایید حذف
	const confirmDelete = () => {
		if (state.modal.type === "single") {
			fetch(`${API_URL}/${state.modal.id}`, { method: "DELETE" })
				.then(() =>
					dispatch({
						type: "DELETE_CONTACT",
						payload: state.modal.id,
					})
				)
				.catch(() => dispatch({ type: "SET_ALERT", payload: "خطا در حذف مخاطب" }));
		} else if (state.modal.type === "batch") {
			Promise.all(state.selected.map((id) => fetch(`${API_URL}/${id}`, { method: "DELETE" })))
				.then(() => dispatch({ type: "BATCH_DELETE" }))
				.catch(() => dispatch({ type: "SET_ALERT", payload: "خطا در حذف گروهی" }));
		}
		closeModal();
	};

	// انتخاب مخاطب
	const selectHandler = (id) => dispatch({ type: "SELECT_CONTACT", payload: id });

	// شروع ویرایش
	const startEditHandler = (contact) =>
		dispatch({
			type: "SET_EDIT",
			payload: { id: contact.id, contact },
		});

	// تغییر فیلد ویرایش
	const editChangeHandler = (e) => {
		const { name, value } = e.target;
		dispatch({ type: "EDIT_CHANGE", payload: { [name]: value } });
	};

	// ذخیره ویرایش
	const saveEditHandler = () => {
		fetch(`${API_URL}/${state.editId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...state.editContact,
				id: state.editId,
			}),
		})
			.then((res) => res.json())
			.then(() => dispatch({ type: "SAVE_EDIT" }))
			.catch(() =>
				dispatch({
					type: "SET_ALERT",
					payload: "خطا در ویرایش مخاطب",
				})
			);
	};

	// لغو ویرایش
	const cancelEditHandler = () => dispatch({ type: "CANCEL_EDIT" });

	// فیلتر مخاطبین
	const filteredContacts = state.contacts.filter((c) => {
		const q = state.search.toLowerCase();
		return (
			c.name.toLowerCase().includes(q) ||
			c.lastname.toLowerCase().includes(q) ||
			c.email.toLowerCase().includes(q) ||
			c.phone.toLowerCase().includes(q)
		);
	});

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				{input.map((input, index) => (
					<input
						key={index}
						type={input.type}
						placeholder={input.placeholder}
						name={input.name}
						value={contact[input.name]}
						onChange={changeHandler}
					/>
				))}
				<button onClick={addHandler}>Add Contacts</button>
			</div>
			<div className={styles.alert}>{state.alert && <p>{state.alert}</p>}</div>
			<input
				type="text"
				placeholder="Search bar..."
				value={state.search}
				onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
				style={{
					width: "100%",
					marginBottom: 16,
					padding: 8,
					borderRadius: 8,
					border: "1px solid #ccc",
				}}
			/>
			<ContactsList
				contacts={filteredContacts}
				deleteHandler={askDeleteHandler}
				selected={state.selected}
				selectHandler={selectHandler}
				batchDeleteHandler={askBatchDeleteHandler}
				editId={state.editId}
				editContact={state.editContact}
				startEditHandler={startEditHandler}
				editChangeHandler={editChangeHandler}
				saveEditHandler={saveEditHandler}
				cancelEditHandler={cancelEditHandler}
			/>
			<Modal
				open={state.modal.open}
				onClose={closeModal}
				onConfirm={confirmDelete}
				text={
					state.modal.type === "batch"
						? "آیا از حذف همه مخاطبین انتخاب شده مطمئن هستید؟"
						: "آیا از حذف این مخاطب مطمئن هستید؟"
				}
			/>
		</div>
	);
}

export default Contacts;
