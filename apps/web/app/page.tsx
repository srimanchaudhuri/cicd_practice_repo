import { client } from "@repo/db/client";

export default async function Home() {
  const user = await client.user.findFirst();
  return (
    <div>
      <h1>Welcome to the Web App!</h1>
      {user ? <p>Hello, {user.email}!</p> : <p>Please sign up or log in.</p>}
    </div> 
  )
}