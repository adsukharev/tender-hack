import axios from 'axios';

const host = 'http://localhost:5000';

const defaultConfig = {
  mode: 'no-cors',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
};

const request = async (resource: string, data?: {}, config: any = {}) => {
  const method = config.method || 'GET';
  const url = `${host}/${resource}`;
  const customConfig = { ...defaultConfig, ...config };

  const response = await axios({
    url,
    data,
    method,
    ...customConfig,
  });
  console.log(response);
  return response;
};

export const getProfileData = async (id: string) => {
  const response = await request(`api/users/${id}`);
  return response.data;
};

export const signIn = async (login: string, password: string) => {
  const response = await request(
    'api/signin',
    { login:login, password:password },
    { method: 'POST' },
  );

  return response;
};

export const logout = async () => {
  const response = await request('api/logout', {}, {method: "DELETE"});
  return response;
}

export const getPosts = async () => {
  const array = [
    {title: "Как заниматься закупками", date:"2020.01.12", description: "Сотрудники нашей компании подробно расскажут об этом сложном процессе", post_id: 1},
    {title: "Как заниматься закупками", date:"2020.01.12", description: "Сотрудники нашей компании подробно расскажут об этом сложном процессе"},
    {title: "Как заниматься закупками", date:"2020.01.12", description: "Сотрудники нашей компании подробно расскажут об этом сложном процессе"},
    {title: "Как заниматься закупками", date:"2020.01.12", description: "Сотрудники нашей компании подробно расскажут об этом сложном процессе"},
    {title: "Как заниматься закупками", date:"2020.01.12", description: "Сотрудники нашей компании подробно расскажут об этом сложном процессе"},
  ];

  const response = await request('api/posts');

  return response ? response.data : array;
}

export const getPost = async (post_id: string) => {
  const response = {
    title: "Как заниматься закупками",
    date:"2020.01.12",
    info: "Сотрудники нашей компании подробно расскажут об этом сложном процессе. Сотрудники нашей компании подробно расскажут об этом сложном процессе. Сотрудники нашей компании подробно расскажут об этом сложном процессе. Сотрудники нашей компании подробно расскажут об этом сложном процессе. Сотрудники нашей компании подробно расскажут об этом сложном процессе. ",
    post_id: 1
  }
  return response;
}

export const getUsers = async () => {
  const response = await request('api/users');
  return response.data;
}