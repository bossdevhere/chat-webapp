import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: currentUser.friends } },
                { isOnBoarded: true },
            ],
        })
        .select("-password")
        .limit(10);

        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Error fetching recommended users:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user._id)
        .select("-password")
        .select("friends")
        .populate("friends","fullName profilePicture nativeLanguage learningLanguage" , "-password");
        res.status(200).json( user.friends );
    } catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user._id;
        const{ id: recipientId } = req.params;

        if (myId.toString() === recipientId) {
            return res.status(400).json({  message: "You cannot send a friend request to yourself" });
        }
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({  message: "Recipient not found" });
        }

        if (recipient.friends.includes(myId)) {
            return res.status(400).json({  message: "You are already friends with this user" });
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recepient: recipientId },
                { sender: recipientId, recepient: myId },
            ],
        });

        if (existingRequest) {
            return res.status(400).json({  message: "Friend request already sent" });
        }

        const friendRequest = new FriendRequest({
            sender: myId,
            recepient: recipientId,
        });
        res.status(201).json( friendRequest);

    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({  message: "Server error" });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({  message: "Friend request not found" });
        }
        if (friendRequest.recepient.toString() !== req.user._id.toString()) {
            return res.status(403).json({  message: "You are not authorized to accept this friend request" });
        }
        friendRequest.status = "accepted";
        await friendRequest.save();

        // Add each other to friends list
        await User.findByIdAndUpdate(friendRequest.sender, { $addToSet: { friends: friendRequest.recepient } });
        await User.findByIdAndUpdate(friendRequest.recepient, { $addToSet: { friends: friendRequest.sender } });
        res.status(200).json({  message: "Friend request accepted" });
    } catch (error) {
        console.error("Error accepting friend request:", error);
        res.status(500).json({  message: "Server error" });
    }
}

export async function getFriendRequests(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({ recepient: req.user._id, status: "pending" })
        .populate("sender", "fullName profilePicture nativeLanguage learningLanguage" , "-password");

        const acceptedReqs = await FriendRequest.find({ recepient: req.user._id, status: "accepted" })
        .populate("recepient", "fullName profilePicture" , "-password");
        res.status(200).json({ incomingReqs, acceptedReqs });
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        res.status(500).json({  message: "Server error" });
    }
}

export async function getOutgoingFriendRequests(req, res) {
    try {
        const outgoingRequests = await FriendRequest.find({ sender: req.user._id, status: "pending" })
        .populate("recepient", "fullName profilePicture nativeLanguage learningLanguage" , "-password");
        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.error("Error fetching outgoing friend requests:", error);
        res.status(500).json({  message: "Server error" });
    }

}