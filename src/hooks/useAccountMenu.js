import { useState } from "react";

const useAccountMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return [anchorEl, handleClick, handleClose];
};

export default useAccountMenu;
