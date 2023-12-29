import { useState } from "react";

const useDrawer = () => {
	const [open, setOpen] = useState(false);

	const handleToggle = () => {
		setOpen((prevState) => !prevState);
	};

	return [open, handleToggle];
};

export default useDrawer;
