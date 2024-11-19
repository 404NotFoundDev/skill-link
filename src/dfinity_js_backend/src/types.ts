import {
  text,
  Record,
  Variant,
  Null,
  Vec,
  Principal,
  Opt,
  nat64,
  bool,
} from "azle";
import { id } from "azle/src/lib/ic/id";

// UserRole enum
const UserRole = Variant({
  Worker: Null,
  Employer: Null,
});

// User definition (base for Worker and Employer)
export const User = Record({
  id: text,
  owner: Principal,
  fullName: text,
  userType: text,
  email: text,
  address: text,
  phoneNumber: text,
  createdAt: text,
  updatedAt: text,
  isVerified: bool,
});

// Structs for work experience, education, skills, languages
export const WorkExperience = Record({
  jobTitle: text,
  company: Opt(text),
  startDate: text,
  endDate: Opt(text),
  description: text,
  isInformalWork: bool,
});

const Education = Record({
  institution: text,
  degree: text,
  fieldOfStudy: text,
  startDate: text,
  endDate: Opt(text),
});

const Skill = Record({
  name: text,
  proficiencyLevel: nat64,
  isVerified: bool,
});

const Language = Record({
  name: text,
  proficiencyLevel: text,
});

// Preferred job categories enum
const JobCategory = Variant({
  WebDevelopment: Null,
  MobileDevelopment: Null,
  DataScience: Null,
  ArtificialIntelligence: Null,
  GraphicDesign: Null,
  ContentWriting: Null,
  Other: Null,
});

// Worker-specific details
export const WorkerProfile = Record({
  id: text,
  userId: text,
  professionalSummary: text,
  workExperience: Vec(WorkExperience),
  education: Vec(Education),
  skills: Vec(Skill),
  languages: Vec(Language),
  preferredJobCategories: Vec(JobCategory),
  portfolioUrl: Opt(text),
  certifications: Vec(text),
  availability: text,
  averageRating: nat64,
  completedJobs: nat64,
  totalEarnings: nat64,
  createdAt: text,
  updatedAt: text,
});

// Employer-specific details
export const EmployerProfile = Record({
  id: text,
  userId: text,
  companyName: text,
  industry: text,
  companyWebsite: text,
  averageRating: nat64,
  totalJobsPosted: nat64,
  totalHires: nat64,
  createdAt: text,
  updatedAt: text,
});

// Payment type enum
const PaymentType = Variant({
  FixedPrice: Null,
  Hourly: Null,
});

// Budget struct
const Budget = Record({
  amount: nat64,
  currency: text,
  paymentType: PaymentType,
});

// Job Posting status enum
const JobPostingStatus = Variant({
  Open: Null,
  Closed: Null,
  Filled: Null,
});

// Job Posting struct
export const JobPosting = Record({
  id: text,
  employerId: text,
  title: text,
  description: text,
  requiredSkills: Vec(text),
  jobCategory: JobCategory,
  projectDuration: text,
  budget: Budget,
  applicationDeadline: text,
  preferredWorkerLocation: Opt(text),
  screeningQuestions: Vec(text),
  status: JobPostingStatus,
  createdAt: text,
  updatedAt: text,
});

// Job Application status enum
const JobApplicationStatus = Variant({
  Pending: Null,
  Shortlisted: Null,
  Rejected: Null,
  Hired: Null,
});

// Job Application struct
export const JobApplication = Record({
  id: text,
  jobId: text,
  workerId: text,
  coverLetter: text,
  portfolioItems: Vec(text),
  screeningAnswers: Vec(text),
  status: JobApplicationStatus,
  createdAt: text,
  updatedAt: text,
});

// Project status enum
const ProjectStatus = Variant({
  InProgress: Null,
  Completed: Null,
  Cancelled: Null,
});

// Milestone status enum
const MilestoneStatus = Variant({
  Pending: Null,
  Completed: Null,
  Approved: Null,
});

// Milestone struct
const Milestone = Record({
  description: text,
  dueDate: text,
  status: MilestoneStatus,
});

const Message = Record({
  id: text,
  senderId: text,
  content: text,
  timestamp: nat64,
});

