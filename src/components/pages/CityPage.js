import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "../common/MainLayout";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../common/Page";
import citiesResource from "../../helpers/api/cities";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import CityForm from "../forms/CityForm";
import Popup from "../controls/Popup";
import { blue, cyan, orange, red } from "@mui/material/colors";

const initialValues = {
  id: 0,
  name: "",
};

const CityPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(initialValues);

  const deleteRecord = useCallback(
    async (deleteId) => {
      await citiesResource.deleteById(deleteId);
      setRecords(records.filter(({ id }) => id !== deleteId));
    },
    [records]
  );

  const citiesColumns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "name", headerName: "Название", flex: 1 },
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
  ];

  const addOrEdit = useCallback(async (data) => {
    if (data.id !== 0) {
      await citiesResource.update(data.id, data);
    } else {
      await citiesResource.create(data);
    }
    setOpenPopup(false);
    setRecordForEdit(initialValues);
    const res = await citiesResource.getAll();
    setRecords(res);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await citiesResource.getAll();
      setRecords(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Города">
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
            columns={citiesColumns}
          />
        </Box>
        <Popup title="Город" openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <CityForm data={recordForEdit} onSubmit={addOrEdit} />
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

export default CityPage;
