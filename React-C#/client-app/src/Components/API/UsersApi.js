import axios from "axios";

const API_URL = "http://localhost:5222/api/users";

//post request to login
export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username: data.username,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//create user
export const createUser = async (data) => {
  try {
    console.log("Userdata:", data);
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get request to get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//delete request to delete user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//patch request to update user
export const updateUser = async (id, data) => {
  try {
    console.log("id", id);
    console.log("data", data);
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
