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
    readUser: uuid => api.get(`user/${uuid}`),
    readUsers: ({ search }) => api.get(`user${search}`),
    updateUser: ({ uuid, params }) => api.patch(`user/${uuid}`, params),
    deleteUser: uuid => api.delete(`user/${uuid}`),

    createEvent: args => api.post(`events`, args),
    fetchEvent: args => api.get(`events/${args.uuid}`),
    fetchEvents: query => api.get(`events${query ? query : ""}`),
    updateEvent: args => api.put(`events/${args.uuid}`, args),
    deleteEvent: args => api.delete(`events/${args.uuid}`),

    createSalary: params => api.put(`salary`, params),
    readSalary: uuid => api.get(`salary/${uuid}`),
    readSalaries: ({ search }) => api.get(`salary${search}`),
    updateSalary: ({ uuid, params }) => api.put(`salary/${uuid}`, params),
    deleteSalary: uuid => api.delete(`salary/${uuid}`),

    fetchPayments: query => api.get(`payments${query ? query : ""}`),
    createPayment: args => api.post(`payments`, args),
    updatePayment: args => api.put(`payments`, args),
    deletePayment: args => api.delete(`payments`, args),

    readDocuments: () => api.get("documents"),
    createDocument: args => api.post("documents", args),
    updateDocument: ({ uuid, params }) => api.patch(`documents/${uuid}`, params),
    deleteDocument: uuid => api.delete(`documents/${uuid}`),

    createProject: params => api.post("projects", params),
    readProjects: () => api.get("projects"),
    updateProject: ({ uuid, params }) => api.put(`projects/${uuid}`, params),
    deleteProject: uuid => api.delete(`projects/${uuid}`),

    readProjectWorks: ({ projectUuid, userUuid, params }) => userUuid 
      ? api.get(`/user/${userUuid}/work?${params}`)
      : api.get(`/projects/${projectUuid}/work?${params}`),
    createProjectWork: ({ projectUuid, params }) => api.post(`projects/${projectUuid}/work`, params),
    updateProjectWork: ({ uuid, projectUuid, params }) => api.put(`projects/${projectUuid}/work/${uuid}`, params),
    deleteProjectWork: ({ uuid, projectUuid }) => api.delete(`projects/${projectUuid}/work/${uuid}`),
    
    readDocumentAccesses: documentUuid => api.get(`documents/${documentUuid}/accesses`),
    createDocumentAccesses: ({ documentUuid, params }) => api.post(`documents/${documentUuid}/accesses`, params),
    updateDocumentAccess: ({ uuid, documentUuid, params }) => api.patch(`documents/${documentUuid}/accesses/${uuid}`, params),
    deleteDocumentAccess: ({ uuid, documentUuid }) => api.delete(`documents/${documentUuid}/accesses/${uuid}`),
    
  };
};

export default {
  create,
  hostURL
};
