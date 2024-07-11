# EduSphere
AN ED-TECH PLATFORM

## Project Description
EduSphere is a fully functional ed-tech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.
<br>
<br>
**EduSphere aims to provide:**
<br>
A seamless and interactive learning experience for students, making education more accessible and engaging.
<br>
A platform for instructors to showcase their expertise and connect with learners across the globe.
<br><br>
In the following sections, we will cover the technical details of the platform, including:
1.	**System architecture:** The high-level overview of the platform's components and diagrams of the architecture.
2.	**Front-end:** The description of the front-end architecture, user interface design, features, and functionalities of the front-end, and frameworks, libraries, and tools used.
3.	**Back-end:** The description of the back-end architecture, features and functionalities of the back-end, frameworks, libraries, tools used, and data models and database schema.
4.	**API Design:** The description of the API design, list of API endpoints, their functionalities, and sample API requests and responses.
5.	**Deployment:** The description of the deployment process, hosting environment and infrastructure, and deployment scripts and configuration.
6.	**Testing:** The description of the testing process, types of testing, test frameworks, and tools used.
7.	**Future Enhancements:** The list of potential enhancements to the platform, explanation of how these enhancements would improve the platform, estimated timeline, and priority for implementing these enhancements.
In summary, EduSphere is a versatile and intuitive ed-tech platform designed to provide students with an immersive learning experience and a platform for instructors to showcase their expertise.
<br>
In the following sections, we will delve into the technical details of the platform, which will provide a comprehensive understanding of the platform's features and functionalities.
<br><br>

## System Architecture
The EduSphere ed-tech platform comprises three main components: front end, back end, and database, following a client-server architecture.

**Front-end**
It is built with ReactJS, enabling dynamic and responsive user interfaces crucial for an engaging learning experience. Communicates with the back end via RESTful API calls.

**Back-end**
Developed using NodeJS and ExpressJS, providing scalable APIs for user authentication, course management, and content delivery. Manages logic for processing and storing course content and user data.

**Database**
Utilizes MongoDB, a NoSQL database for flexible storage of course materials (videos, images, PDFs) and user information, supporting structured and semi-structured data.

**Architecture Diagram**
High-level diagram illustrating the EduSphere ed-tech platform architecture.


## Front-end
The front end is part of the platform that the user interacts with. It's like the "face" of the platform that the user sees and interacts with.
<br>
**Pages Include:**

**For Students:**
- **Homepage:** Introduction to the platform, course list, and user details.
- **Course List:** Listings of available courses with descriptions and ratings.
- **Wishlist:** Displays courses added for future consideration.
- **Cart Checkout:** Allows users to complete course purchases.
- **Course Content:** Detailed content for each course, including videos and related material.
- **User Details:** Account information such as name, email, etc.
- **User Edit Details:** Enables users to modify account information.

**For Instructors:**
- **Dashboard:** Overview of courses, ratings, and feedback.
- **Insights:** Detailed metrics like views and clicks for courses.
- **Course Management Pages:** Create, update, delete courses, manage content and pricing.
- **View and Edit Profile Details:** Manage account information.

**For Admin (future scope):**
- **Dashboard:** Overview of courses, instructors, and students.
- **Insights:** Detailed metrics on users, courses, and revenue.
- **Instructor Management:** Manage instructor accounts, courses, and ratings.
- **Other Relevant Pages:** Includes user and course management tools.

**Frameworks and Tools:**
Built with ReactJS for dynamic interfaces, styled using CSS and Tailwind for responsiveness. Additional npm packages enhance functionality. State management handled by Redux. Developed in VSCode for an efficient coding environment.

## Back-end

**Architecture Description:**
EduSphere employs a monolithic architecture, utilizing Node.js and Express.js for backend development, with MongoDB as its primary database. This approach consolidates all application modules into a single large program, enhancing control, security, and performance.

**Features and Functionalities:**

- **User Authentication and Authorization:** Supports signup, log-in via email/password, OTP verification, and forgot password functionality.
- **Course Management:** Instructors manage CRUD operations for courses, including content and media. Students can view and rate courses.
- **Payment Integration:** Integrated Razorpay for seamless course enrollment and payment processing.
- **Cloud-based Media Management:** Utilizes Cloudinary for efficient storage and management of images, videos, and documents.
- **Markdown Formatting:** Course content is stored in Markdown for enhanced display and rendering on the front end.

