import apisauce from "apisauce";

const DEVELOPMENT_URL = "/";
const PRODUCTION_URL = "/";

let hostURL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  hostURL = DEVELOPMENT_URL;
} else {
  hostURL = PRODUCTION_URL;
}

const create = (baseURL = `${hostURL}api/`) => {
  const api = apisauce.create({
    baseURL,

    headers: {
      "Cache-Control": "no-cache",
      'Content-Type': 'application/x-www-form-urlencoded'
    },

    timeout: 10000
  });

  return {
    data: api,

    signIn: args => api.post("login", args),
    checkPassword: args => api.post("auth/password", args),
    logout: args => api.post("auth/logout", args),

    createUser: ({ params }) => api.post(`users/invite`, params),
    fetchUser: id => api.get(`users/${id}`),
    readUsers: ({ search }) => api.get(`users${search}`),
    updateUser: ({ id, params }) => api.put(`users/${id}`, params),
    deleteUser: id => api.delete(`users/${id}`),

    createEvent: args => api.post(`events`, args),
    fetchEvent: args => api.get(`events/${args.id}`),
    fetchEvents: query => api.get(`events${query ? query : ""}`),
    updateEvent: args => api.put(`events/${args.id}`, args),
    deleteEvent: args => api.delete(`events/${args.id}`),

    createSalary: ({ params }) => api.post(`salaries`, params),
    readSalaries: ({ search }) => api.get(`salaries${search}`),
    updateSalary: ({ id, params }) => api.put(`salaries/${id}`, params),
    deleteSalary: id => api.delete(`salaries/${id}`),

    fetchPayments: query => api.get(`payments${query ? query : ""}`),
    createPayment: args => api.post(`payments`, args),
    updatePayment: args => api.put(`payments`, args),
    deletePayment: args => api.delete(`payments`, args),

    fetchDocuments: () => api.get('documents'),
    updateDocument: args => api.put(`documents/${args.id}`, args)
  };
};

export default {
  create,
  hostURL
};
