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
      "Content-Type": "application/x-www-form-urlencoded"
    },

    timeout: 10000
  });

  return {
    data: api,

    signIn: args => api.post("login", args),
    checkPassword: args => api.post("auth/password", args),
    logout: args => api.post("auth/logout", args),

    createUser: params => api.put(`user`, params),
    readUser: id => api.get(`user/${id}`),
    readUsers: ({ search }) => api.get(`user${search}`),
    updateUser: ({ id, params }) => api.patch(`user/${id}`, params),
    deleteUser: id => api.delete(`user/${id}`),

    createEvent: args => api.post(`events`, args),
    fetchEvent: args => api.get(`events/${args.id}`),
    fetchEvents: query => api.get(`events${query ? query : ""}`),
    updateEvent: args => api.put(`events/${args.id}`, args),
    deleteEvent: args => api.delete(`events/${args.id}`),

    createSalary: ({ params }) => api.post(`salary`, params),
    readSalary: id => api.get(`salary/${id}`),
    readSalaries: ({ search }) => api.get(`salary${search}`),
    updateSalary: ({ id, params }) => api.put(`salary/${id}`, params),
    deleteSalary: id => api.delete(`salary/${id}`),

    fetchPayments: query => api.get(`payments${query ? query : ""}`),
    createPayment: args => api.post(`payments`, args),
    updatePayment: args => api.put(`payments`, args),
    deletePayment: args => api.delete(`payments`, args),

    readDocuments: () => api.get("document")
  };
};

export default {
  create,
  hostURL
};
