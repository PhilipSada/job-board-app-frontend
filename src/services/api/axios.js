import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_POINT,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common['Authorization'];
    }
};


export const getData = async (endpoint, requiresAuth = true) => {
    try {
      if (requiresAuth) {
        setAuthHeaders();
      }
  
      const response = await instance.get(endpoint);
  
      if (requiresAuth) {
        setAuthHeaders();
      }
  
      return response.data;
    } catch (error) {
      console.error('Error making GET request:', error);
      throw error;
    }
};


export const postData = async (endpoint, data, requiresAuth = true) => {
    try {
      if (requiresAuth) {
        setAuthHeaders();
      }
  
      const response = await instance.post(endpoint, data);
  
      if (requiresAuth) {
        setAuthHeaders();
      }
  
      return response.data;
    } catch (error) {
    
      console.error('Error making POST request:', error);
      throw error;
    }
};

export const putData = async (endpoint, data) => {
    try {
      setAuthHeaders();
  
      const response = await instance.put(endpoint, data);
  
      setAuthHeaders();
  
      return response.data;
    } catch (error) {
      console.error('Error making PUT request:', error);
      throw error;
    }
};

export const patchData = async (endpoint, data) => {
    try {
      setAuthHeaders();
  
      const response = await instance.patch(endpoint, data);
  
      setAuthHeaders();
  
      return response.data;
    } catch (error) {
      console.error('Error making PATCH request:', error);
      throw error;
    }
};
export const deleteData = async (endpoint, config={}) => {
    try {
      setAuthHeaders();
  
      const response = await instance.delete(endpoint, config);
  
      setAuthHeaders();
  
      return response.data;
    } catch (error) {
      console.error('Error making Delete request:', error);
      throw error;
    }
};
  

export default instance;