import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = ({ userId, receiverId }) => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        // Emit 'joinRoom' event to the backend to indicate that the user is joining the chat room
        socket.emit("joinRoom", userId);

        // Listen for incoming messages
        socket.on("receiveMessage", (newMessage) => {
            setChat((prev) => [...prev, newMessage]);
            socket.emit("messageDelivered", newMessage.id);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [userId]);

    const sendMessage = () => {
        if (message.trim()) {
            console.log("Sending message with sender_id:", userId, "receiver_id:", receiverId);  
            const msgData = { sender_id: userId, receiver_id: receiverId, message };
            socket.emit("sendMessage", msgData);
            setChat((prev) => [
                ...prev,
                { ...msgData, created_at: new Date() }
            ]);
            setMessage("");
        }
    };

    return (
        <div>
            <h3>Chat with User {receiverId}</h3>
            <div>
                {chat.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.sender_id === userId ? "You" : "Them"} (ID: {msg.sender_id}):</strong> 
                        {msg.message} 
                        <br />
                        <em>Receiver ID: {msg.receiver_id}</em>
                    </p>
                ))}
            </div>
            <input 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message..." 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;