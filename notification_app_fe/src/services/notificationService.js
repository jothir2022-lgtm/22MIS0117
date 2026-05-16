import { log, setAccessToken } from "../../../logging_middleware/logger";

const BASE_URL = "http://4.224.186.213/evaluation-service/notifications";
setAccessToken(ACCESS_TOKEN);

async function fetchNotifications(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${BASE_URL}?${query}` : BASE_URL;
  await log("frontend", "debug", "api", `Requesting ${url}`);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  await log("frontend", "info", "api", `Received ${data.notifications?.length || 0} notifs`);
  return data.notifications || [];
}

export async function getAllNotifications(limit = 20, page = 1, type = "") {
  const params = { limit, page };
  if (type) params.notification_type = type;
  return fetchNotifications(params);
}

const WEIGHT = { Placement: 3, Result: 2, Event: 1 };
function getPriorityScore(notif) {
  return WEIGHT[notif.Type] * 1e12 + new Date(notif.Timestamp).getTime();
}

export async function getTopPriorityNotifications(n = 10, typeFilter = "") {
  await log("frontend", "info", "service", "Fetching all for priority");
  let notifications = await fetchNotifications({ limit: 100 });
  if (typeFilter) notifications = notifications.filter(n => n.Type === typeFilter);
  const scored = notifications.map(n => ({ ...n, score: getPriorityScore(n) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, n);
}
