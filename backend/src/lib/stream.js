import {StreamChat} from 'stream-chat';
import dotenv from 'dotenv';
dotenv.config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

if (!api_key || !api_secret) {
    console.error("Stream API key and secret is required. Please set STREAM_API_KEY and STREAM_API_SECRET in your environment variables.");
}

const streamClient = StreamChat.getInstance(api_key, api_secret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser([userData]);
        return userData;
    } catch (error) {
        console.error("Error upserting Stream user:", error);
        throw error;
    }
};

export const generateStreamToken = (userId) => {
    try {
        //ensure the user id is a string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error generating Stream token:", error);
    }

}