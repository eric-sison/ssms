"use client";

import { account } from "@ssms/utils/appwrite";
import { useState, type FunctionComponent } from "react";
import { client } from "@ssms/utils/appwrite";
import { Account, Databases } from "appwrite";

export const LoginForm: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email: string, password: string) => {
    const session = await account.createEmailPasswordSession(email, password);
    console.log(session);
  };

  const getAccount = async () => {
    const account = new Account(client);

    const result = await account.get();

    console.log(result);
  };

  const listDb = async () => {
    const database = new Databases(client);

    const result = await database.listDocuments(
      "67565e310011f6e065e4",
      "67565e59003d562af115"
    );

    console.log(result);
  };

  return (
    <div>
      <button onClick={listDb}>List Database</button>
      <button onClick={getAccount}>Get Account</button>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={() => login(email, password)}>
          Login
        </button>
      </form>
    </div>
  );
};
