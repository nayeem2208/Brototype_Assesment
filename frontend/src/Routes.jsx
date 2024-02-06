import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./Components/Form";
import Users from "./Components/importUser";
import axios from "axios";
import { refreshContext } from "../src/context";
import { toast } from "react-toastify";
import ModalUnstyled from "./Components/Modal";

function Routers() {
  const [students, setStudents] = useState([]);
  const { refresh, setRefresh } = refreshContext();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function call() {
      try {
        let fetchData = await axios.get("http://localhost:3000/displayUser");
        setStudents(fetchData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    call();
  }, [refresh]);

  const handleDeleteRow = async (id) => {
    try {
      if (students[id - 1]) {
        const studentToDelete = students[id - 1];
        console.log(studentToDelete, "is");
        await axios.delete("http://localhost:3000/deleteUser", {
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
    console.log()
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
    </>
  );
}

export default Routers;
