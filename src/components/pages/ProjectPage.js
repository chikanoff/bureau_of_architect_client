import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "../common/MainLayout";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../common/Page";
import projectsResource from "../../helpers/api/projects";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Stack, Typography } from "@mui/material";
import Popup from "../controls/Popup";
import { blue, green, grey, orange, red } from "@mui/material/colors";
import CreateProjectForm from "../forms/CreateProjectForm";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DoneIcon from "@mui/icons-material/Done";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import AssigneeUserForm from "../forms/AssigneeUserForm";
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

const ProjectPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(initialValues);
  const [infoPopup, setInfoPopup] = useState(false);
  const [recordForInfo, setRecordForInfo] = useState(initialValues);
  const [addUserPopup, setAddUserPopup] = useState(false);
  const [rowToAssignee, setRowToAssignee] = useState(null);

  const deleteRecord = useCallback(async (deleteId) => {
    await projectsResource.deleteById(deleteId);
    const res = await projectsResource.getAll();
    setRecords(res);
  }, []);

  const changeActive = useCallback(async (data) => {
    await projectsResource.changeActive(data.id, { active: !data.active });
    const res = await projectsResource.getAll();
    setRecords(res);
  }, []);

  const assigneeUser = useCallback(async (data) => {
    await projectsResource.assigneeUser(data.id, { userId: data.userId });
    const res = await projectsResource.getAll();
    setRecords(res);
    setAddUserPopup(false);
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
                console.log(params.row);
                setRecordForEdit(params.row);
                setOpenPopup(true);
              }}
            >
              <EditIcon sx={{ color: orange[500] }} />
            </IconButton>
            {params.row.active && (
              <IconButton
                size="small"
                onClick={() => {
                  setRowToAssignee(params.row);
                  setAddUserPopup(true);
                }}
              >
                <PersonAddAltIcon sx={{ color: green[900] }} />
              </IconButton>
            )}

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
    console.log(data);
    if (data.id !== 0) {
      res = await projectsResource.update(data.id, data);
    } else {
      res = await projectsResource.create(data);
    }
    if (res.status === 409) {
      alert(res.data.message);
    } else {
      setOpenPopup(false);
      setRecordForEdit(initialValues);
      const res = await projectsResource.getAll();
      setRecords(res);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await projectsResource.getAll();
      console.log(res);
      setRecords(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Проекты">
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
        <Popup title="Проект" openPopup={openPopup} setOpenPopup={setOpenPopup}>
          {openPopup && (
            <CreateProjectForm data={recordForEdit} onSubmit={addOrEdit} />
          )}
        </Popup>

        <Popup
          title="Добавить пользователя"
          openPopup={addUserPopup}
          setOpenPopup={setAddUserPopup}
        >
          {addUserPopup && (
            <AssigneeUserForm data={rowToAssignee} onSubmit={assigneeUser} />
          )}
        </Popup>
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

const MainBox = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export default ProjectPage;
