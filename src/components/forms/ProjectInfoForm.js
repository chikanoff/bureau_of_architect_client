import React from "react";
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import styled from "@emotion/styled";

const ProjectInfoForm = ({ data }) => {
  console.log(data);
  return (
    <Grid item xs={12} md={6}>
      <List>
        <ListItem divider>
          <BoldTypography>Название</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.name} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Тип</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.type.name} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Город</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.city.name} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Клиент</BoldTypography>
          <ListItemText
            sx={{ ml: 2 }}
            primary={data.client.fullName}
            secondary={data.client.organization}
          />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Дата</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.date} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Заметки</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.notes} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Адрес</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.address} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Активен</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.active ? "Да" : "Нет"} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Ссылка</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.projectUrl} />
        </ListItem>
        <BoldTypography sx={{ marginTop: 2 }} align="center">
          Работники
        </BoldTypography>
        {data.users.map((user) => (
          <ListItem divider key={user.id}>
            <ListItemText
              sx={{ ml: 2 }}
              primary={user.fullName}
              secondary={user.email}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

const BoldTypography = styled(Typography)`
  font-weight: bold;
  font-size: 1rem;
`;

export default ProjectInfoForm;
