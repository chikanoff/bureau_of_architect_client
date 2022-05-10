import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import typesResource from "../../helpers/api/types";
import clientsResource from "../../helpers/api/clients";
import citiesResource from "../../helpers/api/cities";

const CreateProjectForm = ({ data, onSubmit }) => {
  const [types, setTypes] = useState([]);
  const [clients, setClients] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await typesResource.getAll();
      setTypes(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await clientsResource.getAll();
      setClients(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await citiesResource.getAll();
      setCities(res);
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit ? onSubmit(data) : console.log(data)
      )}
    >
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          style={{ width: "100%" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          pb={2}
        >
          <Box
            style={{ width: "100%" }}
            display="flex"
            flexDirection="column"
            alignContent="center"
            pb={2}
          >
            <TextField
              {...register("name", {
                required: true,
                minLength: 4,
                maxLength: 128,
              })}
              error={!!errors.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Название"
              name="name"
              autoFocus
            />
            <FormControl margin="normal" fullWidth required>
              <InputLabel>Тип проекта</InputLabel>
              <Select
                label="Тип проекта"
                {...register("typeId", {
                  required: true,
                  min: 1,
                })}
                defaultValue={data.type.id}
              >
                {types.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth required>
              <InputLabel>Город</InputLabel>
              <Select
                label="Город"
                {...register("cityId", {
                  required: true,
                  min: 1,
                })}
                defaultValue={data.city.id}
              >
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth required>
              <InputLabel>Клиент</InputLabel>
              <Select
                label="Клиент"
                {...register("clientId", {
                  required: true,
                  min: 1,
                })}
                defaultValue={data.client.id}
              >
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              {...register("notes", {
                required: true,
                min: 1,
              })}
              error={!!errors.notes}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="notes"
              label="Заметки"
              name="notes"
              autoFocus
            />
            <TextField
              {...register("address", {
                required: true,
                minLength: 4,
              })}
              error={!!errors.address}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Адрес"
              name="address"
              autoFocus
            />
            <TextField
              {...register("projectUrl", {
                required: true,
                minLength: 1,
              })}
              error={!!errors.projectUrl}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="projectUrl"
              label="Ссылка на проект"
              name="projectUrl"
              autoFocus
            />
          </Box>

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            style={{ width: "100%" }}
          >
            submit
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default CreateProjectForm;
