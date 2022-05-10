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
import usersResource from "../../helpers/api/users";

const AssigneeUserForm = ({ data, onSubmit }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await usersResource.getAll();
      const selectedUsersIds = data.users.map((i) => i.id);
      const newRes = res.filter((i) => !selectedUsersIds.includes(i.id));
      setUsers(newRes);
    };
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit ?? console.log)}>
      <Container component="main" maxWidth="xs">
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
            <FormControl margin="normal" fullWidth required>
              <InputLabel>Пользователь</InputLabel>
              <Select
                label="Пользователь"
                {...register("userId", {
                  required: true,
                  min: 1,
                })}
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button type="submit" variant="outlined">
            submit
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default AssigneeUserForm;
