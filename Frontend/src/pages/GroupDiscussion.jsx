import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "../GroupDiscussion.css";
import gdImage from "../assets/gd.png";

export default function GroupDiscussion() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const handleJoinVideoCall = () => {
    if (!meetingCode.trim()) return;
    navigate(`/meet/${meetingCode}`);
  };

  return (
    <div className="Meeting">
      {/* LEFT SECTION */}
      <div className="Meeting-left">
        <h1>
          <span>Create</span> Meeting Code
        </h1>

        <p>
          Create a meeting code and share it with your friends to start a group
          discussion instantly.
        </p>

        <div className="Meeting-input">
          <TextField
            label="Meeting Code"
            variant="outlined"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
            size="medium"
          />

          <Button
            variant="contained"
            onClick={handleJoinVideoCall}
            className="join-btn"
          >
            JOIN
          </Button>
        </div>
      </div>

      <div className="Meeting-right">
        <img src={gdImage} alt="group discussion" />
      </div>
    </div>
  );
}

