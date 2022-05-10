import FetchAPI from "./FetchAPI";

export const getUserInfo = async () => {
  try {
    const res = await FetchAPI.get(`/user`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const changePassword = async (data) => {
  try {
    const res = await FetchAPI.patch(`/user`, data);
    return res.data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const changeActive = async (id, data) => {
  try {
    const res = await FetchAPI.patch(`/user/project/${id}`, data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const getUserProjects = async () => {
  try {
    const res = await FetchAPI.get(`/user/projects`);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

const currentUsersResource = {
  getUserProjects,
  changePassword,
  getUserInfo,
  changeActive,
};

export default currentUsersResource;
