# Smart Email Assistant

A productivity tool that helps users compose intelligent and context-aware email replies directly within **Gmail** using AI.

This project consists of:
- A **Spring Boot backend** that integrates with the **Google Gemini API** to generate smart email responses.
- A **Chrome Extension frontend** that adds an **"AI Reply"** button in the Gmail reply window to automate and streamline the email reply process.

---

## 🚀 Features

- 📩 **AI-Generated Email Replies:** Automatically generate context-aware replies using Google's Gemini AI.
- 🖱️ **Seamless Gmail Integration:** Chrome Extension adds an **AI Reply** button next to Gmail’s native **Send** button.
- 🎯 **Customizable Reply Tone:** Supports generating replies in different tones such as formal, casual, or friendly based on user selection.
- 🔄 **Auto Content Capture:** Captures the content of the email thread to generate an appropriate response.
- ⏱️ **Reduces Response Time:** Speeds up the email replying process by over **50%** for common queries.
- 🔐 **Non-intrusive:** Integrates with Gmail without affecting its core functionalities.

---

## 🛠️ Tech Stack

| Layer      | Technologies |
|------------|--------------|
| **Backend**  | Java, Spring Boot, Google Gemini API |
| **Frontend** | Chrome Extension (JavaScript, HTML, CSS) |

---

## 📦 Project Structure

```
smart-email-assistant/
│
├── backend/         # Spring Boot backend - API to call Google Gemini API
├── frontend/        # Chrome Extension code - injected in Gmail interface
├── .gitignore
├── README.md
```

---

## 🔧 Setup Instructions

### Backend (Spring Boot)
1. Navigate to the **backend/** directory.
2. Configure your **Google Gemini API key** in `application.properties`.
3. Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```

### Frontend (Chrome Extension)
1. Navigate to the **frontend/** directory.
2. Load the Chrome Extension manually:
    - Open **chrome://extensions/**
    - Enable **Developer Mode**
    - Click **Load Unpacked** and select the `frontend/` directory.
3. The **AI Reply** button will appear next to the **Send** button in Gmail's reply window.

---

## 📸 Screenshots

### AI Reply Button in Gmail
![AI Reply Button](assets/ai-reply-button.png)

### Example of AI-Generated Reply
![Generated Reply Example](assets/generated-reply-example.png)

---
