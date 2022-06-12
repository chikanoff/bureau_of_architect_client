import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MainLayout from "../common/MainLayout";
import styled from "@emotion/styled/macro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Button, TextField } from "@mui/material";
import projectsResource from "../../helpers/api/projects";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Page from "../common/Page";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../atoms/auth";

const ReportsPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const currentUser = useRecoilValue(currentUserState);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    console.log(startDate);
  };
  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const generateReport = async () => {
    if (!startDate || !endDate) {
      alert("Выберите даты");
    } else {
      if (startDate >= endDate) {
        alert("Начальная дата должна быть меньше конечной");
      } else {
        let data;
        if (!currentUser.admin) {
          const res = await projectsResource.getByDates(startDate, endDate);
          data = res.filter((x) =>
            x.users.map((y) => y.id).includes(currentUser.id)
          );
        } else {
          data = await projectsResource.getByDates(startDate, endDate);
        }
        if (!data) {
          alert("Нет данных по выбранной дате");
        } else {
          const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          const fileExtension = ".xlsx";
          const newData = data.map((item) => {
            return {
              ...item,
              type: item.type.name,
              city: item.city.name,
              client: item.client.fullName,
              active: item.active ? "Да" : "Нет",
              users: item.users.map((user) => user.fullName).join(", "),
            };
          });
          const ws = XLSX.utils.json_to_sheet(newData);
          const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
          const excelBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
          });
          const dt = new Blob([excelBuffer], { type: fileType });
          FileSaver.saveAs(
            dt,
            `Отчет_${
              startDate.getDay() + 1
            }-${startDate.getMonth()}-${startDate.getFullYear()}_${
              endDate.getDay() + 1
            }-${endDate.getMonth()}-${endDate.getFullYear()}` + fileExtension
          );
        }
      }
    }
  };
  return (
    <Page title="Отчеты">
      <MainLayout>
        <MainBox>
          <Typography>Страница Отчетов</Typography>
          <Typography>
            Для генерации отчета выберите дату начала, дату окончания и нажмите
            на кнопку сгенерировать отчет.
          </Typography>
          <Box
            style={{
              marginTop: "40px",
              width: "60%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Дата начала"
                inputFormat="dd/MM/yyyy"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Дата окончания"
                inputFormat="dd/MM/yyyy"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Button
            style={{ marginTop: "40px" }}
            onClick={() => generateReport()}
            variant="outlined"
          >
            Сгенерировать
          </Button>
        </MainBox>
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

export default ReportsPage;
