import React from "react";
import styles from "./FormInput.module.css";

const FormInput = ({ label, name, type = "text", placeholder, register, error, ...props }) => {
	return (
		<div className={styles.inputContainer}>
			{label && <label className={styles.label}>{label}</label>}
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				className={`${styles.input} ${error ? styles.error : ""}`}
				{...register(name)}
				{...props}
			/>
			{error && <span className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
};

export default FormInput;
