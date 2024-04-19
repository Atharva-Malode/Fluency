# Fluency - Language Learning App

Fluency is a language learning application designed to facilitate language acquisition through interactive exercises. Admins can create exercises in various languages, while students can answer them to earn points, compete with peers, track their progress, and more.

## Features

- [x] Exam Proctoring with Advanced Security Measures: Utilizes multithreading for real-time monitoring of voice and camera visuals. Ensures exam integrity by detecting suspicious behaviors, such as looking away from the screen or unauthorized aids. Enhances the security of the examination process by employing advanced computer vision algorithms.
- [x] Answer Exercises to Earn Points and Track Progress
- [x] Language Preference Selection Once Uploaded by Admin
- [x] Leaderboard: Top Performers and Competitive Rankings for progress comparison.
- [x] Authentication: Secure Access with login and signup functionalities.
- [x] Responsive Design: Mobile-Friendly for seamless cross-device experience.


---

### **How to Set Up & Start the Application**

#### Cloning the Project
1. Clone the project repository:
    ```bash
    git clone https://github.com/Atharva-Malode/Fluency-Language-Learning-app.git
    ```

#### Frontend Setup
2. Navigate to the project directory in the terminal:
    ```bash
    cd fluency
    cd frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the frontend server:
    ```bash
    npm run dev
    ```

#### Backend Setup
5. In a different terminal (e.g., using VS Code terminal):

6. Navigate to the backend directory:
    ```bash
    cd fluency
    cd backend
    ```

7. Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

8. Start the backend server with Uvicorn:
    ```bash
    uvicorn main:app --reload
    ```

#### Database Setup
9. Ensure MongoDB Compass is installed.

10. Get the connection string from MongoDB Compass.

11. Paste the connection string into `main.py`:
    ```python
    # Inside the connect("") function in main.py
    connect("<usually localhost:27017>")
    ```

12. Note:
    - Ensure you have a database named 'fluency'.
    - Inside the 'language' database, ensure there is a collection named 'questions' and a user present.
      

#### Viewing Swagger Documentation for Backend
13. Access Swagger docs:
    - Navigate to the link (usually localhost:8000) in your browser.
    - Append "/docs" to the link (e.g., localhost:8000/docs) to view the Swagger documentation.

#### Open the Frontend Link
14. Open the frontend application by navigating to [link available in frontend terminal, usually localhost:5173] in your browser.

Your application is now set up and ready to use!

---
### **Frontend Overview**

<!-- First Row -->
<p align="center">
  <img src="assets/Frontend-home.png" alt="Home Page" width="400"/>
  <img src="assets/Frontend-Leaderboard.png" alt="Leaderboard" width="400"/>
</p>

<!-- Second Row -->
<p align="center">
  <img src="assets/fFrontend-userprofile.png" alt="User Profile" width="400"/>
  <img src="assets/Frontend-user-blocked.png" alt="User blocked after 5 warnings" width="400"/>
</p>

<!-- Third Row -->
<p align="center">
  <img src="assets/Frontend-question2.png" alt="Question 2" width="400"/>
  <img src="assets/Sign-up-frontend.png" alt="Sign Up" width="400"/>
</p>

---

### **Backend Overview**

The backend is powered by **FastAPI**, a high-performance web framework for Python APIs, known for its speed and efficiency.

#### Application Structure

- **Entry Point**: `main.py` defines all routes and their functionalities.

#### Routes in `main.py`

- `GET /`: Read Root
- `POST /signup`: Sign Up (required: username and password)
- `POST /token`: Login (required: username and password)
- `GET /user_data`: Get User Data
- `POST /add_question`: Add Question (require: answer submitted by user, whether it is wrong or right, level of the user's answer, points scored, time taken by the user) [add response to database]
- `POST /question`: Get Question (to get the next question)
- `GET /leaderboard`: Get Leaderboard
- `GET /warningS` : Endpoint is used to increment the warning count, if the user is detected cheating
- `GET /start_exam` : To start the exam and online proctoring.
The backend includes Swagger UI, offering an intuitive interface to explore routes, parameters, outputs, and test functionalities.

<p align="center">
  <img src="assets/backend-swagger-1.png" alt="Authentication" width="400"/>
  <img src="assets/backend-swagger-2.png" alt="Update" width="400"/>
</p>

---
### **MongoDB Overview**

The application utilizes MongoDB, a NoSQL database, to store and manage data efficiently.

#### Database Structure

MongoDB is structured with two collections:

- **Users Collection**: Stores user data including hashed passwords, unique usernames, arrays of questions to track submitted answers, total points, and a list of preferred languages.

- **Tests Collection**: Contains exercises categorized by language. Each exercise includes an array of questions with answer explanations, options, and exercise numbers.

<p align="center">
  <img src="assets/Mongo-user-data.png" alt="Question 2" width="400"/>
  <img src="assets\mongo-questions.png" alt="Sign Up" width="400"/>
</p>

---


### Exam Proctoring using Computer Vision

In addition to providing a platform for taking exams, our system also incorporates exam proctoring using computer vision technology. This feature ensures the integrity of the examination process by monitoring the test-taker's behavior and environment during the exam. Through real-time analysis of video feeds, the system can detect suspicious activities such as looking away from the screen, multiple faces detected, or unauthorized objects in the vicinity.

<p align="center">
  <img src="assets/computer-vision.png" alt="Exam Proctoring" width="600"/>
</p>

The image above illustrates how our exam proctoring system works. It employs advanced computer vision algorithms to monitor the test-taker's actions and surroundings, helping to maintain the fairness and security of the examination process.
---
