import FetchAPI from "./FetchAPI";

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/admin/type/all`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const typesResource = {
  getAll,
};

export default typesResource;
