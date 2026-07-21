
## Sprint - 13

## Prompt 1 – Project Selection
I need to choose one Capstone project from the available options. Compare the three project ideas based on complexity, learning opportunities, scalability, and full-stack development skills. Recommend the most suitable project for building an enterprise-level portfolio.

## Prompt 2 – Feature Planning
Help organize the MVP features of an Agile Project Management system into logical modules that can be implemented over multiple development sprints.

## Prompt 3 – Folder Structure
Suggest a scalable folder structure for both the frontend and backend of a MERN application that follows good software engineering practices.

## Prompt 4 – Figma Design Guidance
Provide step-by-step guidance for designing beginner-friendly Figma wireframes for the Login screen, Dashboard, and Project Details page using a consistent design system.

## Sprint - 14

## Prompt 5 - Mongoose Schema
Design a Mongoose schema for a project management application containing Users, Projects, Tasks, and Team Members while maintaining proper relationships.

## Prompt 6 - JWT Middleware
Generate Express middleware that validates JWT tokens, protects API routes, and returns appropriate HTTP status codes for invalid or missing tokens.

## Prompt 7 - Password Security
Explain the best practices for implementing password hashing using bcryptjs in Node.js and demonstrate how to compare hashed passwords securely during login.

## Prompt 8 - API Integration
Connect a React frontend with an Express backend using Axios and demonstrate how to attach JWT Authorization headers to every protected API request.

## Prompt 9 - Responsive UI
Improve this React dashboard CSS to make it responsive across desktop, tablet, and mobile devices while maintaining a modern SaaS appearance.

## Prompt 10 – Resource Ownership
My Task API is already protected with JWT authentication. How can I enforce resource-level authorization so that a logged-in user can only view, modify, or remove tasks that belong to them? Explain how to distinguish between an invalid resource ID, a missing task, and an existing task owned by a different user, using appropriate HTTP status codes.

## Prompt 11 – Optimistic State Updates
In my React task management interface, I want deletion to feel instantaneous instead of waiting for the server response. What is a reliable way to update the local task state optimistically, handle a failed DELETE request, and restore the removed task if necessary? Please explain the approach without requiring a full page refresh.

## Prompt 12 – Secure Stripe Checkout Flow
I want to add a paid "Upgrade to Pro" feature to my existing MERN application using Stripe's test environment. Explain the secure request flow between React, Express, and Stripe, including where the Checkout Session should be created and how sensitive Stripe credentials should be managed.

## Prompt 13 – Payment Result Handling
After integrating Stripe Checkout, how can I design the frontend flow to handle successful and cancelled transactions? Explain how to configure redirect URLs, add separate React Router pages for payment success and cancellation, and integrate these routes without disrupting my application's existing navigation.

## Prompt 14 – End-to-End Sprint Validation
Create a practical testing strategy for a full-stack project management application that has JWT-protected task CRUD, user-specific data access, optimistic deletion, and Stripe test payments. Include API security tests, frontend behavior checks, and a Stripe Checkout test scenario that I can demonstrate before submitting the sprint.