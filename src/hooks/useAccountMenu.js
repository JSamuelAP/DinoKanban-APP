import { useEffect, useState } from "react";

const useAccountMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		return () => {
			handleClose();
		};
	}, []);

	return [anchorEl, handleClick, handleClose];
};

export default useAccountMenu;
