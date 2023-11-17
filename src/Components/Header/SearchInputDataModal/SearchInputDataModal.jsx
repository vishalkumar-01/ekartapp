import React, { useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataContext } from "../../../context/DataProvider";

const style = {
    width: "100%",
    backgroundColor: "#fff",
    textAlign: "start",
    position: "absolute",

    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // width: 400,
    // bgcolor: "background.paper",
    // border: "2px solid #000",
    // boxShadow: 24,
    // p: 4,
};

const SearchInputDataModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { dispatch, inputSearchedProducts, filters } =
        useContext(DataContext);

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}

            <input
                type="text"
                className="search__input"
                placeholder="search"
                value={filters.search}
                onClick={handleOpen}
                onChange={(e) => {
                    dispatch({
                        type: "handleSearchInput",
                        payload: e.target.value,
                    });
                }}
                // onMouseDown={() => setFlag((prev) => !prev)}
                // onMouse={() =>
                //     setTimeout(() => {
                //         setFlag((prev) => !prev);
                //     }, 0)
                // }
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default SearchInputDataModal;
