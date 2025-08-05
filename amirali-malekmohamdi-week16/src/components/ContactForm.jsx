import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../utils/validationSchemas";
import FormInput from "./FormInput";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./ContactForm.module.css";

const ContactForm = ({ onSubmit, initialData = {}, submitText = "Add Contact" }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		resolver: yupResolver(contactSchema),
		defaultValues: initialData,
	});

	const handleFormSubmit = async (data) => {
		try {
			await onSubmit(data);
			reset();
		} catch (error) {
			console.error("Form submission error:", error);
		}
	};

	const formFields = [
		{ name: "name", type: "text", placeholder: "نام", label: "نام" },
		{ name: "lastname", type: "text", placeholder: "نام خانوادگی", label: "نام خانوادگی" },
		{ name: "email", type: "email", placeholder: "ایمیل", label: "ایمیل" },
		{ name: "phone", type: "tel", placeholder: "شماره تلفن", label: "شماره تلفن" },
	];

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
			<div className={styles.formGrid}>
				{formFields.map((field) => (
					<FormInput
						key={field.name}
						name={field.name}
						type={field.type}
						placeholder={field.placeholder}
						label={field.label}
						register={register}
						error={errors[field.name]}
					/>
				))}
			</div>
			<button type="submit" disabled={isSubmitting} className={styles.submitButton}>
				{isSubmitting ? (
					<>
						<LoadingSpinner size="small" />
						<span>در حال پردازش...</span>
					</>
				) : (
					submitText
				)}
			</button>
		</form>
	);
};

export default ContactForm;
