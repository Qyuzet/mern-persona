# MERN-Persona
<div align="center">
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/></code>
	<code><img width="50" src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png" alt="Vite" title="Vite"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png" alt="REST" title="REST"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183911547-990692bc-8411-4878-99a0-43506cdb69cf.png" alt="GCP" title="GCP"/></code>
	<code><img width="50" src="https://cdn.brighttalk.com/ams/california/images/channel/19357/image_840418.png" alt="Auth0" title="Auth0"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" alt="Postman" title="Postman"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/189715289-df3ee512-6eca-463f-a0f4-c10d94a06b2f.png" alt="Figma" title="Figma"/></code>
</div>
<br/>

**MERN-Persona** is a web application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). The project is designed to analyze essays and provide personality predictions based on the written content. It is specifically tailored to support **HR departments** or **recruiters** in gaining deeper insights into their employees' or candidates' personalities efficiently and effectively. [TRY NOW!](https://mern-persona.onrender.com/authenticate)

![image](https://github.com/user-attachments/assets/03f539c0-ed9f-4869-9ff0-70530776e1f6)

<div align="center">
  <table>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/56421521-9486-487f-84f2-e34a0d32b632" alt="Image 1"/></td>
      <td><img src="https://github.com/user-attachments/assets/b12730cd-541b-410f-ba1e-3af919fd0f5b" alt="Image 2"/></td>
    </tr>
  </table>
</div>


## Key Features

1. **Authentication**:
   - Login and sign-up via manual credentials or Google OAuth 2.0.
   
2. **Essay Analysis (Alpha Model)**:
   - Analyze text extracted from PDF files (single or multiple).
   - Predict the writer's personality based on their essay.
   - Provide insights into strengths, weaknesses, and MBTI (e.g., INTJ, ENFP) predictions.
   - Generate personality scores and a summary.

3. **Text-to-Speech**:
   - Converts the analyzed essay into synthesized speech using AI-powered text-to-speech (TTS) APIs.

4. **User Data Management**:
   - Store user profiles and analysis data securely in MongoDB.

5. **HR Application**:
   - Designed to help HR departments reduce employee turnover by better understanding employees' personalities.
   - Offers a cost-effective alternative to hiring psychologists or psychiatrists for personality insights.

## Tech Stack

### Frontend:
- **React.js** (with TypeScript for type safety)
- **Tailwind CSS** for responsive and modern UI
- **Zustand & Router** for API communication

### Backend:
- **Node.js** with **Express.js** for server-side logic
- **MongoDB** as the NoSQL database
- **Google OAuth 2.0** for third-party authentication
- **OpenAI API** for advanced personality analysis
- **PDF-to-Text Conversion** libraries for extracting essay content

### Additional Tools:
- **TypeScript** for frontend file conversions
- **ESLint** for code linting
- **Dotenv** for managing environment variables

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Qyuzet/mern-persona.git
   cd mern-persona
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create an `.env` file in the root of the backend directory and specify the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   OPENAI_API_KEY=your_openai_api_key
   PORT=5000
   ```

4. Start the application:
   ```bash
   # Start the backend server
   cd backend
   npm start
   
   # Start the frontend development server
   cd ../frontend
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## File Structure

### Backend:
- `server.js`: Entry point for the backend server.
- `config/db.js`: MongoDB connection configuration.
- `controller/user.controller.js`: Handles user-related logic.
- `model/user.model.js`: Defines the user schema for MongoDB.
- `router/user.route.js`: API endpoints for user-related operations.

### Frontend:
- `src/`: Contains all the React components.
- `public/index.html`: Main HTML file for the React app.
- `tailwind.config.js`: Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.

## Future Plans
- Add support for additional personality frameworks beyond MBTI.
- Improve the TTS experience with more natural voice synthesis.
- Add user role management for HR teams and employees.
- Enable export options for analysis results (PDF, Excel, etc.).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.




## SOP: Persona Web Application Demo

### Objective:

To demonstrate the functionality of the Persona web application for analyzing employee personalities based on their essays or CVs.

### Key Steps:

1. **Authentication and Sign-Up:**

   - Use OAuth2 from Google for authentication.
   - Sign up for a new account if needed.
   - Sign in with your credentials.

2. **Analysis:**

   - Click on a PDF to analyze a person's personality.
   - Search for the person you want to analyze.
   - Click on the payload and analyze the essay to get results like probable MBTI, good and bad aspects.

3. **Manual Append:**

   - Type an essay manually in the system.
   - Click on "propagate" to add the data to the current payload.

4. **Bulk Analysis:**

   - Open multiple PDFs to append automatically.
   - Click on "bulk auto" to analyze each one automatically.

5. **Quality Control:**

   - Ensure the quality of the data inside the essay for accurate results.
   - Avoid using AI-generated content for analysis.

6. **Exploration and Future Models:**

   - Explore more robust document analysis options in future versions.
   - Consider the Explorer and Quanta models for deeper analysis.

7. **Logout:**

   - Log out of the system once analysis is complete.

### Cautionary Notes:

- Quality of results depends on the quality of data in the essays.
- Avoid using AI-generated content for analysis to ensure accuracy.
- Use the desktop version of the interface for optimal functionality.

### Tips for Efficiency:

- Clear unnecessary data to keep the system organized.
- Regularly update to newer models for enhanced analysis capabilities.
- Use desktop version for optimal user experience.

By following these steps, you can effectively demonstrate the Persona web application and analyze employee personalities with accuracy and efficiency.

### Link to Demo Video

<https://loom.com/share/7f69e2b36a0a4b52921fe7185c9f0e06?src=composer>
