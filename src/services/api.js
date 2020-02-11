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
    updateUser: ({ uuid, params }) => api.patch(`user/${uuid}`, params),
    deleteUser: id => api.delete(`user/${id}`),

    createEvent: args => api.post(`events`, args),
    fetchEvent: args => api.get(`events/${args.id}`),
    fetchEvents: query => api.get(`events${query ? query : ""}`),
    updateEvent: args => api.put(`events/${args.id}`, args),
    deleteEvent: args => api.delete(`events/${args.id}`),

    createSalary: params => api.put(`salary`, params),
    readSalary: id => api.get(`salary/${id}`),
    readSalaries: ({ search }) => api.get(`salary${search}`),
    updateSalary: ({ id, params }) => api.put(`salary/${id}`, params),
    deleteSalary: id => api.delete(`salary/${id}`),

    fetchPayments: query => api.get(`payments${query ? query : ""}`),
    createPayment: args => api.post(`payments`, args),
    updatePayment: args => api.put(`payments`, args),
    deletePayment: args => api.delete(`payments`, args),

    readDocuments: () => api.get("documents"),
    createDocument: args => api.post("documents", args),
    updateDocument: ({ id, params }) => api.patch(`documents/${id}`, params),
    deleteDocument: id => api.delete(`documents/${id}`),

    createProject: params => api.post("projects", params),
    readProjects: () => api.get("projects"),
    updateProject: ({ id, params }) => api.put(`projects/${id}`, params),
    deleteProject: id => api.delete(`projects/${id}`),

    readProjectWorks: ({ projectId, userId, params }) => userId 
      ? api.get(`/user/${userId}/work?${params}`)
      : api.get(`/projects/${projectId}/work?${params}`),
    createProjectWork: ({ projectId, params }) => api.post(`projects/${projectId}/work`, params),
    updateProjectWork: ({ id, projectId, params }) => api.put(`projects/${projectId}/work/${id}`, params),
    deleteProjectWork: ({ id, projectId }) => api.delete(`projects/${projectId}/work/${id}`),
    
    readDocumentAccesses: documentId => api.get(`documents/${documentId}/accesses`),
    createDocumentAccesses: ({ documentId, params }) => api.post(`documents/${documentId}/accesses`, params),
    updateDocumentAccess: ({ id, documentId, params }) => api.patch(`documents/${documentId}/accesses/${id}`, params),
    deleteDocumentAccess: ({ id, documentId }) => api.delete(`documents/${documentId}/accesses/${id}`),
    
  };
};

export default {
  create,
  hostURL
};
