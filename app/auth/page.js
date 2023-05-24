'use client';

import { useContext, useState } from "react";
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'
import { AuthContext } from "../auth/authContext";
import { LoginMessage } from "@/components/utils";


export default function Auth() {
    const { setToken } = useContext(AuthContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loggingIn, isLoggingIn] = useState();
    const { push } = useRouter();

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
        let expires = new Date()
        expires.setTime(expires.getTime() + (5 * 60 * 1000)); // Tokens only last 5 minutes from login
        setToken('accessToken', data.access_token, { path: '/',  expires});
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

