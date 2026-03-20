# ✨ Random Quotes OOP

A simple web application for generating random quotes built with **JavaScript (OOP)** and **Node.js (Express)**.

The app allows you to:

- Generate quotes from a local array
- Fetch quotes from a public API
- Fetch quotes from your own backend API
- Add/remove quotes to favourites (stored in `localStorage`)

---

## 🚀 Features

- 📌 Random quote from local data
- 🌐 Random quote from external API
- 🖥️ Random quote from your own Express server
- ⭐ Add/remove favourites
- 💾 Persist favourites and current quote in `localStorage`
- 🧱 Clean OOP architecture (services, views, app)

---

## ⚙️ How It Works

### Client

The frontend is built using a simple OOP architecture:

- **QuoteService** — handles quotes logic (local + APIs)
- **StorageService** — works with `localStorage`
- **QuoteView / FavouritesView** — UI rendering
- **QuotesApp** — main controller

---

### Server

The backend is a simple Express server that:

- Returns random quotes via API
- Ensures quotes do not repeat consecutively

**Endpoint:**

```http
GET /quotes/random
```

---

## 🧑‍💻 Installation & Run

### 1. Clone the repository

```bash
git clone https://github.com/IvanGodPro24/random-quotes-oop.git
cd random-quotes-oop
```

### 2. Run server

```bash
cd server
npm install
npm run dev
```

Server will run on: `http://localhost:3000`

### 3. Run client

Just open **index.html** using **Live Server** (recommended):

```bash
npx live-server client
```

---

## 🔘 Buttons

The app has 3 quote sources:

| Button                     | Source                   |
|----------------------------|--------------------------|
| Generate Quote             | Local array              |
| Generate Quote via API     | Public API (quotable.io) |
| Generate Quote via Own API | Your Express server      |

---

## 📡 API Example

```
GET http://localhost:3000/quotes/random
```

**Response:**

```json
{
  "id": 3,
  "text": "Your time is limited, so don't waste it living someone else's life.",
  "author": "Steve Jobs"
}
```

---

## 💾 Local Storage

The app stores:

- `currentQuote` — last shown quote
- `favourites` — list of favourite quotes

---

## 🧠 Architecture Notes

This project demonstrates:

- Separation of concerns
- OOP approach in frontend
- Service-based architecture
- Clean handling of async API requests
- State persistence

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Made with ❤️ by [IvanGodPro24](https://github.com/IvanGodPro24)