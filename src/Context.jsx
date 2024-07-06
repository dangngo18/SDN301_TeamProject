import { createContext, useState, useEffect } from "react";
import { token } from "./config";
export const SessionContext = createContext();

export function SessionProvider({ children }) {
    const [user, setUser] = useState(null);
    // const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchDataUser = async () => {
            const res = await fetch("http://localhost:8080/user/session", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data) {
                setUser(data);
            } else {
                console.log("Not in session")
            }
        }
        if (token) {
            fetchDataUser();
        }
    }, [token])

    return (
        <>
            {user ? (
                <SessionContext.Provider value={user}>
                    {children}
                </SessionContext.Provider>
            ): (<></>)}

        </>
    )
};