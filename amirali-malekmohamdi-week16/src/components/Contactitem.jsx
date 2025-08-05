import React from "react";
import styles from "./ContactItem.module.css";
import ContactForm from "./ContactForm";

function Contactitem({
	data: { id, name, lastname, email, phone },
	deleteHandler,
	selected = [],
	selectHandler = () => {},
	isEditing = false,
	editContact = {},
	startEditHandler = () => {},
	saveEditHandler = () => {},
	cancelEditHandler = () => {},
}) {
	const handleEditSubmit = async (formData) => {
		await saveEditHandler(formData);
	};

	return (
		<li className={styles.item}>
			<input
				className={styles.batchdelete}
				type="checkbox"
				checked={selected.includes(id)}
				onChange={() => selectHandler(id)}
			/>
			{isEditing ? (
				<div className={styles.editForm}>
					<ContactForm onSubmit={handleEditSubmit} initialData={editContact} submitText="ذخیره تغییرات" />
					<button className={styles.editcancel} onClick={cancelEditHandler}>
						❌ انصراف
					</button>
				</div>
			) : (
				<>
					<p>
						{name} {lastname}
					</p>
					<p>
						<span>✉️</span>
						{email}
					</p>
					<p>
						<span>📞</span>
						{phone}
					</p>
					<div className={styles.actions}>
						<button onClick={() => startEditHandler({ id, name, lastname, email, phone })}>✏️</button>
						<button onClick={() => deleteHandler(id)}>🗑️</button>
					</div>
				</>
			)}
		</li>
	);
}

export default Contactitem;
