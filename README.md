# Campus Connect

Campus Connect is a React-based event management web application designed to help universities manage and display campus events efficiently. The application allows users to view, add, edit, delete, and RSVP to campus events. It includes filtering, searching, image uploads, and business rules to ensure proper event scheduling and participation.

[Campus Connect Website](https://campus-connect-events.web.app/)

---

## 🚀 Features

### Core Features
- Add new events via a form
- Edit existing events
- Delete events with confirmation
- View detailed event information
- RSVP to events (with constraints)
- Success/Failure popups after operations
- Receive reminders

### Business Constraints
- RSVP count must not exceed event capacity
- Cannot RSVP to events on or after the deadline (1 day before the event)
- Cannot create an event in the past
- Duplicate RSVPs (based on email) are prevented
- Event start time must be before end time
- Event duration must be between 2 to 8 hours
- Event type must be from predefined categories (e.g., Workshop, Seminar, Social, Academic)

### Additional Features
- Filter events by type
- Search events by title
- Add Event to Google Calendar with one Click
- Images are stored using the Cloudinary API
- JSON Server used as a mock backend
- Get Email reminders via EmailJS

---

## 🛠️ Tech Stack

- **Frontend:** React, Bootstrap 5, React-Bootstrap
- **Backend:** JSON Server (Mock REST API)
- **Other Tools:** Cloudinary API (for image uploads), EmailJS (for automated reminders)

---

## 📦 Project Structure

CampusConnect/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── assets/
│ ├── utils/
│ ├── App.jsx
│ ├── main.jsx
│ └── ...
├── index.html
├── db.json
├── package.json
└── README.md

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/campus-connect.git
cd campus-connect
```

---

### 1. Install Dependencies

npm install

---

### 3. Setup JSON Server

```npm install -g json-server```

- Make sure you have JSON Server installed globally:

```npm install -g json-server```

- Then start the mock backend:

```json-server --watch db.json --port 8080```

- It will run at http://localhost:8080.

---

### 4. Start the React App

```npm run dev```

- The app will be available at http://localhost:8080.

---

### Notes

- You can add more event types as needed.

- To store uploaded images, the Cloudinary API is used.

- The JSON file stores data such as id, link, title, type, date, startTime, etc.
