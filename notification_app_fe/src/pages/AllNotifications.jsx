import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, MenuItem, Pagination, Box, CircularProgress } from "@mui/material";
import NotificationCard from "../components/NotificationCard";
import { getAllNotifications } from "../services/notificationService";
import { log } from "../../../logging_middleware/logger";

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [readIds, setReadIds] = useState(() => JSON.parse(localStorage.getItem("readIds") || "[]"));
  const limit = 10;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await log("frontend", "info", "page", "AllNotifications fetch");
      try {
        const data = await getAllNotifications(limit, page, typeFilter);
        setNotifications(data);
      } catch (err) { await log("frontend", "error", "page", err.message); }
      finally { setLoading(false); }
    };
    fetch();
  }, [page, typeFilter]);

  const markAsRead = (id) => {
    const newReadIds = [...readIds, id];
    setReadIds(newReadIds);
    localStorage.setItem("readIds", JSON.stringify(newReadIds));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4">All Notifications</Typography>
      <TextField select label="Filter" value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }} sx={{ my: 2, minWidth: 150 }}>
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
      </TextField>
      {loading ? <CircularProgress /> : notifications.map(n => <NotificationCard key={n.ID} notification={n} isRead={readIds.includes(n.ID)} onMarkRead={markAsRead} />)}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination count={10} page={page} onChange={(e, v) => setPage(v)} />
      </Box>
    </Container>
  );
}
