import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { useEffect } from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "8px",
    p: 4,
    "@media (max-width: 768px)": {
        width: 300,
    },
};

const CreateNewAddressModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { addresses, dispatch } = useContext(DataContext);

    const [newAddress, setNewAddress] = useState({
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        pincode: "",
    });

    const condition =
        newAddress.address_line_1 === "" ||
        newAddress.address_line_2 === "" ||
        newAddress.city === "" ||
        newAddress.state === "" ||
        newAddress.pincode === "";

    const handleSubmit = () => {
        if (condition) {
            alert("Kindly please fill in all the details");
        } else {
            const updatedAddresses = [
                ...addresses,
                { ...newAddress, id: addresses.length + 1 },
            ];
            dispatch({
                type: "add-new-address",
                payload: updatedAddresses,
            });
            handleClose();
        }
    };

    return (
        <div>
            <Button
                className="new_address_btn"
                variant="contained"
                color="info"
                size="small"
                onClick={handleOpen}
            >
                Add new Address
            </Button>
            <Modal
                className="new_address_modal"
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
                        Add New Address information
                    </Typography>
                    <hr />
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                        component="div"
                    >
                        <div className="form_input">
                            <label htmlFor="address1">Address Line 1:</label>
                            <TextField
                                id="filled-basic address1"
                                variant="outlined"
                                required
                                size="small"
                                value={newAddress.address_line_1}
                                onChange={(e) =>
                                    setNewAddress((prev) => ({
                                        ...prev,
                                        address_line_1: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="address2">Address Line 2:</label>
                            <TextField
                                id="filled-basic address2"
                                variant="outlined"
                                required
                                size="small"
                                value={newAddress.address_line_2}
                                onChange={(e) =>
                                    setNewAddress((prev) => ({
                                        ...prev,
                                        address_line_2: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="city">City:</label>
                            <TextField
                                id="filled-basic city"
                                variant="outlined"
                                required
                                size="small"
                                value={newAddress.city}
                                onChange={(e) =>
                                    setNewAddress((prev) => ({
                                        ...prev,
                                        city: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="state">State:</label>
                            <TextField
                                id="filled-basic state"
                                variant="outlined"
                                required
                                size="small"
                                value={newAddress.state}
                                onChange={(e) =>
                                    setNewAddress((prev) => ({
                                        ...prev,
                                        state: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="pincode">Pincode:</label>
                            <TextField
                                type="number"
                                id="filled-basic pincode"
                                variant="outlined"
                                required
                                size="small"
                                value={newAddress.pincode}
                                onChange={(e) =>
                                    setNewAddress((prev) => ({
                                        ...prev,
                                        pincode: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </Typography>
                    <Typography
                        id="modal-modal-footer"
                        sx={{ mt: 2, display: "flex", gap: "1rem" }}
                        component="div"
                    >
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Update
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateNewAddressModal;
