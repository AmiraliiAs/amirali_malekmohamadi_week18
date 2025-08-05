import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchSchema } from "../utils/validationSchemas";
import FormInput from "./FormInput";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch, placeholder = "جستجو در مخاطبین..." }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(searchSchema),
		defaultValues: { search: "" },
	});

	const searchValue = watch("search");

	React.useEffect(() => {
		onSearch(searchValue);
	}, [searchValue]);

	return (
		<div className={styles.searchContainer}>
			<FormInput
				name="search"
				type="text"
				placeholder={placeholder}
				register={register}
				error={errors.search}
				className={styles.searchInput}
			/>
		</div>
	);
};

export default SearchBar;
