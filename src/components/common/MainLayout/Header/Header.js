import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled/macro";
import { AppBar, Box, Button, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import FlexContainer from "../../FlexContainer";
import Link from "@mui/material/Link";
import useLogout from "../../../../hooks/useLogout";
import { currentUserState } from "../../../../atoms/auth";
import { useRecoilValue } from "recoil";
import { cyan, green, grey, purple, red, yellow } from "@mui/material/colors";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();
  const user = useRecoilValue(currentUserState);
  const menuItems = useMemo(() =>
    user.admin
      ? [
          { name: "Главная", path: "/" },
          { name: "Проекты", path: "/projects" },
          { name: "Города", path: "/cities" },
          { name: "Клиенты", path: "/clients" },
          { name: "Пользователи", path: "/users" },
          { name: "Отчеты", path: "/reports" },
        ]
      : [
          { name: "Главная", path: "/" },
          { name: "Мои проекты", path: "/userProjects" },
          { name: "Отчеты", path: "/reports" },
        ]
  );

  return (
    <AppBar sx={{ backgroundColor: "#8FBC8F" }}>
      <FlexContainer>
        <MenuWrapper fullHeight xs={{ height: "100%" }}>
          <MenuItemsWrapper>
            {menuItems.map(({ name, path }, index) => (
              <MenuItem key={index}>
                <Box>
                  {location.pathname === path ? (
                    <ActiveMenuButton
                      onClick={() => {
                        navigate(path);
                      }}
                    >
                      {name}
                    </ActiveMenuButton>
                  ) : (
                    <MenuButton
                      xs={{ color: grey[900] }}
                      onClick={() => {
                        navigate(path);
                      }}
                    >
                      {name}
                    </MenuButton>
                  )}
                </Box>
              </MenuItem>
            ))}
          </MenuItemsWrapper>
          <MenuActions>
            <MenuItem>
              <Typography style={{ color: grey[900], fontWeight: "bold" }}>
                {user.username}
              </Typography>
            </MenuItem>
            <MenuItem>
              <Button
                variant="outlined"
                color="primary"
                sx={{ color: purple[900] }}
                onClick={logout}
              >
                Выход
              </Button>
            </MenuItem>
          </MenuActions>
        </MenuWrapper>
      </FlexContainer>
    </AppBar>
  );
};

const MenuButton = styled(Link)`
  color: #000000;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
`;

const ActiveMenuButton = styled(Link)`
  color: #fffacd;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
`;

const MenuWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const MenuItem = styled(Box)`
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItemsWrapper = styled(Box)`
  display: flex;
  height: 100%;
`;

const MenuActions = styled(Box)`
  display: flex;
`;

export default Header;
