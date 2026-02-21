# API Documentation

The Threat Intelligence platform exposes a RESTful API for intelligence data and ML predictions.

## Authentication
Most endpoints require a JWT token in the `Authorization` header.
`Authorization: Bearer <your_token>`

---

## Intelligence Endpoints

### 1. Get Intel Alerts
- **URL**: `/api/alerts/`
- **Method**: `GET`
- **Filters**: `priority` (CRITICAL, HIGH, LOW), `country`
- **Response**: List of alert objects.

### 2. Threat History
- **URL**: `/api/threats/history/<country_name>/`
- **Method**: `GET`
- **Params**: `days` (default: 30)
- **Response**: Historical threat scores for graphing.

### 3. Live News
- **URL**: `/api/news/<country_name>/`
- **Method**: `GET`
- **Description**: Fetches real-time geopolitical news via NewsAPI.

---

## Machine Learning Endpoints

### 1. Predict Threat Score
- **URL**: `/api/ml/predict/`
- **Method**: `GET`
- **Description**: Calculates a threat score based on input features.
- **Payload Example**:
  ```json
  {
    "military_budget": 150,
    "active_conflicts": 2,
    "cyber_index": 85
  }
  ```

### 2. Anomaly Detection
- **URL**: `/api/ml/anomaly/`
- **Method**: `POST`
- **Description**: Uses Isolation Forests to detect unusual patterns in incoming alerts.

### 3. Intel Text Classification
- **URL**: `/api/ml/classify/`
- **Method**: `POST`
- **Description**: Classifies raw intel text into categories (Stability, Military, Cyber, etc.).

### 4. Agent Scoring
- **URL**: `/api/ml/agent-score/`
- **Method**: `POST`
- **Description**: Predicts agent suitability for specific mission types.
