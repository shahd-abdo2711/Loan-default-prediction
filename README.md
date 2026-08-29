# Loan Default Prediction

An end-to-end machine learning web application that predicts the likelihood of loan default based on applicant, financial, and loan-related information.

The project combines a machine learning model with a FastAPI backend and a static web frontend to provide an accessible loan default prediction system.

## Live Demo
 
https://shahd-abdo2711.github.io/Loan-default-prediction/

 

## Project Overview

Loan default prediction is a supervised machine learning problem where the goal is to determine whether a loan application is likely to result in default.

This project follows an end-to-end machine learning workflow, starting from data exploration and preprocessing and ending with a deployed web application.

The main workflow includes:

1. Data understanding and exploration
2. Exploratory Data Analysis
3. Data cleaning
4. Feature selection
5. Missing value handling
6. Categorical and ordinal feature encoding
7. Train/validation/test splitting
8. Class imbalance analysis
9. Model training
10. Hyperparameter tuning
11. Model evaluation
12. Model and preprocessing pipeline serialization
13. FastAPI backend development
14. Frontend integration
15. Cloud deployment

## Features

* User registration and authentication
* JWT-based authentication
* User profile management
* Loan default prediction
* Machine learning inference through a REST API
* Interactive API documentation using Swagger UI
* Responsive web frontend
* CORS-enabled backend
* SQLite database for user-related data
* Deployed machine learning backend
* GitHub Pages frontend deployment

## Machine Learning

### Dataset

The project uses the Loan Default Dataset from Kaggle.

Dataset source:

https://www.kaggle.com/datasets/yasserh/loan-default-dataset

The original dataset contains approximately 148,000 records and 34 columns covering different loan, financial, applicant, and property-related attributes.

The target variable is:

```text
Status
```

which represents the loan default outcome.

### Data Understanding and Exploration

Several exploratory analysis steps were performed to understand the dataset and identify important patterns, including:

* Dataset structure and data types
* Missing value analysis
* Target distribution
* Numerical feature distributions
* Categorical feature analysis
* Correlation analysis
* Outlier investigation
* Feature relationships
* Class imbalance analysis

### Feature Selection

Statistical analysis and feature importance techniques were used to investigate the relationship between the available features and the target variable.

Among the numerical features, several variables showed meaningful relationships with the target, including:

* `Upfront_charges`
* `property_value`
* `dtir1`
* `income`
* `Interest_rate_spread`

Multicollinearity was also investigated, particularly between highly correlated variables such as:

* `loan_amount` and `property_value`
* `rate_of_interest` and `Interest_rate_spread`

### Selected Features

The machine learning workflow uses numerical features such as:

* `loan_amount`
* `rate_of_interest`
* `Interest_rate_spread`
* `Upfront_charges`
* `term`
* `property_value`
* `income`
* `Credit_Score`
* `LTV`
* `dtir1`

The `age` feature is handled as an ordinal feature.

Other categorical features are processed using appropriate encoding techniques.

## Data Preprocessing

The preprocessing pipeline includes:

* Median imputation for missing numerical values
* Most-frequent imputation for missing categorical values
* StandardScaler for numerical features
* Ordinal encoding for ordered categorical features
* One-hot encoding for nominal categorical features
* Optional IQR-based outlier capping
* ColumnTransformer for combining multiple preprocessing strategies

The preprocessing pipeline is saved and reused during inference to ensure that new user input is transformed consistently with the training data.

The saved preprocessing pipeline is located at:

```text
backend/ml/preprocessor.pkl
```

## Class Imbalance

The target variable is imbalanced, with approximately:

* 75% majority class
* 25% minority class

Because of this imbalance, accuracy alone was not considered sufficient for evaluating the models.

Different approaches were investigated to address the class imbalance, including:

* Class weighting
* SMOTE

SMOTE was evaluated but did not improve the final model performance. Therefore, class weighting was preferred during model development.

## Models Evaluated

Several classification algorithms were investigated during the project:

* Logistic Regression
* Decision Tree
* Random Forest
* Gradient Boosting
* Support Vector Machine
* K-Nearest Neighbors
* Gaussian Naive Bayes

The models were evaluated using:

* Accuracy
* Precision
* Recall
* F1-score
* ROC-AUC

Because of the class imbalance, particular attention was given to precision, recall, F1-score, and ROC-AUC.

## Hyperparameter Tuning

Hyperparameter tuning was performed on the candidate models to identify configurations with better predictive performance.

The final selected model was a tuned Gradient Boosting classifier.

## Final Model

The final model selected for deployment is the:

**Tuned Gradient Boosting Classifier**

The tuned model was selected based on its overall performance across the evaluation metrics, with particular consideration given to ROC-AUC and classification performance.

The trained model is serialized and stored at:

```text
backend/ml/model.pkl
```

## Final Model Performance

The final Tuned Gradient Boosting model achieved the following results on the test set:

| Metric   |  Score |
| -------- | -----: |
| Accuracy |   0.88 |
| ROC-AUC  | 0.8584 |

### Classification Report

| Class                | Precision |   Recall | F1-Score |  Support |
| -------------------- | --------: | -------: | -------: | -------: |
| 0                    |      0.87 |     0.98 |     0.92 |     5651 |
| 1                    |      0.90 |     0.56 |     0.69 |     1849 |
| **Macro Average**    |  **0.89** | **0.77** | **0.81** | **7500** |
| **Weighted Average** |  **0.88** | **0.88** | **0.87** | **7500** |

The final model achieved a ROC-AUC of **0.8584**, indicating good discrimination between the two target classes.

For class 1, the model achieved a precision of **0.90** and a recall of **0.56**. This means that the model's positive predictions have relatively high precision, while the recall indicates that some positive cases are not detected.

