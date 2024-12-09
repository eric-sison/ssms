import { LoginForm } from "@ssms/components/features/LoginForm";
//import { Account, Client } from "node-appwrite";

export default async function Login() {
  // const appwrite = new Account(
  //   new Client().setEndpoint("http://172.20.110.100:82/v1").setProject("67565b5c0006e1006e06")
  // );

  //const user = await appwrite.get();

  // console.log(appwrite.get());

  return (
    <div>
      <LoginForm />
    </div>
  );
}
