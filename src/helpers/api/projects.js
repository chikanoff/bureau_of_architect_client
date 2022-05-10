import FetchAPI from "./FetchAPI";

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/admin/project/all`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getByDates = async (startDate, endDate) => {
  try {
    const res = await FetchAPI.get(`/admin/project/byDates`, {
      params: { startDate: startDate, endDate: endDate },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteById = async (id) => {
  try {
    const res = await FetchAPI.delete(`/admin/project/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const create = async (data) => {
  try {
    const res = await FetchAPI.post(`/admin/project`, data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const update = async (id, data) => {
  try {
    const res = await FetchAPI.put(`/admin/project/${id}`, data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const changeActive = async (id, data) => {
  try {
    const res = await FetchAPI.patch(`/admin/project/${id}`, data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const assigneeUser = async (id, data) => {
  try {
    const res = await FetchAPI.post(`/admin/project/${id}/assignation`, data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

const projectsResource = {
  getAll,
  deleteById,
  create,
  update,
  changeActive,
  assigneeUser,
  getByDates,
};

export default projectsResource;