const File = Record({
  id: text,
  name: text,
  mimeType: text,
  size: nat64,
  url: text,
  uploadedBy: text,
  uploadedAt: text,
});

// Payment status enum
const PaymentStatus = Variant({
  Pending: Null,
  PartiallyPaid: Null,
  FullyPaid: Null,
});

// Project struct
export const Project = Record({
  id: text,
  jobId: text,
  employerId: text,
  workerId: text,
  status: ProjectStatus,
  milestones: Vec(Milestone),
  // messages: Vec(Message),
  // files: Vec(File),
  paymentStatus: PaymentStatus,
  startDate: text,
  endDate: Opt(text),
});

export const Error = Variant({
  NotFound: text,
  InvalidPayload: text,
  PaymentFailed: text,
  PaymentCompleted: text,
});

// Payment status enum
const Payment_Status = Variant({
  Pending: Null,
  Completed: Null,
  Failed: Null,
});

// Payment struct
export const ReserveWorkerPayment = Record({
  id: text,
  projectId: text,
  workerId: text,
  employerId: text,
  payer: Principal,
  payee: Principal,
  amount: nat64,
  status: Payment_Status,
  paid_at_block: Opt(nat64),
  memo: nat64,
  transactionDate: text,
});

// Payloads

export const CreateUserPayload = Record({
  fullName: text,
  userType: text,
  email: text,
  address: text,
  phoneNumber: text,
});

export const UpdateUserPayload = Record({
  id: text,
  fullName: Opt(text),
  email: Opt(text),
  address: Opt(text),
  phoneNumber: Opt(text),
});

export const CreateWorkerProfilePayload = Record({
  userId: text,
  professionalSummary: text,
  workExperience: Vec(WorkExperience),
  education: Vec(Education),
  skills: Vec(Skill),
  languages: Vec(Language),
  preferredJobCategories: Vec(JobCategory),
  portfolioUrl: Opt(text),
  certifications: Vec(text),
  availability: text,
});

export const UpdateWorkerProfilePayload = Record({
  userId: text,
  professionalSummary: Opt(text),
  workExperience: Opt(Vec(WorkExperience)),
  education: Opt(Vec(Education)),
  skills: Opt(Vec(Skill)),
  languages: Opt(Vec(Language)),
  preferredJobCategories: Opt(Vec(JobCategory)),
  portfolioUrl: Opt(text),
  certifications: Opt(Vec(text)),
  availability: Opt(text),
});

export const CreateEmployerProfilePayload = Record({
  userId: text,
  companyName: text,
  industry: text,
  companyWebsite: text,
});

export const UpdateEmployerProfilePayload = Record({
  userId: text,
  companyName: Opt(text),
  industry: Opt(text),
  companyWebsite: Opt(text),
});

export const CreateJobPostingPayload = Record({
  employerId: text,
  title: text,
  description: text,
  requiredSkills: Vec(text),
  jobCategory: JobCategory,
  projectDuration: text,
  budget: Budget,
  applicationDeadline: text,
  preferredWorkerLocation: Opt(text),
  screeningQuestions: Vec(text),
});

export const UpdateJobPostingPayload = Record({
  id: text,
  title: Opt(text),
  description: Opt(text),
  requiredSkills: Opt(Vec(text)),
  jobCategory: Opt(JobCategory),
  projectDuration: Opt(text),
  budget: Opt(Budget),
  applicationDeadline: Opt(text),
  preferredWorkerLocation: Opt(text),
  screeningQuestions: Opt(Vec(text)),
});

export const CreateJobApplicationPayload = Record({
  jobId: text,
  workerId: text,
  coverLetter: text,
  portfolioItems: Vec(text),
  screeningAnswers: Vec(text),
});

export const UpdateJobApplicationPayload = Record({
  id: text,
  coverLetter: Opt(text),
  portfolioItems: Opt(Vec(text)),
  screeningAnswers: Opt(Vec(text)),
});

export const CreateProjectPayload = Record({
  jobId: text,
  employerId: text,
  workerId: text,
  milestones: Vec(Milestone),
  endDate: Opt(text),
});

export const ReserveWorkerPaymentPayload = Record({
  workerId: text,
  employerId: text,
  projectId: text,
  amount: nat64,
});
