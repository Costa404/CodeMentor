# codeMentor

**codeMentor** is an application that allows users to explore GitHub repositories, view their contents, and analyze code with AI-driven feedback.

## Features

- **GitHub-style Navigation**: Users can search for and browse any repository by entering its name.  
- **File Viewing and Editing**: When a file is clicked, it opens in the Monaco Editor for easy viewing and editing.  
- **Code Analysis**: The FastAPI backend uses the Groq API to analyze the code and provide real-time suggestions, bug fixes, and performance improvements based on best practices.  
- **Chat Interface**: Users can interact with a chat interface to input custom code for further analysis, receiving AI-driven suggestions and improvements.  

## Backend

The backend is built with **FastAPI** (Python) to provide real-time code analysis using the **Groq API**.  
It takes a code snippet from the frontend (via `POST /codeAnalysis`), sends it to the Groq API for evaluation, and returns AI-generated feedback with optimizations, bug fixes, and best practices.

## Frontend

The frontend is built with **Angular** and **Bootstrap**, featuring a GitHub-style navigation to explore repositories.  
It fetches repository data using the GitHub API, allowing users to browse directories.  
When a file is selected, it opens in the Monaco Editor, where it can be analyzed with AI-powered feedback.  
Users can also open a chat interface to input their own code for analysis and receive real-time suggestions and improvements from AI.


