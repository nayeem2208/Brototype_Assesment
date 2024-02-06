import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { TextField } from "@mui/material";
import { Button } from "@mui/base";
import axios from "axios";
import { toast } from "react-toastify";

export default function ModalUnstyled(props) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullname: props.user?.fullname || "",
    email: props.user?.email || "",
    phone: props.user?.phone || "",
    batch: props.user?.batch || "",
    domain: props.user?.domain || "",
  });
  const [errors, setErrors] = React.useState({
    fullname: "",
    email: "",
    phone: "",
    batch: "",
    domain: "",
  });

  React.useEffect(() => {
    if (props.user) {
      setOpen(true);
    }
  }, [props.user]);

  const handleClose = () => {
    setOpen(false);
    props.onCloseModal();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        validationErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required.`;
      }
    });

    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone.trim())) {
      validationErrors.phone = "Phone number should be 10 digits.";
    }

    if (Object.keys(validationErrors).length > 0) {
      // If there are validation errors, update the state and return
      setErrors(validationErrors);
      return;
    }

    try {
      let updatedStudent = await axios.put(
        `http://localhost:3000/updateUser/${props.user?._id}`,
        formData
      );
      setOpen(false);
      props.onCloseModal(updatedStudent);
    } catch (error) {
      console.error("Error updating student information:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.error("Error adding user:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Clear errors for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent
          sx={{
            width: 400,
            backgroundColor: "#f3f6f9",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          <h2 id="unstyled-modal-title" className="modal-title">
            Edit Student
          </h2>
          <form onSubmit={handleFormSubmit}>
            <TextField
              id="fullname"
              label="Full Name"
              value={formData.fullname}
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              onChange={handleInputChange}
              error={Boolean(errors.fullname)}
              helperText={errors.fullname}
            />
            <TextField
              id="email"
              label="Email"
              value={formData.email}
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              onChange={handleInputChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              id="phone"
              label="Phone"
              value={formData.phone}
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              onChange={handleInputChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
            <TextField
              id="batch"
              label="Batch"
              value={formData.batch}
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              onChange={handleInputChange}
              error={Boolean(errors.batch)}
              helperText={errors.batch}
            />
            <TextField
              id="domain"
              label="Domain"
              value={formData.domain}
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              onChange={handleInputChange}
              error={Boolean(errors.domain)}
              helperText={errors.domain}
            />
            <div className="mt-4 flex justify-end">
              <button
                className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-800 group px-4 py-1" // Adjusted padding here
                type="submit"
              >
                <span className="relative z-10 text-green-800 group-hover:text-white  duration-500">
                  {" "}
                  Submit
                </span>
                <span className="absolute w-full h-full bg-green-600 -left-16 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                <span className="absolute w-full h-full bg-green-600 -right-16 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
              </button>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  // ... (your blue color definitions)
};

const grey = {
  // ... (your grey color definitions)
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
