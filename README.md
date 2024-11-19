
# Decentralized Freelancer Platform

A decentralized freelancer platform built using the Azle framework. The platform allows users to create and manage user profiles, job postings, job applications, projects, and worker payment reservations.

## Features

- **User Management**: Users can create and manage their profiles as either workers or employers.
- **Job Postings**: Employers can create and manage job postings, including details such as job title, description, and job category.
- **Job Applications**: Workers can apply for job postings by submitting a cover letter.
- **Project Management**: Employers and workers can create and manage projects, including details such as project status and payment status.
- **Worker Payment Reservations**: Employers can reserve payments for workers, and the platform ensures that the payments are verified and completed.

## Canister Modules

The platform consists of the following canister modules:

- **Users**: Handles user creation, retrieval, and management.
- **Worker Profiles**: Handles the creation and management of worker profiles.
- **Employer Profiles**: Handles the creation and management of employer profiles.
- **Job Postings**: Handles the creation and management of job postings.
- **Job Applications**: Handles the creation and management of job applications.
- **Projects**: Handles the creation and management of projects.
- **Worker Payment Reservations**: Handles the creation, verification, and completion of worker payment reservations.

## Dependencies

The project uses the following dependencies:

- **Azle**: A framework for building applications on the Internet Computer.
- **Ledger Canister**: A canister for managing ICP token transactions.
- **Hashcode**: A library for generating hash values.
- **UUID**: A library for generating universally unique identifiers.

## Usage

To use the platform, you'll need to deploy the canisters to the Internet Computer. You can do this using the `dfx` command-line tool. Once the canisters are deployed, you can interact with the platform using the provided API methods.

## Contributing

If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure that the code is working as expected.
4. Commit your changes and push them to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License.