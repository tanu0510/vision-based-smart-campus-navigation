# 🧭 Vision-Based Smart Campus Navigation System

An AI-powered smart campus navigation system designed for **Galgotias University, Greater Noida**.

The system allows users to upload an image of a campus signboard, room, block, or location. Using **OCR-based computer vision**, the application detects the location and displays a navigation route on an interactive campus map.

## 🚀 Key Features

- 📷 Image-based campus location detection
- 🤖 OCR using Python and EasyOCR
- 🗺️ Interactive campus map using Leaflet
- 📍 Real campus coordinates
- 🧭 Dijkstra shortest-path routing
- 📡 Live GPS location support
- 🔄 Live location to destination navigation
- 🔎 Automatic location matching from detected text
- 🏫 Multiple campus blocks, gates, hostel, cafeteria and parking
- 🔐 Local authentication and protected dashboard
- 📱 Responsive modern user interface

## 🎯 Project Objective

Large university campuses can be difficult to navigate, especially for new students, visitors and parents.

This project provides a smart navigation system that combines:

**Computer Vision + OCR + Campus Mapping + Graph Algorithms + GPS**

to help users identify their current campus location and navigate toward their destination.

## ⚙️ How It Works

```text
Campus Image
      ↓
Image Upload
      ↓
Node.js / Express Backend
      ↓
Python + EasyOCR
      ↓
Text Detection
      ↓
Location Matching
      ↓
Campus Database
      ↓
Dijkstra Algorithm
      ↓
Shortest Route
      ↓
Interactive Leaflet Map
```

## 🧠 AI Location Detection

The user uploads an image containing a campus signboard or location name.

The backend sends the image to the Python OCR module.

EasyOCR extracts text such as:

```text
AI BLOCK
A BLOCK
C BLOCK
CAFETERIA
```

The detected text is then matched against the campus location database and its aliases.

Once a location is identified, it can automatically be selected as the navigation destination.

## 🗺️ Smart Campus Navigation

Campus locations are represented as nodes in a graph.

Dijkstra's shortest-path algorithm calculates an optimized route between the starting location and destination.

Example:

```text
Gate 1
  ↓
AI Block
  ↓
A Block
  ↓
Cafeteria
```

The calculated route is displayed as a route line on the interactive map.

## 📍 Live GPS Navigation

The system also supports browser geolocation.

When the user enables **Use My Live Location**, the application:

1. Reads the current GPS coordinates.
2. Finds the nearest known campus navigation point.
3. Uses it as the starting node.
4. Calculates the shortest path to the selected destination.
5. Updates the current location as GPS data changes.

> GPS accuracy depends on the user's device, browser permissions and signal conditions.

## 🏫 Campus Locations

The current campus database includes locations such as:

- Gate 1
- Gate 2 / Punjab National Bank
- Gate 4
- AI Block
- A Block
- B Block
- C Block
- D Block / Physiotherapy OPD
- Cafeteria
- Boys Hostel
- Parking
- School of Hospitality

Additional campus locations and walking-path nodes can be added to improve navigation accuracy.

## 💻 Technology Stack

### Frontend

- React
- Vite
- React Router
- Axios
- React Leaflet
- Leaflet
- CSS

### Backend

- Node.js
- Express.js
- Multer
- CORS

### AI / Computer Vision

- Python
- EasyOCR
- PyTorch
- OpenCV

### Algorithms

- Dijkstra's Shortest Path Algorithm
- Nearest campus-node calculation

### Mapping

- Leaflet
- OpenStreetMap
- GPS / Browser Geolocation API

## 📂 Project Structure

```text
vision-based-smart-campus-navigation/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   │   ├── campusLocations.js
│   │   │   ├── campusGraph.js
│   │   │   └── dijkstra.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── Map.jsx
│   │   │   └── About.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── uploads/
│   └── package.json
│
├── ai/
│   └── detect.py
│
├── .gitignore
└── README.md
```

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tanu0510/vision-based-smart-campus-navigation.git
```

Move into the project directory:

```bash
cd vision-based-smart-campus-navigation
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The Vite development server will provide a local URL, commonly:

```text
http://localhost:5173
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

Start the backend:

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

### 4. Install Python AI Dependencies

Install the required Python packages:

```bash
pip install easyocr opencv-python
```

The first EasyOCR execution may download the required recognition models.

## 🔄 Complete Application Flow

```text
User
 ↓
Home Page
 ↓
AI Detection
 ↓
Upload Campus Image
 ↓
Backend Receives Image
 ↓
EasyOCR Detects Text
 ↓
Location Matching
 ↓
Navigate to Location
 ↓
Interactive Campus Map
 ↓
Dijkstra Shortest Path
 ↓
Route Display
```

Alternatively:

```text
Live GPS
 ↓
Nearest Campus Node
 ↓
Select Destination
 ↓
Dijkstra
 ↓
Live Campus Route
```

## 🔐 Authentication

The current application includes local browser-based authentication for project demonstration.

Login state is stored using `localStorage`, and the dashboard is protected from direct access when the user is logged out.

> This authentication system is intended for demonstration purposes and should be replaced with secure server-side authentication for a production deployment.

## 🔮 Future Improvements

Future versions can include:

- Detailed pedestrian walkway graph
- Turn-by-turn navigation
- Voice navigation
- Estimated walking distance and time
- QR-based location identification
- Indoor floor navigation
- Classroom-level navigation
- Accessibility-friendly routes
- Database-backed authentication
- Admin dashboard for managing campus locations
- Mobile application
- Real-time route deviation detection

## 🎓 Academic Use Case

This project demonstrates practical integration of:

- Artificial Intelligence
- Computer Vision
- Optical Character Recognition
- Data Structures and Algorithms
- Graph Theory
- Web Development
- Geolocation
- Interactive Mapping

## 👩‍💻 Developer

**Tanu Singh**

B.Tech — Computer Science & Engineering  
Specialization: Artificial Intelligence & Machine Learning  
Galgotias University

## 🔗 Repository

https://github.com/tanu0510/vision-based-smart-campus-navigation

---

### Vision-Based Smart Campus Navigation System

**See it. Detect it. Navigate it.** 🧭