import { put } from "redux-saga/effects";

import { handleSagaError } from "./utils";
import actions from "../actions";

const documents = [
  {
    id: 1,
    title: "title of doc with id 1",
    content: "content of doc with id 1",
    access: [],
    private: false,
    parent_document: null,
    createdAt: "Sat Jan 04 2020 14:35:28 GMT+0300",
    updatedAt: "Sat Jan 04 2020 14:35:28 GMT+0300"
  },
  {
    id: 2,
    title: "title of doc with id 2",
    content: "content of doc with id 2",
    access: [],
    private: false,
    parent_document: 1,
    createdAt: "Sat Jan 04 2020 14:35:28 GMT+0300",
    updatedAt: "Sat Jan 04 2020 14:35:28 GMT+0300"
  },
  {
    id: 3,
    title: "title of doc with id 3",
    content: "content of doc with id 3",
    access: [],
    private: 1,
    parent_document: null,
    createdAt: "Sat Jan 04 2020 14:35:28 GMT+0300",
    updatedAt: "Sat Jan 04 2020 14:35:28 GMT+0300"
  },
  {
    id: 4,
    title: "title of doc with id 4",
    content: "content of doc with id 4",
    access: [],
    private: false,
    parent_document: 3,
    createdAt: "Sat Jan 04 2020 14:35:28 GMT+0300",
    updatedAt: "Sat Jan 04 2020 14:35:28 GMT+0300"
  },
  {
    id: 5,
    title: "title of doc with id 5",
    content: "content of doc with id 5",
    access: [],
    private: false,
    parent_document: 3,
    createdAt: "Sat Jan 04 2020 14:35:28 GMT+0300",
    updatedAt: "Sat Jan 04 2020 14:35:28 GMT+0300"
  },
  {
    id: 6,
    title: "title of doc with id 6",
    content: "content of doc with id 6",
    access: [],
    private: false,
    parent_document: null,
    createdAt: "Sat Jan 04 2020 14:35:28 GMT+0300",
    updatedAt: "Sat Jan 04 2020 14:35:28 GMT+0300"
  },
  {
    id: 7,
    title: "title of doc with id 7",
    content: `
      <p>
        <span style="font-size: 18px;">Quill Rich Text Editor</span>
      </p>
    `,
    access: [],
    private: 1,
    parent_document: 2,
    createdAt: "Sat Jan 04 2020 14:35:28 GMT+0300",
    updatedAt: "Sat Jan 04 2020 14:35:28 GMT+0300"
  }
];

// "stub" for updating document with id === 7
const updatedDocument = {
  id: 7,
  title: "title of doc with id 7",
  content: `
    <p>
      <span style="font-size: 18px;">Quill Rich Text Editor</span>
    </p>
    <p>
        <br>
    </p>
    <p>
        <br>
    </p>
    <p>Quill is a free,
        <a href="https://github.com/quilljs/quill/" target="_blank">open source</a>WYSIWYG editor built for the modern web. With its
        <a href="http://quilljs.com/docs/modules/" target="_blank">extensible architecture</a>and a
        <a href="http://quilljs.com/docs/api/" target="_blank">expressive API</a>you can completely customize it to fulfill your needs. Some built in features include:</p>
    <p>
        <br>
    </p>
    <ul>
        <li>Fast and lightweight</li>
        <li>Semantic markup</li>
        <li>Standardized HTML between browsers</li>
        <li>Cross browser support including Chrome, Firefox, Safari, and IE 9+</li>
    </ul>
  `,
  access: [],
  private: 1,
  parent_document: 2,
  createdAt: "Sat Jan 04 2020 14:35:28 GMT+0300",
  updatedAt: "Sat Jan 04 2020 14:35:28 GMT+0300"
};

function* fetchDocumentsList(api) {
  try {
    // const response = yield call(api.fetchDocuments);

    yield put(actions.documentsListSuccess({ documents }));

    // if (response.status === 200) {
    // yield put(actions.documentsListSuccess({ documents, list: tree.getTreeFormArr(documents) }));
    // } else {
    //   throw response;
    // }
  } catch (error) {
    const errorMessage = "Error while fetching documents list";

    yield handleSagaError(error, errorMessage, actions.documentsListFailure);
  }
}

function* updateDocumentsList(api, action) {
  try {
    // const response = yield call(api.updateDocument, {
    //   ...get(action, "payload.document"),
    //   content: get(action, "payload.content")
    // });

    yield put(actions.updateListSuccess({ document: updatedDocument }));

    // if (response.status === 200) {
    // yield put(actions.updateListSuccess({ document: updatedDocument }));
    // } else {
    //   throw response;
    // }
  } catch (error) {
    const errorMessage = "Error while updation document";

    yield handleSagaError(error, errorMessage, actions.updateListFailure);
  }
}

export default {
  fetchDocumentsList,
  updateDocumentsList
};
