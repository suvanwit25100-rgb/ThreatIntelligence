# 🌐 Threat Intelligence Platform

### *Modernizing Global Geopolitical Intelligence Gathering & Analysis*

*(Add your tactical dashboard screenshots here to WOW recruiters!)*

## 📖 Project Narrative

In an increasingly volatile world, traditional intelligence gathering methods often fall behind the speed of digital information. This project was born from the need for a **unified, real-time tactical command center** that empowers intelligence agents to visualize global risks and predict future threats using machine learning.

The platform bridges the gap between raw data and actionable intelligence by combining **interactive geospatial visualization**, **real-time news aggregation**, and **ML-driven predictive modeling**.

---

## 🚀 Core Features

- **🛡️ 3D Tactical Interface**: Fully interactive 3D Globe and 2D Maps for visualizing global threat density.
- **🤖 ML-Driven Threat Scoring**: Predicts geopolitical stability scores (0-100) based on 15+ metrics using Scikit-Learn.
- **📡 Real-Time Intel Feed**: Automated news aggregation and classification using NLP to prioritize critical events.
- **🚔 Agent Operations**: Secure management of field agents, mission deployments, and tactical communication.
- **📊 Predictive Analytics**: Historical threat tracking with advanced plotting and anomaly detection.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/)
- **State Management**: React Context API
- **Visualization**: `Globe.gl`, `Three.js`, `Leaflet`, `Recharts`
- **Animations**: `Framer Motion`
- **Styling**: Tailwind CSS + Custom Tactical UI tokens

### Backend
- **Core**: [Django 5.0](https://www.djangoproject.com/) / [Django REST Framework](https://www.django-rest-framework.org/)
- **ML Engine**: `Scikit-Learn`, `Pandas`, `NumPy`, `Joblib`
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **Integration**: NewsAPI, GeoJSON Geospatial data

---

## 🏗️ Engineering Highlights

- **ML Pipeline Integration**: A custom-built ML module tightly integrated with the Django lifecycle, offering real-time prediction endpoints.
- **Decoupled Architecture**: Clear separation between the React frontend and Django backend, connected via a JWT-secured REST API.
- **Tactical Design System**: A custom-themed UI designed for low-light "War Room" environments, prioritizing readability and high-density data.

---

## 📁 Documentation Links

- **[System Architecture](ARCHITECTURE.md)**: Deep dive into the component breakdown and data flow.
- **[Installation Guide](SETUP.md)**: Step-by-step setup for local development.
- **[API Documentation](API_DOCS.md)**: Detailed specifications for all REST and ML endpoints.

---

## 🚦 Quick Start

```bash
# Clone the repository
git clone <repo-url>

# Backend Setup
cd Backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend Setup
cd ../Frontend
npm install
npm start
```

---

## 👩‍💻 Developed By
**AGENT SUVANWIT**
*Threat Intelligence & Special Operations Division*