**Frameworks, Libraries, and Tools:**

- **Node.js:** Primary backend framework.
- **MongoDB:** NoSQL database for flexible data storage.
- **Express.js**: Web application framework simplifying backend development.
- **JWT:** JSON Web Tokens for secure authentication.
- **Bcrypt:** Ensures password hashing for enhanced data security.
- **Mongoose:** Object Data Modeling library facilitating MongoDB interactions.
**Data Models and Database Schema:**

- **Student Schema:** Includes fields like name, email, password, and course details.
- **Instructor Schema:** Includes fields like name, email, password, and course details.
- **Course Schema:** Includes fields like course name, description, instructor details, and media content.

## API Design:

The EduSphere platform's API is designed following the REST architectural style. The API is implemented using Node.js and Express.js. It uses JSON for data exchange and follows standard HTTP request methods such as GET, POST, PUT, and DELETE.
<br>
**Sample list of API endpoints and their functionalities:**
1.	_/api/auth/signup (POST)_ - Create a new user (student or instructor) account.
2.	_/api/auth/login (POST)_ – Log in using existing credentials and generate a JWT token.
3.	_/api/auth/verify-otp (POST)_ - Verify the OTP sent to the user's registered email.
4.	_/api/auth/forgot-password (POST)_ - Send an email with a password reset link to the registered email.
5.	_/api/courses (GET)_ - Get a list of all available courses.
6.	_/api/courses/:id (GET)_ - Get details of a specific course by ID.
7.	_/api/courses (POST)_ - Create a new course.
8.	_/api/courses/:id (PUT)_ - Update an existing course by ID.
9.	_/api/courses/:id (DELETE)_ - Delete a course by ID.
10.	_/api/courses/:id/rate (POST)_ - Add a rating (out of 5) to a course.
<br>

**Sample API requests and responses:**
<br>
1.	GET _/api/courses_: Get all courses <br>
●	Response: A list of all courses in the database
3.	GET _/api/courses/:id:_ Get a single course by ID <br>
●	Response: The course with the specified ID
4.	POST _/api/courses_: Create a new course <br>
●	Request: The course details in the request body
●	Response: The newly created course
5.	PUT _/api/courses/:id:_ Update an existing course by ID <br>
●	Request: The updated course details in the request body
●	Response: The updated course
6.	DELETE _/api/courses/:id: _Delete a course by ID <br>
●	Response: A success message indicating that the course has been deleted.
<br><br>
In conclusion, the REST API design for the EduSphere ed-tech platform is a crucial part of the project. The API endpoints and their functionalities are designed to ensure seamless communication between the front-end and back-end of the application. By following RESTful principles, the API will be scalable, maintainable, and reliable. The sample API requests and responses provided above illustrate how each endpoint will function and what kind of data it will accept or return. With this API design, EduSphere will be able to provide a smooth user experience while ensuring security and stability.

## Deployment

EduSphere's deployment involves hosting diverse cloud-based services to ensure scalability, security, and reliability. <br>
Here’s how each component will be deployed:

- **Front-end:** Hosted on Vercel, leveraging its fast and scalable environment for static sites built with React.
- **Back-end:** Deployed on Render or Railway, cloud-based services ideal for Node.js and MongoDB applications, ensuring scalability and reliability.
- **Media Files:** Hosted on Cloudinary, a robust cloud-based media management platform offering features like automatic image optimization and transformation.
- **Database:** Hosted on MongoDB Atlas, providing a highly available and secure environment with features such as automatic scaling and disaster recovery.
This deployment strategy ensures a stable and scalable hosting environment for EduSphere, facilitating seamless global access to the platform.

## Conclusion

This document has provided a comprehensive overview of the architecture, features, and deployment strategy for the EduSphere ed-tech platform. Utilizing the MERN stack and REST API design, EduSphere ensures robust functionality and seamless user interaction.

Deployment involves leveraging Vercel for front-end hosting, Render.com for the back-end, and MongoDB Atlas for database management, ensuring scalability and reliability.

Looking ahead, potential enhancements to the platform have been identified, with timelines and priorities outlined to further improve functionality and user experience.

While significant achievements have been made in implementing desired features and creating a user-friendly interface, challenges such as technology integration and debugging remain critical aspects of the ongoing development process. These challenges will be met with strategic problem-solving to ensure the platform's continued growth and success.
