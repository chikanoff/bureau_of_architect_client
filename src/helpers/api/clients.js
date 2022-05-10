import FetchAPI from "./FetchAPI";

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/admin/client/all`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteById = async (id) => {
  try {
    const res = await FetchAPI.delete(`/admin/client/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const create = async (data) => {
  try {
    const res = await FetchAPI.post(`/admin/client`, data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const update = async (id, data) => {
  try {
    const res = await FetchAPI.put(`/admin/client/${id}`, data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

const clientsResource = {
  getAll,
  deleteById,
  create,
  update,
};

export default clientsResource;
