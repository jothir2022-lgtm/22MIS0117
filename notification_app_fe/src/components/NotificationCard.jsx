import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { log } from "../../../logging_middleware/logger";

const typeColors = { Placement: "#4caf50", Result: "#2196f3", Event: "#ff9800" };

export default function NotificationCard({ notification, isRead, onMarkRead }) {
  const handleClick = async () => {
    if (!isRead) {
      await log("frontend", "info", "component", `Mark read ${notification.ID}`);
      onMarkRead(notification.ID);
    }
  };
  return (
    <Card sx={{ mb: 2, opacity: isRead ? 0.7 : 1, borderLeft: `6px solid ${typeColors[notification.Type]}`, cursor: "pointer" }} onClick={handleClick}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">{notification.Message}</Typography>
          <Chip label={notification.Type} size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {new Date(notification.Timestamp).toLocaleString()}
        </Typography>
        {!isRead && <Chip label="New" size="small" color="error" sx={{ mt: 1 }} />}
      </CardContent>
    </Card>
  );
}
