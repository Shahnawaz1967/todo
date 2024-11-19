import axios from "axios";

export const exportGist = async (title, todos) => {
  try {
    const response = await axios.post("https://todo-waxj.onrender.com/api/export-gist", {
      title,
      todos,
    });
    console.log("Gist exported successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error exporting Gist:",
      error.response?.data || error.message
    );
    throw error;
  }
};
