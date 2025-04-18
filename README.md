# 🔥 Flare – Forest Fire Detection and Monitoring System

**Flare** is an IoT-based forest fire detection system designed to **monitor real-time environmental conditions** such as temperature, humidity, and gas concentration using ESP32 microcontrollers and sensors. The data is visualized on a dynamic website dashboard, helping detect potential fire hazards early.

---

## 📌 Problem Statement

Forest fires have devastating consequences—loss of biodiversity, human displacement, and environmental damage. Timely detection is key to preventing escalation. Traditional surveillance systems are often costly or reactive.

**Flare provides an affordable, scalable, and real-time fire monitoring solution**, especially helpful in forest reserves and vulnerable areas.

---

## 🚀 Features

- 🌡️ Real-time monitoring of **temperature**, **humidity**, and **gas/smoke levels**
- 📶 Wireless data transmission via **ESP-NOW** between sensor nodes and a local station
- 📡 **SIM800L or Wi-Fi connectivity** for cloud integration (Flask API + Firebase)
- 🖥️ Interactive **HTML/CSS/JS dashboard** for live sensor status and risk visualization
- 🔔 Automated **alerts** and color-coded indicators for fire risk (normal/warning/danger)
- 🌍 Can scale to **multiple sensor nodes** with unique sensor IDs

---

## 🛠️ Technologies Used

### 🔧 Hardware
- ESP32 (NodeMCU)
- DHT22 Sensor – Temperature & Humidity
- MQ7 Sensor – Gas (CO/Smoke)
- SIM800L GSM Module (optional)
- Capacitor & Power Regulation for stability

### 💻 Software
- HTML / CSS / JavaScript (Frontend)
- Flask (Python backend for API)
- Firebase Realtime Database (Cloud Storage)
- ESP-NOW (ESP32 communication protocol)
- Render (Backend hosting)
- GitHub (Version Control)

---

## 🌐 Live Dashboard

Deployed Frontend Dashboard: [🔗 Your Netlify Link Here]  
Flask Backend API: [🔗 https://espflask.onrender.com](https://espflask.onrender.com)  
Firebase Realtime DB: Used for live sensor data storage

---

## 📁 Project Structure

```bash
flare/
├── index.html         # Dashboard UI
├── styles.css         # Styling for UI
├── script.js          # Real-time data fetch + UI logic
├── .env               # Environment config (ignored)
├── app.py             # Flask backend
├── requirements.txt   # Python dependencies
└── README.md          # You're here!
