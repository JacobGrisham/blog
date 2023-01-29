---
title: Framework for Approaching the Architecture and Design For A New Project
date: "2023-01-29T23:46:37.121Z"
description: There are so many unknowns when beginning a new software engineering project. Where do you start? While every project is unique, I've developed a framework for guiding discussions to ask the right questions
category: Problem Solving
---

![Star Wars Millenium Falcon Technical Blueprint](./millenium-falcon-blueprint.jpeg)

Business moves fast. When you're thrust into a new project to satisfy business needs, it can be a little disorientating. This discomfort is actually a good thing, it signals growth. But the problem remains, how do you regain your orientation, especially if you've gotten comfortable in a certain product niche and the subsequent supporting software system? Below is a check-list style framework for quickly turning that ambigiuty into a well-defined and understood shape. I'm focusing on Architecure here because that's often the first place Engineering starts to put the rubber to the road. So let's jump in, you have a product to ship!

## Product’s Vision
I'll add a caveat here. While I write for an audience of software engineers, I think everyone can agree it's important to get the big picture of "Why are we building this project in the first place?"
- What’s the problem you’re trying to solve?
- Consider a SWOT model: Strengths, Weaknesses, Opportunities, Threats
- User impact: Who will be affected by this new offering?
- User Reach: What’s the Total Addressable Market (TAM)
- Think ahead about considerations and constraints of the stakeholders
  - Product: Big picture features and functionality. What should happen, what should not happen.
  - Engineering: See Engineering Design and Architecture
  - Support: Go to Market needs like webinars, resources in the help center, and troubleshooting guides
  - Legal: Data privacy and obtaining authorizations
- Plan out a rough schedule

## UX’s Design
- Mock-ups in Figma and AdobeXD

## Engineering’s Architecture
- Overall System Architecture
  - Backend Architecture Diagram, showing the databases, APIs, and compute services
  - Frontend Architecture Diagram, especially if it's a micro frontend
- Workflows
  - Consider drafting a UML diagram of swim lanes for different systems and draw a decision tree that brings you to different parts of the swim lanes
- Database Design
  - Consider drafting a UML diagram of the SQL tables or NoSQL documents for these three broad categories:
    - Column
    - Type
    - Description
- API specifications: Are you going to be consuming and/or creating a new API?
  - Document these three broad categories:
      - Endpoint
      - Method
      - Description
- Tech Stack Alignment: Ensure that choices align with the broader vision of the Company and the technology leader. If you're going to be using a technology that's new to the team, allocate some time for ramp-up.
- Environments: How many are you going to have? Dev, QA, Staging, and Prod?
- Service Accounts: Take stock of what accounts you'll need access to. What databases do you need access to and at what priviledge level (read-only or read/write)? What 3rd party services do you need access to, like dashboard to Splunk? This exercise requires you to gain a deeper understanding of the system and technology stack, which is a valuable practice in and of itself.
- Deployment CI/CD
  - Keep master (or main) always deployable through trunk based development.
  - Automate as much of the CI/CD process as much as possible to reduce friction to delivering features and bug fixes.
- Rollout
  - Feature flags
    - Per environment: Dev, QA, Prod
    - Groups: customer tier, cohort, demographic, etc.
  - Release Strategy: Beta, Controlled Availability, General Availability
- Local Development
  - Develop AWS infrastructure in a developer sandbox environment for integration testing and higher confidence in subsequent deployments to higher environments like QA and Prod.
  - Proxy APIs where possible rather than hitting an actual running instance.
- End to End Testing: Test your software... or your users will. Consider using a tool like Cypress to test key workflows in your application. Even better, implement the shift left mentality and run it on against every PR and every build to deployment.
- Observability
  - Per environment: Dev, QA, and Prod
  - Logging: For UI, for API, and for AWS Infrastructure can be helpful for debugging errors when (not _if_) they occur
  - Security Auditing: What legal obligations must the software adhere to? How will you demonstrate compliance?
  - Monitoring: Remember all those logs we're going to generate? We have to store them somewhere. Consider Datadog New Relic, and Splunk for non-AWS infrastructure. If you're using AWS, the natural choice is AWS Cloudwatch.
  - Alerting: If something breaks in production, we need to know. Funnel CI/CD build failure alerts and AWS Cloudwatch alarms into a communication channel you frequently use, whether that's email or Slack.
- Traffic: How many users do you expect? Will there be peak load times for this feature? Will there be a general peak load in your system's resources, for example tax software company during tax season.
- Scalability: how can you scale horizontally or vertically given the resources you're currently using. If the system is using AWS Serverless services like Lambda, you won't have to worry as much compared to system using AWS EC2.
- Load: What are bottlenecks to the load? Typically they are APIs, databases, and/or 3rd party services. Begin to identify them now rather than during General Availability.