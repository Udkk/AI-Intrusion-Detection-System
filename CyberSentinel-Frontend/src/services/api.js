import axios from "axios";

const api = axios.create({
  baseURL: "https://cybersentinel-backend-tbq5.onrender.com",
});

export const uploadDataset = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/predict-file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};