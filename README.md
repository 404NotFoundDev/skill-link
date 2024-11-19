
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

# Testing Guide for Candid UI

## 1. Create User (Worker)
```json
{
  "fullName": "John Doe",
  "email": "worker@test.com",
  "phoneNumber": "+1234567890",
  "userType": "Worker"
}
```

## 2. Create User (Employer)
```json
{
  "fullName": "Jane Smith",
  "email": "employer@test.com",
  "phoneNumber": "+1987654321",
  "userType": "Employer"
}
```

## 3. Create Worker Profile
```json
{
  "userId": "<worker_user_id>",
  "professionalSummary": "Experienced software developer with 5 years of experience",
  "skills": ["JavaScript", "TypeScript", "React"],
  "workExperience": [
    {
      "jobTitle": "Senior Developer",
      "company": "Tech Corp",
      "startDate": "2020-01-01",
      "endDate": "2023-01-01",
      "description": "Led development team"
    }
  ],
  "hourlyRate": 50
}
```

## 4. Create Employer Profile
```json
{
  "userId": "<employer_user_id>",
  "companyName": "Tech Solutions Inc",
  "industry": "Software Development",
  "companyWebsite": "https://techsolutions.com"
}
```

## 5. Create Job Posting
```json
{
  "employerId": "<employer_user_id>",
  "title": "Senior Frontend Developer",
  "description": "Looking for an experienced frontend developer",
  "jobCategory": "Development",
  "requiredSkills": ["React", "TypeScript"],
  "budget": 5000,
  "duration": "3 months"
}
```

## 6. Create Job Application
```json
{
  "workerId": "<worker_user_id>",
  "jobId": "<job_posting_id>",
  "coverLetter": "I am interested in this position and believe my skills match your requirements.",
  "proposedRate": 45
}
```

## 7. Create Project
```json
{
  "employerId": "<employer_user_id>",
  "workerId": "<worker_user_id>",
  "title": "E-commerce Website Development",
  "description": "Build a full-featured e-commerce website",
  "budget": 10000,
  "duration": "2 months"
}
```

## 8. Reserve Worker Payment
```json
{
  "employerId": "<employer_user_id>",
  "workerId": "<worker_user_id>",
  "projectId": "<project_id>",
  "amount": 5000
}
```

## 9. Query Functions Testing

### Get User By ID
```
userId: "<user_id>"
```

### Get Worker Profile By ID
```
workerProfileId: "<worker_profile_id>"
```

### Get Job Posting By ID
```
jobPostingId: "<job_posting_id>"
```

### Get All Job Postings
```
offset: 0
limit: 10
```

### Get Project By ID
```
projectId: "<project_id>"
```

## Testing Flow
1. Create Worker User → Get User ID
2. Create Employer User → Get User ID
3. Create Worker Profile using Worker User ID
4. Create Employer Profile using Employer User ID
5. Create Job Posting using Employer ID
6. Create Job Application using Worker ID and Job Posting ID
7. Create Project using both IDs
8. Test Payment Reserve and Complete Payment functions
9. Test various query functions to verify data

Remember to save the IDs returned from each creation step as they'll be needed for subsequent steps.

## Contributing

If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure that the code is working as expected.
4. Commit your changes and push them to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License.