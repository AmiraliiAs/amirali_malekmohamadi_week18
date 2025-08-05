import * as yup from "yup";

export const contactSchema = yup.object({
	name: yup
		.string()
		.required("نام الزامی است")
		.min(2, "نام باید حداقل 2 کاراکتر باشد")
		.max(50, "نام نمی‌تواند بیشتر از 50 کاراکتر باشد"),
	lastname: yup
		.string()
		.required("نام خانوادگی الزامی است")
		.min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد")
		.max(50, "نام خانوادگی نمی‌تواند بیشتر از 50 کاراکتر باشد"),
	email: yup.string().required("ایمیل الزامی است").email("فرمت ایمیل صحیح نیست"),
	phone: yup
		.string()
		.required("شماره تلفن الزامی است")
		.matches(/^[0-9]{11}$/, "شماره تلفن باید 11 رقم باشد")
		.matches(/^09/, "شماره تلفن باید با 09 شروع شود"),
});

export const searchSchema = yup.object({
	search: yup.string().max(100, "جستجو نمی‌تواند بیشتر از 100 کاراکتر باشد"),
});
