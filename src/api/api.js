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
    return api.sdk;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create(ID.unique(), email, password, name);
  },

  getAccount: () => {
    let account = api.provider().account;
    return account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (data, permissions) => {
    return api
      .provider()
      .database.createDocument(Server.databaseID, Server.collectionID, 'unique()', data, permissions);
  },

  listDocuments: () => {
    return api.provider().database.listDocuments(Server.databaseID, Server.collectionID);
  },

  updateDocument: (documentId, data) => {
    return api
      .provider()
      .database.updateDocument(Server.databaseID, Server.collectionID, documentId, data);
  },

  deleteDocument: (documentId) => {
    return api.provider().database.deleteDocument(Server.databaseID, Server.collectionID, documentId);
  },
};

export default api;
