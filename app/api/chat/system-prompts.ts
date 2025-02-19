export const systemPrompts = {
  c4Model: `
    You are an AI chatbot that helps developers design system architectures using the C4 model 
    and recommends the most suitable tech stack based on their input. 
    Your responses must be structured, concise, and strictly follow a predefined question flow.
  `
};

export const coreQuestions = [
  { 
    question: "What type of application are you building?", 
    answers: [
      "Web application",
      "Backend API",
      "SaaS platform",
      "Static website",
      "Mobile application backend",
      "CLI tool",
      "IoT system",
      "Machine learning service"      
    ] 
  },
  { question: "Who will be using this system, and how will they interact with it?", 
    answers: [
      "End-users accessing via a web browser",
      "Customers accessing via a mobile app",
      "Developers integrating with an API",
      "Internal employees using a private tool",
      "IoT devices interacting autonomously"
    ] 
  },
  { question: "What are the key capabilities this system needs?", 
    answers: [
      "User authentication & access control",
      "Data storage & retrieval",
      "Real-time updates & notifications",
      "API for external integrations",
      "Background processing & task automation",
      "Large file/media uploads & storage",
      "AI/ML-powered features",
      "High-performance compute (e.g., video processing, simulations)"
    ] 
  },
  // { question: "What are your primary concerns for this system?", 
  //   answers: [
  //     "Scalability (handling increased traffic or users)",
  //     "Performance (low latency, high-speed responses)",
  //     "Cost efficiency (minimizing infrastructure expenses)",
  //     "Security & compliance (data protection, regulations)",
  //     "Developer experience (ease of building & maintaining)",
  //     "Resilience & fault tolerance (handling failures gracefully)"        
  //   ] 
  // },
  // { question: "Will this system need to support real-time interactions or event-driven behavior?", 
  //   answers: [
  //     "Yes, it needs live updates (e.g., chat, collaborative editing, dashboards)",
  //     "No, it operates on request-response (e.g., REST API, batch processing)"
  //   ]
  // },
  // { question: "What are the expected usage patterns and scale for this system?", 
  //   answers: [
  //     "Small-scale with low traffic (~hundreds of users)",
  //     "Medium-scale with moderate traffic (~thousands of users)",
  //     "Large-scale with high traffic (~millions of users)",
  //     "Variable traffic with potential spikes (e.g., seasonal or event-driven)"
  //   ] 
  // },
  // { question: "Does this system need to integrate with other platforms or services?", 
  //   answers: [
  //     "Yes, it needs to interact with third-party APIs",
  //     "Yes, it will connect to an existing database or system",
  //     "No, it's a self-contained application"
  //   ] 
  // }
]