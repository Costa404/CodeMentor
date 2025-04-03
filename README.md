    technicalDetails


      title: codeMentor,
      description:
        The app is designed to allow users to explore GitHub repositories, view their contents, and analyze code with AI-driven feedback. Using a GitHub-style navigation, users can search for and browse any repository. When a file is clicked, it opens in the Monaco Editor for easy viewing and editing. The code can then be analyzed by the FastAPI backend, which uses the Groq API to provide real-time suggestions and improvements based on the code's quality, performance, and best practices. Additionally, users can interact with a chat interface to input custom code for further analysis and feedback from the AI.

      backend:
        I built this FastAPI (Python) backend to provide real-time code analysis using the Groq API. It takes a code snippet from the frontend (POST /codeAnalysis), sends it to the Groq API for evaluation, and returns AI-generated feedback with optimizations, bug fixes, and best practices.
      frontend:
        In the frontend i built it using Angular with boostrap, with a GitHub-style navigation that lets users explore any repository by entering its name. I fetch repository data using the GitHub API, allowing users to browse directories. When a file is clicked, it opens in the Monaco Editor, where it can be analyzed with AI-powered feedback. Users can also open a chat interface and input their own code for analysis, getting AI-driven suggestions and improvements.

