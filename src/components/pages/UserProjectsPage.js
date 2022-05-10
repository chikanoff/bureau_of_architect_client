import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "../common/MainLayout";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../common/Page";
import currentUsersResource from "../../helpers/api/currentUsers";
import { Stack } from "@mui/material";
import Popup from "../controls/Popup";
import { grey, orange, red } from "@mui/material/colors";
import DoneIcon from "@mui/icons-material/Done";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import ProjectInfoForm from "../forms/ProjectInfoForm";

const initialValues = {
  id: 0,
  name: "",
  type: { id: 0, name: "" },
  city: { id: 0, name: "" },
  client: { id: 0, fullName: "", email: "", phone: "", organization: "" },
  date: "",
  notes: "",
  address: "",
  active: false,
  projectUrl: "",
  users: [],
};

const UserProjectsPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [infoPopup, setInfoPopup] = useState(false);
  const [recordForInfo, setRecordForInfo] = useState(initialValues);

  const changeActive = useCallback(async (data) => {
    await currentUsersResource.changeActive(data.id, { active: !data.active });
    const res = await currentUsersResource.getUserProjects();
    setRecords(res);
  }, []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "#", width: 20 },
      { field: "name", headerName: "Название", flex: 1 },
      {
        field: "client",
        headerName: "Клиент",
        flex: 1,
        renderCell: (params) => <span>{params.row.client.organization}</span>,
      },
      { field: "date", headerName: "Дата", flex: 1 },
      {
        field: "active",
        headerName: "Активен",
        width: 80,
        renderCell: (params) =>
          params.row.active ? <span>Да</span> : <span>Нет</span>,
      },
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
                setRecordForInfo(params.row);
                setInfoPopup(true);
              }}
            >
              <InfoIcon sx={{ color: grey[600] }} />
            </IconButton>
            {params.row.active ? (
              <IconButton
                size="small"
                sx={{ mr: 2 }}
                onClick={() => {
                  changeActive(params.row);
                }}
              >
                <RemoveDoneIcon sx={{ color: red[500] }} />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                onClick={() => {
                  changeActive(params.row);
                }}
              >
                <DoneIcon sx={{ color: orange[500] }} />
              </IconButton>
            )}
          </Stack>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await currentUsersResource.getUserProjects();
      console.log(res);
      setRecords(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Проекты">
      <MainLayout>
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
        <Popup
          title="Информация о проекте"
          openPopup={infoPopup}
          setOpenPopup={setInfoPopup}
        >
          {infoPopup && <ProjectInfoForm data={recordForInfo} />}
        </Popup>
      </MainLayout>
    </Page>
  );
};

export default UserProjectsPage;
