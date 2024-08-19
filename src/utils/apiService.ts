import axios from "axios";
const apiUrl = import.meta.env.VITE_API_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_API_KEY;

const StringapiUrl = apiUrl.toString();
const StringapiKey = apiKey.toString();
axios.defaults.withCredentials = true;

// ADMIN LOGIN
export const adminLogin = async (data: object) => {
  try {
    const response = await axios.post(`${StringapiUrl}auth/sign_in`, data, {
      headers: {
        "x-api-key": `${StringapiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout
export const log_out = async (userId: string) => {
  const data = {};
  try {
    const response = await axios.post(
      `${StringapiUrl}auth/logout/${userId}`,
      data,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgot_pass = async (data: object) => {
  try {
    const response = await axios.post(
      `${StringapiUrl}auth/forgot_password`,
      data,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verify_otp_fr = async (data: object) => {
  try {
    const response = await axios.post(
      `${StringapiUrl}auth/verify_forgot_otp`,
      data,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const new_password = async (data: object) => {
  try {
    const response = await axios.post(
      `${StringapiUrl}auth/new_password`,
      data,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const new_user = async (data: object) => {
  try {
    const response = await axios.post(`${StringapiUrl}auth/register`, data, {
      headers: {
        "x-api-key": `${StringapiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const new_operator = async (data: object) => {
  try {
    const response = await axios.post(`${StringapiUrl}auth/register`, data, {
      headers: {
        "x-api-key": `${StringapiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verify_otp = async (data: object) => {
  try {
    const response = await axios.post(`${StringapiUrl}auth/verify_otp`, data, {
      headers: {
        "x-api-key": `${StringapiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const new_staff = async (data: object) => {
  try {
    const response = await axios.post(
      `${StringapiUrl}staff/add_new_staff`,
      data,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const edit_staff = async (data: object, staffId: string) => {
  try {
    const response = await axios.put(
      `${StringapiUrl}staff/edit_staff/${staffId}`,
      data,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const edit_user = async (data: object, userId: string) => {
  try {
    const response = await axios.put(
      `${StringapiUrl}auth/edit_user/${userId}`,
      data,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const edit_event = async (data: object, eventId: string) => {
  try {
    const response = await axios.put(
      `${StringapiUrl}event/edit_event/${eventId}`,
      data,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all staff
export const all_staff = async () => {
  try {
    const response = await axios.get(`${StringapiUrl}staff/get_staffs`, {
      headers: {
        "x-api-key": `${StringapiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all User
export const all_operators = async () => {
  try {
    const response = await axios.get(`${StringapiUrl}auth/get_all_users`, {
      headers: {
        "x-api-key": `${StringapiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get event
export const get_an_event = async (eventId: string) => {
  try {
    const response = await axios.get(
      `${StringapiUrl}event/get_event/${eventId}`,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const get_staff = async (staffId: string | boolean | undefined) => {
  try {
    const response = await axios.get(
      `${StringapiUrl}staff/get_a_staff/${staffId}`,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const get_user = async (userId: string | boolean | undefined) => {
  try {
    const response = await axios.get(
      `${StringapiUrl}auth/get_a_user/${userId}`,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete staff
export const delete_staff = async (staffId: string | boolean | undefined) => {
  try {
    const response = await axios.delete(
      `${StringapiUrl}staff/delete_staff/${staffId}`,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete staff
export const delete_user = async (userId: string | boolean | undefined) => {
  try {
    const response = await axios.put(
      `${StringapiUrl}auth/delete_user/${userId}`,
      {},
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// delete staff
export const activate_user = async (userId: string | boolean | undefined) => {
  try {
    const response = await axios.put(
      `${StringapiUrl}auth/activate_user/${userId}`,
      {},
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete event
export const delete_event = async (eventId: string | boolean | undefined) => {
  try {
    const response = await axios.delete(
      `${StringapiUrl}event/delete_event/${eventId}`,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// create event
export const new_event = async (data: object, userId: string) => {
  try {
    const response = await axios.post(
      `${StringapiUrl}event/create/${userId}`,
      data,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all event
export const get_all_event = async () => {
  try {
    const response = await axios.get(`${StringapiUrl}event/get_all_event`, {
      headers: {
        "x-api-key": `${StringapiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all Blog
export const get_blogs = async () => {
  try {
    const response = await axios.get(`${StringapiUrl}blog/get_blogs`, {
      headers: {
        "x-api-key": `${StringapiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get a single Blog
export const get_a_blog = async (blogId: string | undefined) => {
  try {
    const response = await axios.get(`${StringapiUrl}blog/get_blog/${blogId}`, {
      headers: {
        "x-api-key": `${StringapiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get a single Blog
export const create_a_blog = async (data: object) => {
  try {
    const response = await axios.post(`${StringapiUrl}blog/new_blog`, data, {
      headers: {
        "x-api-key": `${StringapiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get a single Blog
export const del_a_blog = async (blogId: string) => {
  try {
    const response = await axios.delete(
      `${StringapiUrl}blog/del_blog/${blogId}`,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// upload calendar PDF
export const upload_pdf = async (data: object) => {
  try {
    const response = await axios.post(`${StringapiUrl}event/upload_pdf`, data, {
      headers: {
        "x-api-key": `${StringapiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// upload calendar PDF
export const get_pdf = async (fileName: string) => {
  try {
    const response = await axios.get(
      `${StringapiUrl}event/check_pdf/${fileName}`,
      {
        headers: {
          "x-api-key": `${StringapiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
