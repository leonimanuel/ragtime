import { ComplexC4DiagramSchema } from "@/lib/schemas/c4";
import { GroupedContainerSchema } from "@/lib/schemas/groupedContainer";
import { z } from "zod";

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
  { question: "What are your primary concerns for this system?", 
    answers: [
      "Scalability (handling increased traffic or users)",
      "Performance (low latency, high-speed responses)",
      "Cost efficiency (minimizing infrastructure expenses)",
      "Security & compliance (data protection, regulations)",
      "Developer experience (ease of building & maintaining)",
      "Resilience & fault tolerance (handling failures gracefully)"        
    ] 
  },
  { question: "Will this system need to support real-time interactions or event-driven behavior?", 
    answers: [
      "Yes, it needs live updates (e.g., chat, collaborative editing, dashboards)",
      "No, it operates on request-response (e.g., REST API, batch processing)"
    ]
  },
  { question: "What are the expected usage patterns and scale for this system?", 
    answers: [
      "Small-scale with low traffic (~hundreds of users)",
      "Medium-scale with moderate traffic (~thousands of users)",
      "Large-scale with high traffic (~millions of users)",
      "Variable traffic with potential spikes (e.g., seasonal or event-driven)"
    ] 
  },
  { question: "Does this system need to integrate with other platforms or services?", 
    answers: [
      "Yes, it needs to interact with third-party APIs",
      "Yes, it will connect to an existing database or system",
      "No, it's a self-contained application"
    ] 
  }
]

export const generateObjectMockResponse = {
  systemName: 'Online Shopping System',
  containers: [
    {
      id: '1',
      name: 'User Interface',
      type: 'Frontend',
      technology: 'ReactJS',
      description: 'Allows users to browse products, add them to cart, and make purchases.',
      dependsOn: [Array]
    },
    {
      id: '2',
      name: 'Backend API',
      type: 'Backend',
      technology: 'NodeJS',
      description: 'Handles all business logic, including user authentication, product management, and order processing.',
      dependsOn: [Array]
    },
    {
      id: '3',
      name: 'Database',
      type: 'Database',
      technology: 'PostgreSQL',
      description: 'Stores all data related to users, products, and orders.',
      dependsOn: []
    },
    {
      id: '4',
      name: 'Payment Gateway',
      type: 'External Service',
      technology: 'Stripe API',
      description: 'Handles all payment transactions.',
      dependsOn: []
    },
    {
      id: '5',
      name: 'Message Queue',
      type: 'Message Queue',
      technology: 'RabbitMQ',
      description: 'Handles asynchronous communication between the backend API and external services.',
      dependsOn: [Array]
    }
  ]
}

export const generateSystemContextMockResponse = {
  system: {
    id: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
    name: "E-Commerce Platform",
    description: "Allows customers to browse and purchase products",
    technology: "Node.js, React, PostgreSQL",
  },
  externalEntities: [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Customer",
      type: "Person",
      description: "Interacts with the e-commerce system",
    },
    {
      id: "223e4567-e89b-12d3-a456-426614174000",
      name: "Payment Gateway",
      type: "System",
      description: "Handles online transactions",
    },
  ],
  relationships: [
    {
      from: "123e4567-e89b-12d3-a456-426614174000",
      to: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
      description: "Customers browse and buy products",
    },
    {
      from: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
      to: "223e4567-e89b-12d3-a456-426614174000",
      description: "Sends payment information to the gateway",
    },
  ],
};

export const mockContainerDiagram: z.infer<typeof ComplexC4DiagramSchema> = {
  systemName: "Enterprise SaaS Platform",
  containers: [
    // === Frontend ===
    {
      id: "frontend",
      name: "Customer Web App",
      type: "Frontend",
      technology: "React + Next.js",
      description: "User-facing application for customers.",
      dependsOn: ["api-gateway", "auth-service"],
    },
    {
      id: "admin-frontend",
      name: "Admin Dashboard",
      type: "Frontend",
      technology: "React + Tailwind CSS",
      description: "Admin panel for managing users and subscriptions.",
      dependsOn: ["api-gateway", "auth-service"],
    },

    // === Backend Services ===
    {
      id: "api-gateway",
      name: "API Gateway",
      type: "Backend",
      technology: "Node.js + Express",
      description: "Handles API requests and forwards them to appropriate services.",
      dependsOn: ["user-service", "billing-service", "notification-service", "reporting-service"],
    },
    {
      id: "user-service",
      name: "User Service",
      type: "Backend",
      technology: "Node.js + Fastify",
      description: "Manages user profiles, authentication, and roles.",
      dependsOn: ["database", "auth-service"],
    },
    {
      id: "billing-service",
      name: "Billing Service",
      type: "Backend",
      technology: "Python + Flask",
      description: "Processes payments and handles subscriptions.",
      dependsOn: ["database", "payment-gateway"],
    },
    {
      id: "notification-service",
      name: "Notification Service",
      type: "Backend",
      technology: "Node.js + Firebase",
      description: "Sends emails, SMS, and push notifications.",
      dependsOn: ["message-queue"],
    },
    {
      id: "reporting-service",
      name: "Reporting Service",
      type: "Backend",
      technology: "Python + Pandas",
      description: "Generates reports and analytics for admins.",
      dependsOn: ["database"],
    },

    // === Data Storage ===
    {
      id: "database",
      name: "Main Database",
      type: "Database",
      technology: "PostgreSQL",
      description: "Stores user data, transactions, and logs.",
      dependsOn: [],
    },
    {
      id: "cache",
      name: "Cache Layer",
      type: "Database",
      technology: "Redis",
      description: "Caches frequently accessed data.",
      dependsOn: ["database"],
    },

    // === External Services ===
    {
      id: "auth-service",
      name: "Authentication Service",
      type: "External Service",
      technology: "Auth0",
      description: "Handles user authentication and OAuth.",
      dependsOn: [],
    },
    {
      id: "payment-gateway",
      name: "Payment Gateway",
      type: "External Service",
      technology: "Stripe",
      description: "Processes online payments securely.",
      dependsOn: [],
    },

    // === Messaging System ===
    {
      id: "message-queue",
      name: "Message Queue",
      type: "Message Queue",
      technology: "RabbitMQ",
      description: "Handles asynchronous event-driven messaging.",
      dependsOn: ["notification-service", "billing-service"],
    },
  ],
};