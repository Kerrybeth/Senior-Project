import React, { useState, useEffect } from "react";
import { getAuth } from 'firebase/auth';
import { useSelector } from "react-redux";
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';
import "./Chat.css";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Chat = ({ room }) => {
    const db = getFirestore();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { user, sucess } = useSelector(
        (state) => state.user
    )

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            console.log(`message array = ${messages}`);
            setMessages(messages);
        });

        return () => unsuscribe();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (newMessage === "") return;
            await addDoc(messagesRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                user: user.email,
                room,
            });
        } catch (error) {
            console.log(`error while handling submit for chat = ${error.message}`)
        }
        setNewMessage("");
    };

   


    console.log(`message load is ${JSON.stringify(messages)}`)
    return (
        <Box>
            <Stack spacing={2}>
                <Typography
                    variant="h5"
                    fontWeight="600"
                >
                    {`Your talking to ${room.toUpperCase()}`}
                </Typography>
                <Item> <div className="messages">
                    {messages.map((message) => (
                        <div key={message.id} className="message">
                            <span className="user">{message.user}:</span> {message.text}
                        </div>
                    ))}
                </div></Item>
                <div className="chat-app">
                    <form onSubmit={handleSubmit} className="new-message-form">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(event) => setNewMessage(event.target.value)}
                            className="new-message-input"
                            placeholder="Type your message here..."
                        />
                        <button type="submit" className="send-button">
                            Send
                        </button>
                    </form>
                </div>
            </Stack>
        </Box>
    );
};
