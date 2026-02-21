# Setup and Installation

Follow these instructions to get the Threat Intelligence platform running on your local machine.

## Prerequisites
- **Python**: 3.10 or higher
- **Node.js**: 18.x or higher
- **Git**: For cloning the repository

---

## 🐍 Backend Setup (Django)

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd ThreatIntelligence/Backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv .venv
   source .venv/bin/scripts/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables**:
   Create a `.env` file in the `Backend/` directory:
   ```env
   DEBUG=True
   SECRET_KEY=your-secret-key
   DATABASE_URL=sqlite:///db.sqlite3
   NEWS_API_KEY=your_news_api_key_here
   ```

5. **Database Migrations**:
   ```bash
   python manage.py migrate
   ```

6. **Run the server**:
   ```bash
   python manage.py runserver
   ```
   The API will be available at `http://127.0.0.1:8000/`.

---

## ⚛️ Frontend Setup (React)

1. **Navigate to the frontend directory**:
   ```bash
   cd ../Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the `Frontend/` directory:
   ```env
   REACT_APP_API_URL=http://127.0.0.1:8000/api
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```
   The dashboard will be available at `http://127.0.0.1:3000/`.

## Deployment
- **Backend**: Configured for Render via `render.yaml` and `build.sh`.
- **Frontend**: Configured for Vercel via `vercel.json`.
