'use client';

import { AuthContext } from "../auth/authContext";
import { useContext, useState } from "react";
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'
import { LoginMessage } from "@/components/utils";


export default function Auth() {
    const {authContext, setToken} = useContext(AuthContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loggingIn, isLoggingIn] = useState();
    const { push } = useRouter();

    if(authContext && authContext.accessToken) console.log("Redirecting to orders page", authContext.accessToken)

    async function login() {
        isLoggingIn(true);
        const res = await fetch('https://pizza-api-app.herokuapp.com/api/auth', {
        method: 'POST',    
        headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
        });

        if(!res.ok) {
            isLoggingIn(false);
            alert("Unable to Login");
            return;
        }

        const data = await res.json();
        setToken(data.access_token);
        push('/');
    }

    return (
  
          <main className={styles.main}>
            <div className={styles.center}>
              <div>
                <h1>Welcome to Pizza Club</h1>
              </div>
            </div>
  
            <div className={styles.contents}>
                <form>
                    <label>Username: </label>
                    <br/>
                    <input onChange={e => setUsername(e.target.value)} />
                    <br/>
                    <br/>
                    <label>Password: </label>
                    <br/>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                    <br/>
                </form>
                <br/>
                {
                    loggingIn ? LoginMessage : <button onClick={login}>Login</button>
                }
            </div>
          </main>
  
    )
}

