# PaiseWale

PaiseWale is a modern, feature-rich application built with a powerful tech stack to deliver a seamless user experience. The project leverages both backend and frontend technologies to create an efficient, scalable, and interactive platform.

## Tech Stack

### Backend:
- **FastAPI**: A high-performance Python framework for building APIs with speed and simplicity.

### Frontend:
- **Node.js**
- **Next.js**: For server-side rendering and static site generation.
- **TypeScript**: Ensuring type safety and enhancing code quality.

### Additional Tools and Integrations:
- **Phidata's Agents**: Utilized to enhance specific functionalities within the project.

## Key Features
- **Comprehensive API Integration**: Seamlessly connects backend and frontend components.
- **Modern UI/UX**: Built with Next.js and TypeScript for a responsive and dynamic interface.
- **Scalable Architecture**: Designed for high performance and adaptability.
- **Agent Support**: Integration of Phidata's agents for additional automation and intelligence.

## Prerequisites
Before running the project, ensure you have the following installed:

- **Python**: Required for the FastAPI backend.
- **Node.js**: For the frontend development.
- **Yarn**: The package manager used to install dependencies and manage the project.

## Installation

Follow these steps to set up and run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/paise-wale.git
   cd paise-wale
   ```

2. Install dependencies using Yarn:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the project root.
   - Add required environment variables for both the backend and frontend.

4. Start the backend server:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install backend dependencies from `requirements.txt`:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the FastAPI server using Uvicorn:
     ```bash
     uvicorn main:app --reload
     ```

5. Start the frontend server:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install frontend dependencies:
     ```bash
     yarn install
     ```
   - Start the Next.js development server:
     ```bash
     yarn dev
     ```

6. Access the application:
   Open your browser and navigate to `http://localhost:3000`.

## Running Tests
- Backend Tests:
  ```bash
  cd backend
  pytest
  ```
- Frontend Tests:
  ```bash
  cd frontend
  yarn test
  ```

## Contributing
We welcome contributions to PaiseWale! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.
