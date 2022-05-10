import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "../common/MainLayout";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../common/Page";
import clientsResource from "../../helpers/api/clients";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import UserForm from "../forms/UserForm";
import Popup from "../controls/Popup";
import { blue, deepOrange, orange, red } from "@mui/material/colors";
import ClientForm from "../forms/ClientForm";

const initialValues = {
  id: 0,
  fullName: "",
  email: "",
  phone: "",
  organization: "",
};

const ClientPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(initialValues);

  const deleteRecord = useCallback(async (deleteId) => {
    await clientsResource.deleteById(deleteId);
    const res = await clientsResource.getAll();
    setRecords(res);
  }, []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "#", width: 100 },
      { field: "fullName", headerName: "ФИО", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "phone", headerName: "Телефон", flex: 1 },
      { field: "organization", headerName: "Организация", flex: 1 },
      {
        field: "action",
        headerName: "Действия",
        flex: 1,
        sortable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              onClick={() => {
                console.log(params.row);
                setRecordForEdit(params.row);
                setOpenPopup(true);
              }}
            >
              <EditIcon sx={{ color: orange[500] }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                deleteRecord(params.row.id);
              }}
            >
              <DeleteForeverIcon sx={{ color: red[500] }} />
            </IconButton>
          </Stack>
        ),
      },
    ],
    []
  );

  const addOrEdit = useCallback(async (data) => {
    let res;
    if (data.id !== 0) {
      res = await clientsResource.update(data.id, data);
    } else {
      res = await clientsResource.create(data);
    }
    if (res.status === 409) {
      alert(res.data.message);
    } else {
      setOpenPopup(false);
      setRecordForEdit(initialValues);
      const res = await clientsResource.getAll();
      setRecords(res);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await clientsResource.getAll();
      setRecords(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Пользователи">
      <MainLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
          }}
        >
          <Button
            variant="contained"
            color="action"
            sx={{ marginBottom: "1rem" }}
            onClick={() => {
              setRecordForEdit(initialValues);
              setOpenPopup(true);
            }}
          >
            <Typography sx={{ fontSize: "13px", color: blue[500] }}>
              Создать
            </Typography>
          </Button>
        </Box>
        <Box height="100%">
          <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            autoHeight
            disableSelectionOnClick
            rows={records}
            columns={columns}
          />
        </Box>
        <Popup title="Клиент" openPopup={openPopup} setOpenPopup={setOpenPopup}>
          {openPopup && (
            <ClientForm data={recordForEdit} onSubmit={addOrEdit} />
          )}
        </Popup>
      </MainLayout>
    </Page>
  );
};

const MainBox = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export default ClientPage;
