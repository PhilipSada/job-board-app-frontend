import axios from './axios';
import { setAuthHeaders } from './axios';

export const SERVER_POINT = import.meta.env.VITE_SERVER_POINT


export const getHeadersConfig = ()=>{
    let token= localStorage.getItem('token');
    let headersConfig;

    headersConfig = {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }

    return headersConfig;
}

export const fetchDataWithBearerToken = async (endpoint, token) => {
    try {
      const token= localStorage.getItem('token');
      // Set authorization headers
      setAuthHeaders(token);
  
      // Make the request
      const response = await axios.get(endpoint);
  
      // Reset authorization headers for subsequent requests
      setAuthHeaders(null);
  
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data with Bearer token:', error);
      throw error;
    }
  };

  export const fetchDataWithoutBearerToken = async (endpoint) => {
    try {
      // Make the request without setting additional headers
      const response = await axios.get(endpoint);
  
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data without Bearer token:', error);
      throw error;
    }
  };
  
  export const postDataWithBearerToken = async (endpoint, data, token) => {
    try {
      // Set authorization headers
      setAuthHeaders(token);
  
      // Make the POST request
      const response = await axios.post(endpoint, data);
  
      // Reset authorization headers for subsequent requests
      setAuthHeaders(null);
  
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('Error posting data with Bearer token:', error);
      throw error;
    }
  };


export const getApi = async (url)=>{
    let data;
    try {
        const response = await axios.get(url, getHeadersConfig());
        data = response.data;
   
    } catch (err) {
        
        return false;
    }

    return data;
}
export const postApi = async (url, body)=>{
    let data;
    try {
        const response = await axios.post(url, body, getHeadersConfig());
        data = response.data;
   
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return { 
                success: false,
                data: err.response
            };
        }    
    }

    // if(data.status === "422"){
    //     return { 
    //         success: false,
    //         data: data.response
    //     };
    // }

    return { 
        success: true,
        data: data
    };
}
export const putApi = async (url, body)=>{
    let data;
    try {
        const response = await axios.put(url, body, getHeadersConfig());
        data = response.data;
   
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return { 
                success: false,
                data: err.response
            };
        }    
    }

    return { 
        success: true,
        data: data
    };
}
export const deleteApi = async (url)=>{
    let data;
    try {
        const response = await axios.delete(url, getHeadersConfig());
        data = response.data;
   
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return { 
                success: false,
                data: err.response
            };
        }    
    }

    return { 
        success: true,
        data: data
    };
}