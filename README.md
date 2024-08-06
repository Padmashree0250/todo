This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

`				                                  TODO PROJECT 
Key Features
Task List: Displays a list of tasks that can be expanded to show additional details.

Expandable Task Details: When a task is expanded, it shows a description and a timestamp of the last update.
Task Management: Likely includes adding, editing, and deleting tasks and also marking it done using checkbox.

Components
Task List Component: A component that displays the list of tasks. Each task can be expanded to show more details.
Task Detail Component: Displays detailed information about a task, including its description and timestamp.
Form Component (if present): A form for adding or editing tasks.

API Functions
The application might use API functions to interact with a backend server for tasks such as fetching, creating, updating, or deleting tasks.
Rendering
Server-Side Rendering (SSR): The consideration for implementing SSR is  to potentially improve performance and SEO.
Technologies Used
Frontend Framework:  using React with Next.js for the frontend.
Styling:  using a styling solution like Tailwind CSS.
Backend : the data is stored in a json file 
This project aims to provide a user-friendly interface for managing tasks, with the flexibility to expand tasks for more information.





IMPLEMENTATION
 Frontend Implementation
a. Setup and Configuration

Next.js: Set up a Next.js project, which includes setting up the directory structure, installing dependencies, and configuring settings.
Installation of the dependencies are done like daisy ,tailwind css ,json server.

b. Components
Task List Component
UI Layout: Displayed a list of tasks with titles.
Expand/Collapse Functionality: Implemented an onClick event to toggle the display of task details. This can be managed with state, such as useState for tracking the expanded state.
Dynamic Data Loading: Fetch tasks from local state using api.

Task Detail Component
Task Description and Timestamp: Displayed detailed information when a task is expanded.

Task Form Component
Form Elements: Included fields for task title, description, and time stamp when last updated.
Submit Functionality: Implement form submission to add and update tasks.

API Integration
Fetching Data: Used fetch  to communicate with the backend API. For SSR, use Next.js's getServerSideProps.
CRUD Operations: Implement functions to create, edit or update, and delete tasks.
				

SETUP AND EXECUTION 
INSTALLATION: install daisy,json-server,tailwind css using the following commands.
npm install -D tailwindcss postcss autoprefixer
npm install daisyui
npm install -g json-server,npm install --save-dev json-server
These commands are used to install the libraries required for the project 
EXECUTION:firstly,we need to execute the json server so that run-time fetching is easier to run the json server we need open new terminal for that and execute using following command
npm run json-server
Once this is done now we need to run the main program that is nextjs program to run that use command 
npm run dev 
It will be hosted in http://localhost:3000/ copy paste the link in the browser to see the output.



