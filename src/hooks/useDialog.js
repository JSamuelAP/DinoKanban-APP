import { useState } from "react";

const useDialog = (onClose = () => {}) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		onClose();
		setOpen(false);
	};

	return [open, handleOpen, handleClose];
};

export default useDialog;
