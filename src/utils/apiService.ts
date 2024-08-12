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
