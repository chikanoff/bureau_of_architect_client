import FetchAPI from "./FetchAPI";

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/admin/city/all`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteById = async (id) => {
  try {
    const res = await FetchAPI.delete(`/admin/city/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const create = async (data) => {
  try {
    const res = await FetchAPI.post(`/admin/city`, data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const update = async (id, data) => {
  try {
    const res = await FetchAPI.put(`/admin/city/${id}`, data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

const citiesResource = {
  getAll,
  deleteById,
  create,
  update,
};

export default citiesResource;
