import { Client as Appwrite, Databases, Account, ID} from 'appwrite';
import { Server } from '../utils/config';

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
    const account = new Account(appwrite);
    const database = new Databases(appwrite);

    api.sdk = { database, account };
    return appwrite;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create(ID.unique(), email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },

  createDocument: (collectionId, data, permission) => {
    return api
      .provider()
      .database.createDocument(Server.databaseID, collectionId, ID.unique(), data, permission);
  },

  listDocuments: (collectionId) => {
    return api.provider().database.listDocuments(Server.databaseID, collectionId);
  },

  updateDocument: (collectionId, documentId, data, permission) => {
    return api
      .provider()
      .database.updateDocument(Server.databaseID, collectionId, documentId, data, permission);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(Server.databaseID, collectionId, documentId);
  },
};

export default api;
