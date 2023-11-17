import { Slide, toast } from "react-toastify";

export const ReactToastify = (msg, type) => {
    const options = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
    };

    switch (type) {
        case "error":
            toast.error(msg, options);
            break;

        case "success":
            toast.success(msg, options);
            break;

        case "info":
            toast.info(msg, options);
            break;

        case "warn":
            toast.warn(msg, options);
            break;

        default:
            break;
    }
};
