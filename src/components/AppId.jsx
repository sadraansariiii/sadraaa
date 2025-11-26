"use client";

import { useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";

import BaseUrl from "../utils/baseUrl";
import { useSessionStore } from "../store/sessionStore";

export default function ClientSessionFetcher() {
  const { setClientId, setToken } = useSessionStore();

  useEffect(() => {
    let clientId = localStorage.getItem("ExpotApp");
    let getTokenData = getCookie("ExpotTok");
    const fetchSession = async () => {
      try {
        if (!clientId) {
          const appIdRes = await fetch(BaseUrl("/session/client-id"));
          const data = await appIdRes.json();
          clientId = data?.data?.client_id;
          localStorage.setItem("ExpotApp", clientId);
          setClientId(clientId);
        } else {
          setClientId(clientId);
        }

        if (!getTokenData) {
          const tokenRes = await fetch(BaseUrl("/session/token"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ appId: clientId }),
          });
          const tokenData = await tokenRes.json();
          const token = tokenData?.data?.token;
          setCookie("ExpotTok", token);
          setToken(token);
        } else {
          setToken(getTokenData);
        }
      } catch (err) {
        console.error(" خطا:", err.message);
      }
    };

    fetchSession();
  }, []);

  return null;
}
