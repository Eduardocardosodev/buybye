# buybye Back-end

## Getting Started

To run the back-end of the application, follow these steps:

1. Navigate to the server folder.
2. Install the dependencies.
3. Run the dev script.
4. Configure your environment file to run Prisma.
5. Run the Prisma ORM migrations.

## Application Flow

The application follows the following flow:

1. Authentication (login and register)
2. CRUD operations for events
3. CRUD operations for competitors
4. Event registration
5. Random selection of competitors for an event based on their level

## Areas for Improvement

The following areas can be improved:

- Refactor some files to better adhere to coding standards.
- Decouple some files to minimize interference between layers.
- Add tests
- Containerize the project using Docker

## Planned Features

- Enhance the drawing rule.
- Add Socket.io when joining an event.
- Implement logic to determine the event winner.
- Add profile picture support with S3.
