import {
  query,
  update,
  text,
  StableBTreeMap,
  Vec,
  None,
  Some,
  Ok,
  Err,
  ic,
  Principal,
  nat64,
  Duration,
  Result,
  bool,
  Canister,
} from "azle";
import {
  Ledger,
  binaryAddressFromAddress,
  binaryAddressFromPrincipal,
  hexAddressFromPrincipal,
} from "azle/canisters/ledger";
//@ts-ignore
import { hashCode } from "hashcode";
import { v4 as uuidv4 } from "uuid";
import * as Types from "./types";

// Data storage maps for users, job postings, projects, etc.
const usersStorage = StableBTreeMap(0, text, Types.User);
const workerProfilesStorage = StableBTreeMap(1, text, Types.WorkerProfile);
const employerProfilesStorage = StableBTreeMap(2, text, Types.EmployerProfile);
const jobPostingsStorage = StableBTreeMap(3, text, Types.JobPosting);
const jobApplicationsStorage = StableBTreeMap(4, text, Types.JobApplication);
const projectsStorage = StableBTreeMap(5, text, Types.Project);
const persistedWorkerReserves = StableBTreeMap(
  6,
  Principal,
  Types.ReserveWorkerPayment
);
const pendingWorkerReserves = StableBTreeMap(
  7,
  nat64,
  Types.ReserveWorkerPayment
);

const PAYMENT_RESERVATION_PERIOD = 120n; // reservation period in seconds

