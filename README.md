# 22MIS0117

# Campus Notifications Frontend

A responsive web application developed for managing and viewing campus notifications such as Placements, Results, and Events.

The application is built using Next.js, React, and Material UI with priority-based notification handling and responsive user experience.

---

## Features

- View all campus notifications
- Priority Inbox for important notifications
- Notification type filtering
- Read / Unread notification tracking
- Responsive design for desktop and mobile
- Pagination support
- API integration using protected routes
- Logging middleware integration
- Real-time notification handling

---

## Notification Priority Logic

Priority is calculated based on:

```text
Placement > Result > Event
```

If two notifications have same priority, latest notification is shown first based on timestamp.

Example:

```text
Placement Notification
↓
Result Notification
↓
Event Notification
```

---

## Technologies Used

- Next.js
- React.js
- TypeScript
- Material UI
- CSS
- REST API

---

## Project Structure

## Project Structure

```text
22MIS0117/
│
├── logging_middleware/
│
├── notification_app_backend/
│
├── notification_app_frontend/
│   │
│   ├── node_modules/
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   └── NotificationCard.js
│   │   │
│   │   ├── pages/
│   │   │   ├── AllNotifications.js
│   │   │   └── PriorityInbox.js
│   │   │
│   │   ├── services/
│   │   │   └── notificationService.js
│   │   │
│   │   ├── utils/
│   │   │   └── logger.js
│   │   │
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.tsx
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── index.tsx
│   │   ├── logo.svg
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   ├── setupTests.ts
│   │   └── tsconfig.json
│   │
│   ├── screenshots/
│   │   ├── Screenshot1.png
│   │   ├── Screenshot2.png
│   │   ├── Screenshot3.png
│   │   ├── Screenshot4.png
│   │   └── Screenshot5.png
│   │
│   ├── .gitignore
│   ├── NotificationCard.js
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── notification_system_design.md
```

---

## API Used

### GET Notifications

```text
http://4.224.186.213/evaluation-service/notifications
```

### Supported Query Parameters

```text
limit
page
notification_type
```

### Supported Notification Types

- Placement
- Result
- Event

---

## Functionalities Implemented

### All Notifications Page

- Displays all notifications
- Pagination support
- Type filtering
- Responsive UI

### Priority Inbox

- Displays top priority notifications
- User can select top N notifications
- Sorted using weight + recency

### Read / Unread Tracking

- Notifications marked as viewed after opening
- Stored using localStorage

### Responsive Design

- Mobile friendly layout
- Optimized UI using Material UI components

---

## Installation Steps

### Clone Repository

```bash
git clone <repository-link>
```

### Navigate to Project

```bash
cd campus-notifications
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Open Browser

```text
http://localhost:3000
```

---

## Future Improvements

- Real-time WebSocket notifications
- Search functionality
- Notification bookmarking
- Dark mode support
- Push notifications

---

## Author

Name: Jothi R 

Reg No: 22MIS0117

---

## License

This project is developed for campus hiring evaluation purposes only.
