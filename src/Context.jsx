import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { token, API } from "./config";
export const SessionContext = createContext();

export function SessionProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchDataUser = async () => {
            const res = await fetch(`${API}/user/session?userId=${localStorage.getItem("userId")}`, {
                method:"GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data) {
                setUser(data);
            }
            
            setLoading(false);
        }
        if (token) {
            fetchDataUser();
        }else{
            setLoading(false);
        }
    }, [token])

    return (
        <>
            {!loading ? (
                <SessionContext.Provider value={user}>
                    {children}
                </SessionContext.Provider>
            ): (<></>)}

        </>
    )
};