## Backend

The backend is built using FastAPI and provides REST API endpoints for:

* User registration
* User authentication
* User profile management
* Loan default prediction

The API also provides automatically generated interactive documentation through Swagger UI.

API documentation:

https://loan-default-prediction.fastapicloud.dev/docs

## API Endpoints

### Authentication

#### Register

```text
POST /auth/register
```

Creates a new user account.

#### Login

```text
POST /auth/login
```

Authenticates an existing user and returns an access token.

### User

#### Get Current User

```text
GET /users/me
```

Returns the profile of the authenticated user.

#### Update Current User

```text
PUT /users/me
```

Updates the authenticated user's profile.

### Prediction

```text
POST /predict
```

Receives loan-related information and returns the machine learning prediction.

The exact request and response schemas can be explored through the Swagger documentation.

## Frontend

The frontend is implemented using:

* HTML5
* CSS3
* JavaScript

The frontend communicates with the deployed FastAPI backend through HTTP requests.

The backend URL is configured in:

```text
frontend/js/config.js
```

For the deployed application:

```javascript
const API_BASE_URL = "https://loan-default-prediction.fastapicloud.dev";
```

The frontend provides the user interface for:

* Registration
* Login
* User profile
* Loan information input
* Prediction results

## Database

The backend uses SQLite together with SQLAlchemy ORM.

The database is used to store application-related user information.

Technologies used for the database layer include:

* SQLite
* SQLAlchemy
* Pydantic

The database is separate from the machine learning inference pipeline.

## Project Structure

```text
Loan-default-prediction/
│
├── backend/
│   ├── database/
│   │   ├── database.py
│   │   └── models.py
│   │
│   ├── ml/
│   │   ├── model.pkl
│   │   └── preprocessor.pkl
│   │
│   ├── routers/
│   │   ├── auth.py
│   │   ├── users.py
│   │   └── prediction.py
│   │
│   ├── schemas/
│   │   └── auth.py
│   │
│   ├── dependencies.py
│   ├── security.py
│   └── main.py
│
├── frontend/
│   ├── css/
│   ├── imgs/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── profile.html
│
├── notebooks/
│   ├── Data_Understanding.ipynb
│   ├── EDA.ipynb
│   ├── Data_Cleaning&Feature_Selection.ipynb
│   ├── Train_Val_Test_Split.ipynb
│   ├── Check_Class_Imbalance_&_Baseline_Models.ipynb
│   └── Machine_Learning_Model_Development_Evaluation_ (1).ipynb
│
├── .gitignore
├── pyproject.toml
├── requirements.txt
└── README.md
```

## Deployment

The project uses separate deployment platforms for the frontend and backend.

### Frontend Deployment

The frontend is deployed using GitHub Pages.

Live application:

https://shahd-abdo2711.github.io/Loan-default-prediction/

### Backend Deployment

The FastAPI backend is deployed using FastAPI Cloud.

Live API:

https://loan-default-prediction.fastapicloud.dev

Swagger API documentation:

https://loan-default-prediction.fastapicloud.dev/docs

## Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/shahd-abdo2711/Loan-default-prediction.git
cd Loan-default-prediction
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

On Windows:

```bash
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Backend

From the project root:

```bash
fastapi dev
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

### 5. Run the Frontend

The frontend is a static HTML/CSS/JavaScript application.

It can be opened using a local static server such as VS Code Live Server.

Open:

```text
frontend/index.html
```

Make sure the API URL in:

```text
frontend/js/config.js
```

matches the backend you want to use.

For local backend testing:

```javascript
const API_BASE_URL = "http://127.0.0.1:8000";
```

For the deployed backend:

```javascript
const API_BASE_URL = "https://loan-default-prediction.fastapicloud.dev";
```

## Environment Variables

Sensitive configuration values should not be committed to the repository.

For example:

```text
SECRET_KEY=your-secret-key
```

Environment files such as `.env` are excluded from version control using `.gitignore`.

## Data and Notebooks

The project notebooks document the machine learning development process, including:

* Data understanding
* Exploratory data analysis
* Data cleaning
* Feature selection
* Train/validation/test splitting
* Class imbalance analysis
* Model development
* Hyperparameter tuning
* Model evaluation

Large dataset files and generated CSV files are excluded from the Git repository to keep the repository lightweight.

The trained model and preprocessing pipeline required for inference are stored under:

```text
backend/ml/
```

## Technologies Used

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Joblib
* Jupyter Notebook

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Python-JOSE
* SQLite
* Uvicorn

### Frontend

* HTML5
* CSS3
* JavaScript

### Deployment

* FastAPI Cloud
* GitHub Pages
* GitHub

## Future Improvements

Potential future improvements include:

* Further hyperparameter optimization
* Experimenting with additional ensemble models
* Improving model explainability using SHAP or similar techniques
* Adding prediction probability visualization
* Improving API validation and error handling
* Adding automated unit and integration tests
* Adding CI/CD pipelines
* Migrating from SQLite to a production-grade database
* Adding model monitoring
* Tracking model performance over time
* Improving frontend accessibility and user experience

## Project Goal

The main goal of this project is to demonstrate a complete machine learning application lifecycle.

The project starts with raw financial data and follows the complete workflow through data analysis, preprocessing, feature engineering, model development, hyperparameter tuning, evaluation, API development, frontend integration, and cloud deployment.

The final result is a deployed web application that allows users to interact with a machine learning model through a user-friendly frontend and a RESTful FastAPI backend.

## Author

**Shahd Hussein Abd-elmaksoud**

GitHub:

https://github.com/shahd-abdo2711

Project Repository:

https://github.com/shahd-abdo2711/Loan-default-prediction
