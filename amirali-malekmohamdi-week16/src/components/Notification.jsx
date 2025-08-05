import React from "react";
import styles from "./Notification.module.css";

const Notification = ({ message, type = "info", onClose, show = false }) => {
	if (!show) return null;

	return (
		<div className={`${styles.notification} ${styles[type]}`}>
			<div className={styles.content}>
				<span className={styles.icon}>
					{type === "success" && "✅"}
					{type === "error" && "❌"}
					{type === "info" && "ℹ️"}
				</span>
				<span className={styles.message}>{message}</span>
			</div>
			{onClose && (
				<button onClick={onClose} className={styles.closeButton}>
					✕
				</button>
			)}
		</div>
	);
};

export default Notification;
