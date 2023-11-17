import React, { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DataContext } from "../../../context/DataProvider";

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

const EditAddressModal = ({ address }) => {
    const [updatedAddress, setUpdatedAddress] = useState(address);

    const { addresses, dispatch } = useContext(DataContext);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // useEffect(() => {
    //     console.log("updatedAddress", updatedAddress);
    // }, [updatedAddress]);

    const condition =
        updatedAddress.address_line_1 === "" ||
        updatedAddress.address_line_2 === "" ||
        updatedAddress.city === "" ||
        updatedAddress.state === "" ||
        updatedAddress.pincode === "";

    const handleSubmit = () => {
        if (condition) {
            alert("Kindly please fill in all the details");
        } else {
            const newEditedAddresses = addresses.map((address) =>
                address.id === updatedAddress.id
                    ? { ...updatedAddress }
                    : { ...address }
            );

            // console.log("newEditedAddresses", newEditedAddresses);

            dispatch({
                type: "EDIT_ADDRESS",
                payload: newEditedAddresses,
            });
            handleClose();
        }
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleOpen}
            >
                Edit Address
            </Button>
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
                                value={updatedAddress.address_line_1}
                                onChange={(e) =>
                                    setUpdatedAddress((prev) => ({
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
                                value={updatedAddress.address_line_2}
                                onChange={(e) =>
                                    setUpdatedAddress((prev) => ({
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
                                value={updatedAddress.city}
                                onChange={(e) =>
                                    setUpdatedAddress((prev) => ({
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
                                value={updatedAddress.state}
                                onChange={(e) =>
                                    setUpdatedAddress((prev) => ({
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
                                value={updatedAddress.pincode}
                                onChange={(e) =>
                                    setUpdatedAddress((prev) => ({
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

export default EditAddressModal;
