import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import notificationSound from './notification.mp3';

const IncomingNotif = () => {
  const [client, setClient] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const token = localStorage.getItem("authToken");


  function getIDFromToken(token) {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = atob(payloadBase64);
      const payload = JSON.parse(decodedPayload);
      return payload.id;
    } catch (e) {
      console.error('Erreur de décodage du token :', e);
      return null;
    }
  }

  useEffect(() => {
      if (!token) return;
      const adminId = getIDFromToken(token);
      const socket = new SockJS('http://localhost:8080/websocket');
      const stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        onConnect: () => {
          console.log('Connected');
          stompClient.subscribe(`/topic/admin`, (message) => {
            console.log('New order:', message.body);
            triggerNotification(`📢 ${message.body}`);
          }, {
            Authorization: `Bearer ${token}`,
          });
        },
        onStompError: (frame) => {
          console.error('❌ Erreur STOMP :', frame.headers['message']);
          console.error('Broker error:', frame.headers['message']);
        },
      });
  
      stompClient.activate();
      setClient(stompClient);
  
      return () => {
        if (stompClient) {
          stompClient.deactivate();
        }
      };
    }, [token]);

  const triggerNotification = (message) => {
    setAlertMessage(message);
    setShowAlert(true);

    // Jouer le son de notification
    const audio = new Audio(notificationSound);
    audio.play().catch(e => console.error("Audio playback failed:", e));

    // Masquer l'alerte après 5 secondes
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  };

  const formatAlertMessage = (message) => {
    // Mise en forme spéciale pour les messages ADMIN
    return (
      <div className="flex items-center gap-2">
        <span className="text-xl">👨‍💼</span>
        <div>
          <span className="font-bold text-blue-600">ADMIN ALERT: </span>
          <span>{message.replace('📢', '').trim()}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div
            className="flex items-center p-4 text-sm rounded-lg shadow-lg min-w-[300px]"
            style={{
              backgroundColor: '#F0F9FF',
              border: '2px solid #BEE3F8',
            }}
          >
            {formatAlertMessage(alertMessage)}
          </div>
        </div>
      )}
    </>
  );
};

export default IncomingNotif;