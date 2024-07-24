import axios from "axios";

export const loginUser = async ( email: string, password: string) => {
    const res = await axios.post("/user/login", {email, password});
    if (res.status !== 200) {
        throw new Error("unable to login");
    }
    const data = await res.data;
    return data;
}

export const signupUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    const res = await axios.post("/user/signup", { name, email, password });
    if (res.status !== 201) {
      throw new Error("Unable to Signup");
    }
    const data = await res.data;
    return data;
};

export const checkAuthStatus = async ( ) => {
    try {
        const res = await axios.get('/user/auth-status');
        if (res.status !== 200) {
            throw new Error('Unable to authenticate');
        }
        const data = res.data;
        return data;
    } catch (error:any) {
        if (error.response && error.response.status === 401) {
            console.log('User not authenticated');
            return null;  // Return null to indicate no user is authenticated
        }
        throw error;  // Re-throw other errors
    }
}

export const sendChatRequest = async (message: string) => {
    const res = await axios.post("/chat/new", { message });
    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
};
  
export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats");
    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
};
  
export const deleteUserChats = async () => {
    const res = await axios.delete("/chat/delete");
    if (res.status !== 200) {
      throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    return data;
};
  
export const logoutUser = async () => {
  console.log("logoutUser")
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
      throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    return data;
};