# Blind Hire

**Course:** Electronic Business Development (BINF 503) · Winter 2026
**Instructor:** Dr. Nourhan Hamdi
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa, Ms. Mariam Khalid, Mr. Younes Zied, Mr. Mahmoud Hani

## 1. Team

| Name | Student ID | Tutorial group | GitHub username |
|---|---|---|---|
| Maram Shahin | 16001143 | T1 | marammohamedshahin-cloud |
| Amr Amgad | 16002795 | T1 | amramgad22-svg |
| Yassin Konsowa | 16005812 | T1 | yassinkonsowa0-hub |
| Moaz Elsebaei | 16005191 | T1 | moazelsebaei |
| Karim Mounir | 16009056 | T7 | KMounir06 |

## 2. The idea

Blind Hire is a hiring platform that removes bias from the first stage of recruitment. Companies post jobs, and applicants apply with only their skills, experience and answers to the job's questions, while their name, email and university stay hidden. The company shortlists or rejects each applicant on merit alone, and the applicant's identity is revealed to the company only after they are shortlisted. It is for fresh graduates and job seekers in Egypt who are overlooked because of *wasta*, their university's name or personal bias, and for companies that want to hire fairly.

## 3. Features

### 3.1 The full product

- Registration and login for two roles: applicants and companies
- Companies post jobs with required skills and screening questions
- Applicants apply anonymously with skills, experience and answers only
- Companies review anonymous applications and shortlist or reject them
- An applicant's identity is revealed to the company only after shortlisting
- Applicants track the status of every application they submitted
- Applicants edit or withdraw an application while it is still pending
- Companies edit, close or delete their job posts
- Search and filter jobs by title, skill and location
- Anonymous applicant profiles that can be reused for several applications
- Skill tests attached to a job, graded before a human sees the application
- In-app messaging between a company and a shortlisted applicant
- Interview scheduling with shortlisted applicants
- Email notifications when an application's status changes
- Company ratings from applicants about fairness and response time
- Hiring reports for companies showing how many applicants were shortlisted and hired

### 3.2 The use cases we will build

| # | Use case | What the user does | What they see | What is stored |
|---|---|---|---|---|
| 1 | Registration and login | Registers with name, email and password, and chooses a role (applicant by default, or company); logs in with email and password | Their home page, with their name in the header: the job list for an applicant, their own jobs for a company | A User, with the password hashed and the role |
| 2 | Post and manage a job | A company fills in a form with the job's title, description, location, required skills and screening questions; later edits the job, closes it or deletes it | The job appears in their list of jobs and in the public job list; changes show immediately, and a closed job no longer accepts applications | A Job linked to the company; updated on edit, its status set to closed on close, removed on delete |
| 3 | Apply anonymously | An applicant opens an open job and submits their skills, years of experience and an answer to each screening question | A confirmation, and the application in "My applications" with the status "pending" | An Application linked to the job and the applicant, with status pending |
| 4 | Review, shortlist or reject | A company opens a job's applications, reads each one without the applicant's identity, and clicks Shortlist or Reject | Each application shown as "Applicant #1, #2…" with skills and answers only; after Shortlist, the applicant's name and email appear | The Application's status updated to shortlisted or rejected |
| 5 | Edit or withdraw an application | An applicant opens one of their pending applications and edits their answers, or withdraws it | The updated application, or the application removed from "My applications" | The Application updated, or deleted on withdraw |

## 4. Who owns what

| Member | Use case |
|---|---|
| Maram Shahin | 1. Registration and login |
| Amr Amgad | 2. Post and manage a job |
| Yassin Konsowa | 3. Apply anonymously |
| Moaz Elsebaei | 4. Review, shortlist or reject |
| Karim Mounir | 5. Edit or withdraw an application |

## 5. Data model

### User

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stored hashed, never as plain text
  role: { type: String, enum: ['applicant', 'company'], default: 'applicant' },
});
```

### Job

```js
const jobSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  requiredSkills: [{ type: String }],
  questions: [{ type: String }],
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
}, { timestamps: true });
```

### Application

```js
const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // hidden from the company until shortlisted
  skills: [{ type: String }],
  yearsOfExperience: { type: Number, min: 0, default: 0 },
  answers: [{ type: String }], // one answer per question of the job, in the same order
  status: { type: String, enum: ['pending', 'shortlisted', 'rejected'], default: 'pending' },
}, { timestamps: true });
```

## 6. Run it locally

> Leave this section as it is until Submission 2 (Thursday 10 December 2026,
> 23:59). Then fill it in: we follow these steps to run your project.

### Back end

```bash
cd backend
npm install
# create backend/.env from backend/.env.example (see the table below)
npm start
```

The API runs on http://localhost:3000.

| Variable in `.env` | What it is |
|---|---|
| `MONGODB_URI` | The connection string of your MongoDB Atlas database |
| `JWT_SECRET` | Any long random text, used to sign login tokens |
| [Any other variable] | [What it is] |

### Front end

```bash
cd frontend
npm install
npm run dev
```

The app runs on [the address `npm run dev` prints, e.g. http://localhost:5173].
