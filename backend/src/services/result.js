const result = {
  matchScore: 85,
  technicalQuestions: [
    {
      question: "Can you describe the architecture of your 'Student Attendance Management System' project? What challenges did you face during its development, and how did you overcome them?",
      intention: 'To assess practical application of Python and SQLite, problem-solving skills, and project management experience.',
      answer: '...'
    },
    {
      question: 'The job description mentions Object-Oriented Programming. Can you explain the four pillars of OOP (Encapsulation, Inheritance, Polymorphism, Abstraction) with examples, perhaps relating them to how you might structure a more complex version of your attendance system?',
      intention: 'To gauge fundamental OOP understanding, which is a required skill for a Software Engineer.',
      answer: '...'
    },
    {
      question: 'Describe a scenario where you would choose to use a hash map (or dictionary in Python) versus a linked list for storing data. What are the typical time and space complexities for common operations (insertion, deletion, search) in both?',
      intention: 'To evaluate understanding of Data Structures and Algorithms, a core requirement for a Software Engineer.',
      answer: '...'
    },
    {
      question: 'You have experience with MySQL and SQLite. Can you explain the differences between the various SQL JOIN types (INNER, LEFT, RIGHT, FULL) and provide a practical scenario where you would use each?',
      intention: 'To assess database knowledge, which is crucial for the role given the requirement to work with SQL databases.',
      answer: '...'
    },
    {
      question: "Given your basic knowledge of JavaScript, how would you approach debugging an issue in a web application where a button click isn't triggering the expected action in the browser? What tools would you use?",
      intention: 'To understand basic web debugging skills and thought process in a front-end context, leveraging his HTML/CSS/JS skills.',
      answer: '...'
    }
  ],
  behavioralQuestions: [
    {
      question: 'Tell me about a time you had to learn a new technology or skill quickly for a project or academic task. How did you approach it, and what was the outcome?',
      intention: "To assess adaptability, learning agility, and initiative, aligning with his 'quick learner' and 'eager to contribute' self-description.",
      answer: '...'
    },
    {
      question: 'The job involves collaborating with cross-functional teams. Describe a situation where you worked effectively as part of a team to achieve a common goal, highlighting your specific contribution and how you handled any disagreements.',
      intention: 'To evaluate teamwork and communication skills, which are explicitly mentioned as strong points and required by the job description.',
      answer: '...'
    },
    {
      question: 'Can you recall a time when you faced a significant technical challenge in your project or studies? How did you approach solving it, what steps did you take, and what did you learn from that experience?',
      intention: "To probe problem-solving abilities, resilience, and critical thinking, aligning with his 'problem-solving' skill and 'commitment to completing tasks'.",
      answer: '...'
    }
  ],
  skillGaps: [
    { skill: 'React/Angular (frontend frameworks)', severity: 'high' },
    { skill: 'REST APIs (design and consumption)', severity: 'high' },
    {
      skill: 'Git/GitHub (advanced version control and collaboration)',
      severity: 'medium'
    },
    {
      skill: 'Java/C++ (specific backend languages listed)',
      severity: 'medium'
    },
    {
      skill: 'Object-Oriented Programming (deeper application and design patterns)',
      severity: 'low'
    },
    {
      skill: 'Data Structures and Algorithms (advanced problems and optimization)',
      severity: 'low'
    },
    {
      skill: 'Cloud Platforms and Agile Methodology (basic knowledge)',
      severity: 'low'
    }
  ],
  preparationPlan: [
    {
      day: 1,
      focus: 'Core CS Fundamentals (OOP & DSA)',
      tasks: [
        'Review OOP principles (polymorphism, inheritance) with practical Python examples.',
        'Practice common Data Structures (trees, graphs) and advanced algorithms (dynamic programming) with LeetCode/HackerRank.'
      ]
    },
    {
      day: 2,
      focus: 'Advanced SQL and Database Design',
      tasks: [
        'Practice complex SQL queries involving subqueries, window functions, and advanced joins.',
        'Learn about database normalization forms (1NF, 2NF, 3NF) and indexing strategies.'
      ]
    },
    {
      day: 3,
      focus: 'Version Control with Git and GitHub',
      tasks: [
        'Master advanced Git commands (rebasing, squashing commits, stashing, cherry-picking).'
      ]
    },
    {
      day: 4,
      focus: 'Introduction to REST APIs',
      tasks: [
        'Understand HTTP methods, status codes, and API design principles.',
        "Practice building a simple RESTful API endpoint using Python Flask/Django and consuming it using Postman or Python's `requests` library."
      ]
    },
    {
      day: 5,
      focus: 'Frontend Frameworks (React Basics)',
      tasks: [
        'Complete an introductory tutorial for React.js, focusing on components, state, props, and basic routing.',
        'Build a small, interactive web application using React.'
      ]
    },
    {
      day: 6,
      focus: 'Backend Development with a specific language/framework',
      tasks: [
        'Deep dive into either Java (Spring Boot) or C++ (e.g., RESTinio for web service), or enhance Python skills with Django/Flask to build more robust APIs.',
        'Implement user authentication/authorization in a web application.'
      ]
    },
    {
      day: 7,
      focus: 'Cloud & Agile Basics, Project Application & Interview Prep',
      tasks: [
        'Read up on core concepts of one major cloud platform (e.g., AWS EC2, S3, Lambda) and Agile methodologies (Scrum, Kanban).'
      ]
    }
  ]
}
