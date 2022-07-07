import { Client as Appwrite, Databases, Account } from 'appwrite';
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
    const database = new Databases(appwrite, Server.databaseID);

    api.sdk = { database, account };
    return appwrite;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create('unique()', email, password, name);
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

  createDocument: (collectionId, data, read, write) => {
    return api
      .provider()
      .database.createDocument(collectionId, 'unique()', data, read, write);
  },

  listDocuments: (collectionId) => {
    return api.provider().database.listDocuments(collectionId);
  },

  updateDocument: (collectionId, documentId, data, read, write) => {
    return api
      .provider()
      .database.updateDocument(collectionId, documentId, data, read, write);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },
};

export default api;
