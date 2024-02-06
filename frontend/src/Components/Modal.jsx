import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { TextField } from "@mui/material";
import { Button } from "@mui/base";

export default function ModalUnstyled(props) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: props.user?.fullname || "",
    email: props.user?.email || "",
    phone: props.user?.phone || "",
    batch: props.user?.batch || "",
    domain: props.user?.domain || "",
  });
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    if (props) {
      setOpen(true);
    }
  }, [props]);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(formData, "fm");
      //   await axios.put(`http://localhost:3000/updateUser/${props.user._id}`, formData);
      props.onCloseModal();
    } catch (error) {
      console.error("Error updating student information:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
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
            Add Student
          </h2>
          <form onSubmit={handleFormSubmit}>
            <TextField
              id="name"
              label="Name"
              value={formData.name}
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              onChange={handleInputChange}
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
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Submit
            </Button>
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

// Define the rest of your styled components (TriggerButton)...
