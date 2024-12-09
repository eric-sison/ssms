"use client";

import { Account, Client } from "appwrite";
import { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";

type AppwriteProviderContext = {
  account: Account;
};

const AppwriteProviderContext = createContext<AppwriteProviderContext | null>(null);

export const AppwriteProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const client = new Client();

  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!);

  const account = new Account(client);

  return <AppwriteProviderContext.Provider value={{ account }}>{children}</AppwriteProviderContext.Provider>;
};

export const useAppwrite = () => {
  const account = useContext(AppwriteProviderContext);

  if (!account) {
    throw new Error("Make sure Appwrite Provider is in the root of your component tree.");
  }

  return account.account;
};
