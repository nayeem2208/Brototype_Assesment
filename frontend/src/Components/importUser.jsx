import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
// import moment from 'moment';
import { FiEdit } from "react-icons/fi";
import { grey } from "@mui/material/colors";
import { MdDeleteForever } from "react-icons/md";

const Users = (props) => {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  const columns = 
     [
      {
        field: "id",
        headerName: "ID",
        width: 70,
        headerClassName: "bold-text",
      },
      {
        field: "name",
        headerName: "Name",
        width: 190,
        headerClassName: "bold-text",
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 130,
        headerClassName: "bold-text",
      },
      {
        field: "batch",
        headerName: "Batch",
        width: 130,
        headerClassName: "bold-text",
      },
      {
        field: "domain",
        headerName: "Domain",
        width: 150,
        headerClassName: "bold-text",
      },
      {
        field: "edit",
        headerName: "Edit",
        sortable: false,
        width: 140,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              <FiEdit index={params.row.id} onClick={()=>props.alter(params.row.id)}/>
            </div>
          );
        },
      },
      {
        field: "Delete",
        headerName: "Delete",
        sortable: false,
        width: 140,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
              <MdDeleteForever
                index={params.row.id}
                className="w-5 h-5"
                onClick={() => props.onDeleteRow(params.row.id)}
              />
            </div>
          );
        }},
    ]
    
  

  const rowsWithId = props.students.map((student, index) => ({
    id: index + 1,
    name: student.fullname,
    email: student.email,
    phone: student.phone,
    batch: student.batch,
    domain: student.domain,
    // edit: <FiEdit key={`edit-${index}`} />,
    // Delete: <MdDeleteForever key={`delete-${index}`} />,
  }));

  return (
    <div style={{ height: 400, width: "90%", margin: "auto" }} className="px-8">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={rowsWithId}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.headerCell}`]: {
              bgcolor: "#000",
              color: "#fff",
              fontWeight: "bold",
            },
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? grey[600] : grey[900],
              "&:hover": {
                color: "#fff",
              },
            },
          }}
          onCellEditCommit={(params) => setRowId(params.id)}
        />
      </Box>
    </div>
  );
};

export default Users;
