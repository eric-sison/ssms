import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("http://172.20.110.100:82/v1")
  .setProject("67565b5c0006e1006e06");

export const account = new Account(client);

export { ID } from "appwrite";
