import { GroupedContainerSchema } from "@/lib/schemas/groupedContainer";
import { z } from "zod";

export const mockGroupedContainer: z.infer<typeof GroupedContainerSchema> = {
  "systemName": "Multi-Functional System",
  "groups": [
      {
          "groupName": "Core",
          "containers": [
              {
                  "name": "Backend API",
                  "type": "API",
                  "technology": [
                      "REST",
                      "Node.js",
                      "Express.js"
                  ],
                  "description": "Handles all the business logic, data processing, and interactions with the database.",
                  "group": "Core"
              },
              {
                  "name": "Web Application",
                  "type": "Web App",
                  "technology": [
                      "React.js",
                      "Redux",
                      "HTML/CSS/JS"
                  ],
                  "description": "Provides an interface for end-users to interact with the system via a web browser.",
                  "group": "Core"
              },
              {
                  "name": "Mobile Application Backend",
                  "type": "Backend",
                  "technology": [
                      "Node.js",
                      "Express.js",
                      "MongoDB"
                  ],
                  "description": "Supports the mobile application with necessary data and functionalities.",
                  "group": "Core"
              },
              {
                  "name": "Machine Learning Service",
                  "type": "Service",
                  "technology": [
                      "Python",
                      "TensorFlow",
                      "Keras"
                  ],
                  "description": "Provides machine learning capabilities for data analysis and prediction.",
                  "group": "Core"
              }
          ]
      },
      {
          "groupName": "Supporting",
          "containers": [
              {
                  "name": "CLI Tool",
                  "type": "Tool",
                  "technology": [
                      "Python",
                      "Click"
                  ],
                  "description": "Allows developers to interact with the system via command line interface.",
                  "group": "Supporting"
              },
              {
                  "name": "IoT System",
                  "type": "System",
                  "technology": [
                      "MQTT",
                      "Node-RED",
                      "Raspberry Pi"
                  ],
                  "description": "Handles interactions with IoT devices.",
                  "group": "Supporting"
              },
              {
                  "name": "SaaS Platform",
                  "type": "Platform",
                  "technology": [
                      "AWS",
                      "Docker",
                      "Kubernetes"
                  ],
                  "description": "Provides a platform for deploying, managing, and scaling the system.",
                  "group": "Supporting"
              },
              {
                  "name": "Static Website",
                  "type": "Website",
                  "technology": [
                      "HTML",
                      "CSS",
                      "JavaScript"
                  ],
                  "description": "Provides static information about the system.",
                  "group": "Supporting"
              }
          ]
      }
  ],
  "relationships": [
      {
          "source": "Backend API",
          "target": "Web Application",
          "relationType": "uses"
      },
      {
          "source": "Backend API",
          "target": "Mobile Application Backend",
          "relationType": "uses"
      },
      {
          "source": "Backend API",
          "target": "Machine Learning Service",
          "relationType": "uses"
      },
      {
          "source": "Web Application",
          "target": "Backend API",
          "relationType": "calls"
      },
      {
          "source": "Mobile Application Backend",
          "target": "Backend API",
          "relationType": "calls"
      },
      {
          "source": "Machine Learning Service",
          "target": "Backend API",
          "relationType": "calls"
      },
      {
          "source": "CLI Tool",
          "target": "Backend API",
          "relationType": "calls"
      },
      {
          "source": "IoT System",
          "target": "Backend API",
          "relationType": "calls"
      },
      {
          "source": "SaaS Platform",
          "target": "Backend API",
          "relationType": "dependsOn"
      },
      {
          "source": "Static Website",
          "target": "Backend API",
          "relationType": "calls"
      }
  ]
}