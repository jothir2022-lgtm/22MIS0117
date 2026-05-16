import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, MenuItem, Box, CircularProgress, Slider } from "@mui/material";
import NotificationCard from "../components/NotificationCard";
import { getTopPriorityNotifications } from "../services/notificationService";
import { log } from "../../../logging_middleware/logger";

export default function PriorityInbox() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topN, setTopN] = useState(10);
  const [typeFilter, setTypeFilter] = useState("");
  const [readIds, setReadIds] = useState(() => JSON.parse(localStorage.getItem("readIds") || "[]"));

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await log("frontend", "info", "page", "PriorityInbox load");
      try {
        const data = await getTopPriorityNotifications(topN, typeFilter);
        setNotifications(data);
      } catch (err) { await log("frontend", "error", "page", err.message); }
      finally { setLoading(false); }
    };
    load();
  }, [topN, typeFilter]);

  const markAsRead = (id) => {
    const newReadIds = [...readIds, id];
    setReadIds(newReadIds);
    localStorage.setItem("readIds", JSON.stringify(newReadIds));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4">Priority Inbox</Typography>
      <Box display="flex" gap={2} flexWrap="wrap" my={2}>
        <TextField select label="Type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} sx={{ minWidth: 150 }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </TextField>
        <Box width={200}>
          <Typography>Top N: {topN}</Typography>
          <Slider value={topN} onChange={(e, v) => setTopN(v)} min={5} max={30} step={1} valueLabelDisplay="auto" />
        </Box>
      </Box>
      {loading ? <CircularProgress /> : notifications.map(n => <NotificationCard key={n.ID} notification={n} isRead={readIds.includes(n.ID)} onMarkRead={markAsRead} />)}
    </Container>
  );
}
