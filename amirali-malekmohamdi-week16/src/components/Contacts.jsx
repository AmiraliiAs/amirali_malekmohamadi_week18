import { useContext, useEffect, useState, useCallback } from "react";
import ContactsList from "./ContactsList";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";
import Modal from "./Modal";
import { ContactContext } from "../context/contactContext.jsx";
import ContactForm from "./ContactForm";
import SearchBar from "./SearchBar";
import Notification from "./Notification";

const API_URL = "http://localhost:3001/contacts";

function Contacts() {
	const { state, dispatch } = useContext(ContactContext);
	const [notification, setNotification] = useState({ show: false, message: "", type: "info" });

	// دریافت مخاطبین از json-server
	useEffect(() => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((data) => dispatch({ type: "SET_CONTACTS", payload: data }))
			.catch(() => {
				showNotification("خطا در دریافت مخاطبین", "error");
			});
	}, [dispatch]);

	const showNotification = (message, type = "info") => {
		setNotification({ show: true, message, type });
		setTimeout(() => {
			setNotification({ show: false, message: "", type: "info" });
		}, 3000);
	};

	// افزودن مخاطب جدید
	const addHandler = async (contactData) => {
		dispatch({ type: "SET_ALERT", payload: "" });
		const newContact = { ...contactData, id: v4() };

		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newContact),
			});

			if (!response.ok) {
				throw new Error("خطا در افزودن مخاطب");
			}

			const data = await response.json();
			dispatch({ type: "ADD_CONTACT", payload: data });
			showNotification("مخاطب با موفقیت اضافه شد", "success");
		} catch (error) {
			showNotification(error.message || "خطا در افزودن مخاطب", "error");
		}
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
	const confirmDelete = async () => {
		try {
			if (state.modal.type === "single") {
				const response = await fetch(`${API_URL}/${state.modal.id}`, {
					method: "DELETE",
				});

				if (!response.ok) {
					throw new Error("خطا در حذف مخاطب");
				}

				dispatch({
					type: "DELETE_CONTACT",
					payload: state.modal.id,
				});
				showNotification("مخاطب با موفقیت حذف شد", "success");
			} else if (state.modal.type === "batch") {
				const deletePromises = state.selected.map((id) => fetch(`${API_URL}/${id}`, { method: "DELETE" }));

				await Promise.all(deletePromises);
				dispatch({ type: "BATCH_DELETE" });
				showNotification(`${state.selected.length} مخاطب با موفقیت حذف شدند`, "success");
			}
		} catch (error) {
			showNotification(error.message || "خطا در حذف مخاطب", "error");
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

	// ذخیره ویرایش
	const saveEditHandler = async (editData) => {
		try {
			const response = await fetch(`${API_URL}/${state.editId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...editData,
					id: state.editId,
				}),
			});

			if (!response.ok) {
				throw new Error("خطا در ویرایش مخاطب");
			}

			const data = await response.json();
			dispatch({
				type: "SAVE_EDIT",
				payload: { ...data, id: state.editId },
			});
			showNotification("مخاطب با موفقیت ویرایش شد", "success");
		} catch (error) {
			showNotification(error.message || "خطا در ویرایش مخاطب", "error");
		}
	};

	// لغو ویرایش
	const cancelEditHandler = () => dispatch({ type: "CANCEL_EDIT" });

	// جستجو - استفاده از useCallback
	const handleSearch = useCallback(
		(searchTerm) => {
			dispatch({ type: "SET_SEARCH", payload: searchTerm });
		},
		[dispatch]
	);

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
			<ContactForm onSubmit={addHandler} submitText="افزودن مخاطب" />

			<div className={styles.alert}>{state.alert && <p>{state.alert}</p>}</div>

			<SearchBar onSearch={handleSearch} />

			<ContactsList
				contacts={filteredContacts}
				deleteHandler={askDeleteHandler}
				selected={state.selected}
				selectHandler={selectHandler}
				batchDeleteHandler={askBatchDeleteHandler}
				editId={state.editId}
				editContact={state.editContact}
				startEditHandler={startEditHandler}
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

			<Notification
				show={notification.show}
				message={notification.message}
				type={notification.type}
				onClose={() => setNotification({ show: false, message: "", type: "info" })}
			/>
		</div>
	);
}

export default Contacts;