/* 
    initialization of the Ledger canister. The principal text value is hardcoded because 
    we set it in the `dfx.json`
*/
const icpCanister = Ledger(Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"));

// Canister module export
export default Canister({
  // Function to create a new user with validation
  createUser: update(
    [Types.CreateUserPayload],
    Result(Types.User, Types.Error),
    (payload) => {
      // Validate if the payload is a valid object
      if (typeof payload !== "object" || Object.keys(payload).length === 0) {
        return Err({ 
          NotFound: `Invalid payload: Expected non-empty object, got ${typeof payload}` 
        });
      }

      // Ensure the email address format is valid using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(payload.email)) {
        return Err({ InvalidPayload: `Invalid email address` });
      }

      // Check for unique email address
      const user = usersStorage.values();
      const emailExists = user.some(
        (profile) => profile.email === payload.email
      );
      if (emailExists) {
        return Err({ InvalidPayload: "Email already exists" });
      }

      // Validate the phone number format with an international flair
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(payload.phoneNumber)) {
        return Err({
          InvalidPayload:
            "Invalid phone number format, try including your country code like a world traveler!",
        });
      }

      // Generate a new user ID
      const userId = uuidv4();

      // Create a new user object
      const newUser = {
        id: userId,
        ...payload,
        owner: ic.caller(),
        isVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store the user object into the User storage
      usersStorage.insert(userId, newUser);

      return Ok(newUser); // Successfully return the created user object
    }
  ),

  // Function to get a user by Id
  getUserById: query([text], Result(Types.User, Types.Error), (userId) => {
    // Check if the user Id exists
    const userOpt = usersStorage.get(userId);

    if ("None" in userOpt) {
      return Err({ NotFound: `User with ID ${userId} not found` });
    }

    return Ok(userOpt["Some"]);
  }),

  // Function to fetch user by Principal using filter
  getUserByPrincipal: query([], Result(Types.User, Types.Error), () => {
    const user = usersStorage.values().filter((user) => {
      return user.owner.toText() === ic.caller().toText();
    });

    if (user.length === 0) {
      return Err({ NotFound: `User with owner ${ic.caller()} not found` });
    }

    return Ok(user[0]);
  }),

  // Function to fetch all users with error handling
  getAllUsers: query([], Result(Vec(Types.User), Types.Error), () => {
    const users = usersStorage.values();

    if (users.length === 0) {
      return Err({ NotFound: `No users found` });
    }

    return Ok(users);
  }),

  // Function to create a new worker profile with validation
  createWorkerProfile: update(
    [Types.CreateWorkerProfilePayload],
    Result(Types.WorkerProfile, Types.Error),
    (payload) => {
      // Validate if the payload is a valid object
      if (typeof payload !== "object" || Object.keys(payload).length === 0) {
        return Err({ NotFound: "Invalid payload" });
      }

      // Check if the user exists and is of type Worker
      const userOpt = usersStorage.get(payload.userId);

      if ("None" in userOpt) {
        return Err({ NotFound: `User with ID ${payload.userId} not found` });
      }

      // Check if the user is a Worker
      const user = userOpt["Some"];

      if (user.userType !== "Worker") {
        return Err({
          InvalidPayload: "User must be a Worker to create an worker profile",
        });
      }

      // Validate professional summary
      if (
        !payload.professionalSummary ||
        payload.professionalSummary.trim() === ""
      ) {
        return Err({ InvalidPayload: "Professional summary is required" });
      }

      // Validate the work experience entries if provided
      if (payload.workExperience && payload.workExperience.length > 0) {
        for (const experience of payload.workExperience) {
          if (!experience.jobTitle || !experience.startDate) {
            return Err({
              InvalidPayload:
                "Each work experience must have a job title and start date",
            });
          }
        }
      }

      // Generate a new worker profile ID
      const workerProfileId = uuidv4();

      // Create a new worker profile object with all required and optional fields
      const newWorkerProfile = {
        id: workerProfileId,
        ...payload,
        averageRating: 0n,
        completedJobs: 0n,
        totalEarnings: 0n,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store the worker profile object into the Worker Profiles storage
      workerProfilesStorage.insert(workerProfileId, newWorkerProfile);

      return Ok(newWorkerProfile); // Successfully return the created worker profile object
    }
  ),

  // Function to get a worker profile by Id
  getWorkerProfileById: query(
    [text],
    Result(Types.WorkerProfile, Types.Error),
    (workerProfileId) => {
      // Check if the worker profile Id exists
      const workerProfileOpt = workerProfilesStorage.get(workerProfileId);

      if ("None" in workerProfileOpt) {
        return Err({
          NotFound: `Worker profile with ID ${workerProfileId} not found`,
        });
      }

      return Ok(workerProfileOpt["Some"]);
    }
  ),

  // Function to fetch worker profiles
  getAllWorkerProfiles: query(
    [],
    Result(Vec(Types.WorkerProfile), Types.Error),
    () => {
      const workerProfiles = workerProfilesStorage.values();

      if (workerProfiles.length === 0) {
        return Err({ NotFound: `No worker profiles found` });
      }

      return Ok(workerProfiles);
    }
  ),

  // Function to create a new employer profile with validation
  createEmployerProfile: update(
    [Types.CreateEmployerProfilePayload],
    Result(Types.EmployerProfile, Types.Error),
    (payload) => {
      // Validate if the payload is a valid object
      if (typeof payload !== "object" || Object.keys(payload).length === 0) {
        return Err({ NotFound: "Invalid payload" });
      }

      // Check if the user exists and is eligible to create an employer profile
      const userOpt = usersStorage.get(payload.userId);

      if ("None" in userOpt) {
        return Err({ NotFound: `User with ID ${payload.userId} not found` });
      }

      const user = userOpt["Some"];
      if (user.userType !== "Employer") {
        return Err({
          InvalidPayload:
            "User must be an Employer to create an employer profile",
        });
      }

      // Validate required fields in the payload
      if (!payload.companyName || !payload.industry) {
        return Err({
          InvalidPayload: "Company name and industry are required",
        });
      }

      // Generate a new employer profile ID
      const employerProfileId = uuidv4();

      // Create a new employer profile object with required fields
      const newEmployerProfile = {
        id: employerProfileId,
        userId: payload.userId,
        companyName: payload.companyName,
        industry: payload.industry,
        companyWebsite: payload.companyWebsite || "", // Optional field with default
        averageRating: 0n, // Default rating
        totalJobsPosted: 0n, // Default total jobs
        totalHires: 0n, // Default total hires
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store the employer profile object into the Employer Profiles storage
      employerProfilesStorage.insert(employerProfileId, newEmployerProfile);

      return Ok(newEmployerProfile); // Successfully return the created employer profile object
    }
  ),

  // Function to get an employer profile by Id
  getEmployerProfileById: query(
    [text],
    Result(Types.EmployerProfile, Types.Error),
    (employerProfileId) => {
      // Check if the employer profile Id exists
      const employerProfileOpt = employerProfilesStorage.get(employerProfileId);

      if ("None" in employerProfileOpt) {
        return Err({
          NotFound: `Employer profile with ID ${employerProfileId} not found`,
        });
      }

      return Ok(employerProfileOpt["Some"]);
    }
  ),

  // Function to fetch employer profiles
  getAllEmployerProfiles: query(
    [],
    Result(Vec(Types.EmployerProfile), Types.Error),
    () => {
      const employerProfiles = employerProfilesStorage.values();

      if (employerProfiles.length === 0) {
        return Err({ NotFound: `No employer profiles found` });
      }

      return Ok(employerProfiles);
    }
  ),

  // Function to create a new job posting with validation
  createJobPosting: update(
    [Types.CreateJobPostingPayload],
    Result(Types.JobPosting, Types.Error),
    (payload) => {
      // Validate if the payload is a valid object
      if (typeof payload !== "object" || Object.keys(payload).length === 0) {
        return Err({ NotFound: "Invalid payload" });
      }

      // Check if the employer exists and is eligible to create a job posting
      const userOpt = usersStorage.get(payload.employerId);

      if ("None" in userOpt) {
        return Err({
          NotFound: `User with ID ${payload.employerId} not found`,
        });
      }

      // Validate required fields in the payload
      if (!payload.title || !payload.description || !payload.jobCategory) {
        return Err({
          InvalidPayload: "Title, description, and job category are required",
        });
      }

      // Generate a new job posting ID
      const jobPostingId = uuidv4();

      // Create a new job posting object with required fields
      const newJobPosting = {
        id: jobPostingId,
        ...payload,
        status: { Open: null },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store the job posting object into the Job Postings storage
      jobPostingsStorage.insert(jobPostingId, newJobPosting);

      return Ok(newJobPosting); // Successfully return the created job posting object
    }
  ),

  // Function to get a job posting by Id
  getJobPostingById: query(
    [text],
    Result(Types.JobPosting, Types.Error),
    (jobPostingId) => {
      // Check if the job posting Id exists
      const jobPostingOpt = jobPostingsStorage.get(jobPostingId);

      if ("None" in jobPostingOpt) {
        return Err({
          NotFound: `Job posting with ID ${jobPostingId} not found`,
        });
      }

      return Ok(jobPostingOpt["Some"]);
    }
  ),

  // Function to fetch job postings
  getAllJobPostings: query(
    [nat64, nat64],
    Result(Vec(Types.JobPosting), Types.Error),
    (offset, limit) => {
      const jobPostings = jobPostingsStorage.values()
        .slice(Number(offset), Number(offset + limit));

      if (jobPostings.length === 0) {
        return Err({ NotFound: `No job postings found` });
      }

      return Ok(jobPostings);
    }
  ),

  // Function to create a new job application with validation
  createJobApplication: update(
    [Types.CreateJobApplicationPayload],
    Result(Types.JobApplication, Types.Error),
    (payload) => {
      // Validate if the payload is a valid object
      if (typeof payload !== "object" || Object.keys(payload).length === 0) {
        return Err({ NotFound: "Invalid payload" });
      }

      // Check if the worker exists and is eligible to create a job application
      const userOpt = usersStorage.get(payload.workerId);

      if ("None" in userOpt) {
        return Err({ NotFound: `User with ID ${payload.workerId} not found` });
      }

      // Check if the job posting exists
      const jobPostingOpt = jobPostingsStorage.get(payload.jobId);

      if ("None" in jobPostingOpt) {
        return Err({
          NotFound: `Job posting with ID ${payload.jobId} not found`,
        });
      }

      // Validate required fields in the payload
      if (!payload.coverLetter) {
        return Err({ InvalidPayload: "Cover letter is required" });
      }

      // Generate a new job application ID
      const jobApplicationId = uuidv4();

      // Create a new job application object with required fields
      const newJobApplication = {
        id: jobApplicationId,
        ...payload,
        status: { Pending: null },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store the job application object into the Job Applications storage
      jobApplicationsStorage.insert(jobApplicationId, newJobApplication);

      return Ok(newJobApplication); // Successfully return the created job application object
    }
  ),

  // Function to get a job application by Id
  getJobApplicationById: query(
    [text],
    Result(Types.JobApplication, Types.Error),
    (jobApplicationId) => {
      // Check if the job application Id exists
      const jobApplicationOpt = jobApplicationsStorage.get(jobApplicationId);

      if ("None" in jobApplicationOpt) {
        return Err({
          NotFound: `Job application with ID ${jobApplicationId} not found`,
        });
      }

      return Ok(jobApplicationOpt["Some"]);
    }
  ),

  // Function to fetch job applications
  getAllJobApplications: query(
    [],
    Result(Vec(Types.JobApplication), Types.Error),
    () => {
      const jobApplications = jobApplicationsStorage.values();

      if (jobApplications.length === 0) {
        return Err({ NotFound: `No job applications found` });
      }

      return Ok(jobApplications);
    }
  ),

  // Function to create a new project with validation
  createProject: update(
    [Types.CreateProjectPayload],
    Result(Types.Project, Types.Error),
    (payload) => {
      // Validate if the payload is a valid object
      if (typeof payload !== "object" || Object.keys(payload).length === 0) {
        return Err({ NotFound: "Invalid payload" });
      }

      // Check if the employer exists and is eligible to create a project
      const userOpt = usersStorage.get(payload.employerId);

      if ("None" in userOpt) {
        return Err({
          NotFound: `User with ID ${payload.employerId} not found`,
        });
      }

      // Check if the worker exists and is eligible to create a project
      const workerOpt = usersStorage.get(payload.workerId);

      if ("None" in workerOpt) {
        return Err({ NotFound: `User with ID ${payload.workerId} not found` });
      }

      // Generate a new project ID
      const projectId = uuidv4();

      // Create a new project object with required fields
      const newProject = {
        id: projectId,
        ...payload,
        status: { InProgress: null },
        paymentStatus: { Pending: null },
        startDate: new Date().toISOString(),
      };

      // Store the project object into the Projects storage
      projectsStorage.insert(projectId, newProject);

      return Ok(newProject); // Successfully return the created project object
    }
  ),

  // Function to get a project by Id
  getProjectById: query(
    [text],
    Result(Types.Project, Types.Error),
    (projectId) => {
      // Check if the project Id exists
      const projectOpt = projectsStorage.get(projectId);

      if ("None" in projectOpt) {
        return Err({ NotFound: `Project with ID ${projectId} not found` });
      }

      return Ok(projectOpt["Some"]);
    }
  ),

  // Function to fetch projects
  getAllProjects: query([], Result(Vec(Types.Project), Types.Error), () => {
    const projects = projectsStorage.values();

    if (projects.length === 0) {
      return Err({ NotFound: `No projects found` });
    }

    return Ok(projects);
  }),

  // Function to reserve a worker payment
  reserveWorkerPayment: update(
    [Types.ReserveWorkerPaymentPayload],
    Result(Types.ReserveWorkerPayment, Types.Error),
    (payload) => {
      try {
        // Validate if the payload is a valid object
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
          return Err({ NotFound: "Invalid payload" });
        }

        // Check if the Employer exists
        const employerOpt = usersStorage.get(payload.employerId);

        if ("None" in employerOpt) {
          return Err({
            NotFound: `Cannot create the reserve: Employer with ID ${payload.employerId} not found`,
          });
        }

        const employer = employerOpt.Some;

        // Check if the Worker exists
        const workerOpt = usersStorage.get(payload.workerId);

        if ("None" in workerOpt) {
          return Err({
            NotFound: `Cannot create the reserve: Worker with ID ${payload.workerId} not found`,
          });
        }

        const worker = workerOpt.Some;

        // Check if the Project exists
        const projectOpt = projectsStorage.get(payload.projectId);

        if ("None" in projectOpt) {
          return Err({
            NotFound: `Cannot create the reserve: Project with ID ${payload.projectId} not found`,
          });
        }

        const project = projectOpt.Some;

        // Check if the payment amount is positive
        if (payload.amount <= 0n) {
          return Err({ InvalidPayload: "Payment amount must be positive" });
        }

        // Generate a unique reservation ID
        const reservationId = uuidv4();

        // Create a worker payment reservation object
        const workerPaymentReservation = {
          id: reservationId,
          workerId: payload.workerId,
          employerId: payload.employerId,
          projectId: payload.projectId,
          payer: employer.owner,
          payee: worker.owner,
          amount: payload.amount,
          status: { Pending: null },
          paid_at_block: None,
          memo: generateCorrelationId(payload.employerId),
          transactionDate: new Date().toISOString(),
        };

        // Log the workerPaymentReservation details for debugging
        console.log("Worker Payment Reservation:", workerPaymentReservation);

        // Store the worker payment reservation object into the Pending Worker Reserves storage
        pendingWorkerReserves.insert(
          workerPaymentReservation.memo,
          workerPaymentReservation
        );

        // Discard the reservation after a specific period
        discardByTimeout(
          workerPaymentReservation.memo,
          PAYMENT_RESERVATION_PERIOD
        );

        // Successfully return the created worker payment reservation object
        return Ok(workerPaymentReservation);
      } catch (error) {
        // Catch any errors and return an error message
        return Err({
          InvalidPayload: `An error occurred while creating the reserve: ${error}`,
        });
      }
    }
  ),

  // Complete a reserve for a worker payment
  completePaymentReserve: update(
    [Principal, text, nat64, nat64, nat64],
    Result(Types.ReserveWorkerPayment, Types.Error),
    async (employer, workerId, paymentAmount, block, memo) => {
      // Verify the payment
      const paymentVerified = await verifyPaymentInternal(
        employer,
        paymentAmount,
        block,
        memo
      );

      if (!paymentVerified) {
        return Err({
          NotFound: `Cannot complete the payment reserve: cannot verify the payment, memo=${memo}`,
        });
      }

      // Retrieve and remove the pending reserve
      const pendingReserveOpt = pendingWorkerReserves.remove(memo);
      if ("None" in pendingReserveOpt) {
        return Err({
          NotFound: `Cannot complete the payment reserve: there is no pending reserve with memo=${memo}`,
        });
      }

      // Update the reserve status to completed
      const reserve = pendingReserveOpt.Some;

      const projectOpt = projectsStorage.get(reserve.projectId);
      if ("None" in projectOpt) {
        return Err({
          NotFound: `Project with id=${reserve.projectId} not found`,
        });
      }

      // Update the payment status in the project or relevant data structure
      const project = projectOpt.Some;
      project.paymentStatus = { FullyPaid: null };

      // Save the updated project back to storage
      projectsStorage.insert(project.id, project);

      const updatedReserve = {
        ...reserve,
        status: { Completed: "Completed" },
        paid_at_block: Some(block),
      };

      // Log the completed reserve for debugging purposes
      console.log("Completed Payment Reserve: ", updatedReserve);

      const workerProfileOpt = workerProfilesStorage.get(workerId);
      if ("None" in workerProfileOpt) {
        throw Error(`Worker profile with id=${workerId} not found`);
      }

      const workerProfile = workerProfileOpt.Some;

      // Update the worker's total earnings and completed jobs
      workerProfile.totalEarnings += paymentAmount;
      workerProfile.completedJobs += 1n;

      workerProfilesStorage.insert(workerId, workerProfile);

      // Persist the completed reserve into storage
      persistedWorkerReserves.insert(ic.caller(), updatedReserve);

      return Ok(updatedReserve); // Successfully return the updated reserve
    }
  ),

  /*
      a helper function to get address from the principal
      the address is later used in the transfer method
      */
  getAddressFromPrincipal: query([Principal], text, (principal) => {
    return hexAddressFromPrincipal(principal, 0);
  }),
});

/*
    a hash function that is used to generate correlation ids for orders.
    also, we use that in the verifyPayment function where we check if the used has actually paid the order
*/
function hash(input: any): nat64 {
  return BigInt(Math.abs(hashCode().value(input)));
}

// a workaround to make uuid package work with Azle
globalThis.crypto = {
  // @ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);

    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }

    return array;
  },
};

// HELPER FUNCTIONS

/*
    after the order is created, we give the `delay` amount of minutes to pay for the order.
    if it's not paid during this timeframe, the order is automatically removed from the pending orders.
*/
function discardByTimeout(memo: nat64, delay: Duration) {
  ic.setTimer(delay, () => {
    const order = pendingWorkerReserves.remove(memo);
    console.log(`Reserve discarded ${order}`);
  });
}

function generateCorrelationId(employerId: text): nat64 {
  const correlationId = `${employerId}_${ic.caller().toText()}_${ic.time()}`;
  return hash(correlationId);
}

async function verifyPaymentInternal(
  receiver: Principal,
  amount: nat64,
  block: nat64,
  memo: nat64
): Promise<bool> {
  try {
    const blockData = await ic.call(icpCanister.query_blocks, {
      args: [{ start: block, length: 1n }],
    });

    if (!blockData || !blockData.blocks) {
      return false;
    }

    const tx = blockData.blocks.find((block) => {
      if ("None" in block.transaction.operation) {
        return false;
      }
      const operation = block.transaction.operation.Some;
      const senderAddress = binaryAddressFromPrincipal(ic.caller(), 0);
      const receiverAddress = binaryAddressFromPrincipal(receiver, 0);
      return (
        block.transaction.memo === memo &&
        hash(senderAddress) === hash(operation.Transfer?.from) &&
        hash(receiverAddress) === hash(operation.Transfer?.to) &&
        amount === operation.Transfer?.amount.e8s
      );
    });
    return tx ? true : false;
  } catch (error) {
    console.error("Error verifying payment:", error);
    return false;
  }
}

// Add proper state transition validation for projects
const validStatusTransitions = {
  'InProgress': ['Completed', 'Cancelled'],
  'Completed': [],
  'Cancelled': []
};
