import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./Components/Form";
import Users from "./Components/importUser";
import axios from "axios";
import { refreshContext } from "../src/context";
import { toast } from "react-toastify";
import ModalUnstyled from "./Components/Modal";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function Routers() {
  const [students, setStudents] = useState([]);
  const { refresh, setRefresh } = refreshContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    async function call() {
      try {
        let fetchData = await axios.get("https://www.broto.dreamhome.cloud/displayUser");
        setStudents(fetchData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    call();
  }, [refresh]);

  const handleDeleteRow = (id) => {
    setConfirmationDialogOpen(true);
    setDeleteId(id);
  };

  const handleConfirmationDialogClose = (confirmed) => {
    setConfirmationDialogOpen(false);
    if (confirmed) {
      performDeleteAction(deleteId);
    }
  };

  const performDeleteAction = async (id) => {
    try {
      if (students[id - 1]) {
        const studentToDelete = students[id - 1];
        console.log(studentToDelete, "is");
        await axios.delete("https://www.broto.dreamhome.cloud/deleteUser", {
          data: {
            id: studentToDelete._id,
          },
        });
        setStudents((prevStudents) => {
          const updatedStudents = prevStudents.filter(
            (student, index) => index !== id - 1
          );
          return updatedStudents;
        });
        toast.success("Student details successfully deleted");
      } else {
        console.warn("Student not found at index:", id);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleOpenModal = (id) => {
    const user = students[id - 1];
    setSelectedUser(user);
  };

  const handleModalClose = (updatedStudent) => {
    console.log("Updated Student:", updatedStudent);
    let user = students.findIndex((s) => s._id === updatedStudent.data._id);
    console.log(user, "user");

    setStudents([
      ...students.slice(0, user),
      updatedStudent.data,
      ...students.slice(user + 1),
    ]);
    toast.success("Successfully updated");
    setSelectedUser(null);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route
          path="/students"
          element={
            <Users
              students={students}
              onDeleteRow={handleDeleteRow}
              alter={handleOpenModal}
            />
          }
        />
      </Routes>
      {selectedUser && (
        <ModalUnstyled user={selectedUser} onCloseModal={handleModalClose} />
      )}
      <Dialog
        open={confirmationDialogOpen}
        onClose={() => handleConfirmationDialogClose(false)}
      >
        <DialogTitle>Want to delete this data?</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => handleConfirmationDialogClose(false)}
            color="primary"
            style={{ backgroundColor: "green", color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmationDialogClose(true)}
            color="primary"
            style={{ backgroundColor: "red", color: "white" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Routers;
