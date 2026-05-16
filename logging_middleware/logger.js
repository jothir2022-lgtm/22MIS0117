// logging_middleware/logger.js
const LOG_URL = "http://4.224.186.213/evaluation-service/logs";
let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

export async function log(stack, level, pkg, message) {
  if (!accessToken) return;
  try {
    await fetch(LOG_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
  } catch (err) {}
}
