import axiosInstance from "./axiosInstance";

export const addTask = async ({
  title, description
}) => {
  try {
    const response = await axiosInstance.post("task/create/v1", {
      title, description
    });

    return response.data;
  } catch (error) {
    console.error("Error in addTask API request:", error);
    throw error;
  }
};

export const listTask= async ({ taskStatus, search = "", limit = 10, page = 1 }) => {
  try {
    const response = await axiosInstance.get("task/list/v1", {
      params: {
        taskStatus,
        search,
        limit,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in listTask API request:", error);
    throw error;
  }
};

export const updateTask = async ({ id, title, description, taskStatus }) => {
  try {
    const response = await axiosInstance.put("task/update/v1", {
      id,
      title,
      description,
      taskStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateTask API request:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axiosInstance.delete(`task/delete/${id}/v1`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteTask API request:", error);
    throw error;
  }
};