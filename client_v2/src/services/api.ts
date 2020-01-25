import axios from 'axios';

const host = 'http://localhost:5000';

const request = async (resource: string, data?: {}, config: any = {}) => {
  const method = config.method || 'get';
  const url = `${host}/${resource}`;
  const customConfig = { ...config };

  const response = await axios({
    url,
    data,
    method,
    ...customConfig,
  });

  return response;
};

export const getProfileData = async (id: string) => {
  const response = await request(`api/users/${id}`);
  return response.data;
};