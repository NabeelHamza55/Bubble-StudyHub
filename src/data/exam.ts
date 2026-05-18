import type { ExamQuestion } from "../types";

export const PRACTICE_EXAM_QUESTIONS: ExamQuestion[] = [
  // ── FRONTEND FUNCTIONALITY ──
  {id:1,cat:"Frontend Functionality",type:"mc",scenario:true,
   q:"A user clicks a 'Save Profile' button. The workflow should update the current user's name, then navigate to the dashboard only if the update succeeded. What is the correct approach?",
   opts:["Use a single workflow: Step 1 — Make changes to Current User. Step 2 — Go to page 'Dashboard'. Add 'Only when' on Step 2 checking Current User's name is not empty.","Use two separate workflows: one triggered by button click for the DB update, and another triggered by 'Do when Current User's name is changed' to navigate.","Use a single workflow: Step 1 — Make changes to Current User. Step 2 — Go to page 'Dashboard'. No condition needed because Step 2 runs after Step 1.","Store the new name in a custom state first, then use a second workflow triggered by 'Do when state is not empty' to write to DB and navigate."],
   correct:0,explanation:"Workflow steps run in sequence — Step 2 only executes after Step 1 completes. Adding 'Only when' on Step 2 confirms the save succeeded. Option C is partially right in sequence but omits the success guard. Option B creates unnecessary complexity and race conditions."},

  {id:2,cat:"Frontend Functionality",type:"tf",scenario:false,
   q:"True or False: A custom state value in Bubble persists across page refreshes and can be read by other users of the app.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Custom states are ephemeral client-side memory — lost on refresh, invisible to other users. For persistence use the database; for cross-page temp data use URL parameters (text only) or database records."},

  {id:3,cat:"Frontend Functionality",type:"ma",scenario:true,
   q:"A developer wants to build a 5-step onboarding form on a single page without navigating away. Which approaches are valid Bubble implementations? (Select all that apply)",
   opts:["Create 5 Groups (one per step), all hidden by default. Use a Number custom state to track the current step. Conditionals on each Group: 'Visible when Page's currentStep = [1–5]'.","Create 5 separate pages and use 'Go to page' actions to move between them, passing form data via URL parameters.","Use a Repeating Group with 5 hardcoded rows, showing one cell at a time by filtering on the row index.","Use a custom state of type 'text' storing the step name, and toggle visibility of Groups based on matching that state value."],
   correct:[0,1,3],explanation:"A: The canonical single-page approach — custom state drives visibility. B: Valid (though causes page reloads, it works). C: Anti-pattern — RGs aren't designed for step navigation. D: Valid — text state for step name is functionally equivalent to A."},

  {id:4,cat:"Frontend Functionality",type:"mc",scenario:true,
   q:"A repeating group is showing all Products from the database. A user types in an Input element to filter the list. What is the correct way to implement live filtering?",
   opts:["Add an Advanced Filter to the RG: 'Current cell's Product's Name contains Input's value'.","Set the RG data source to 'Search for Products' with a constraint: 'Name contains Input's value'. As the user types the search re-runs automatically.","Use a 'Do when Input's value is changed' workflow to store search results in a custom state, then set the RG source to that state.","Both A and B work, but B is more efficient because constraints are server-side while Advanced Filters fetch all records first."],
   correct:3,explanation:"This is a nuanced question. Option B (constraint) is the efficient choice — it filters on the server. Option A (Advanced Filter) works but fetches all records first. Both technically 'work', but B is significantly better for performance. The correct answer acknowledges this tradeoff, which is exactly what the certification tests."},

  {id:5,cat:"Frontend Functionality",type:"mc",scenario:false,
   q:"What is the difference between 'Trigger a custom event' and 'Schedule a custom event' in a Bubble workflow?",
   opts:["'Trigger' runs the custom event immediately and synchronously within the current workflow sequence. 'Schedule' queues it to run after the current workflow completes or after a specified delay.","'Trigger' runs the event on the server; 'Schedule' runs it on the client side.","They are identical — 'Schedule' with a delay of 0 seconds is the same as 'Trigger'.","'Trigger' can only be used on frontend workflows; 'Schedule' works in both frontend and backend workflows."],
   correct:0,explanation:"'Trigger' inserts the custom event's steps into the current workflow sequence at that point. 'Schedule' dispatches the event outside the current sequence — even a 0-second delay means it runs after the current workflow finishes. This distinction matters for execution order and error isolation."},

  {id:6,cat:"Frontend Functionality",type:"tf",scenario:false,
   q:"True or False: Placing a Popup element inside a Group or Repeating Group cell is valid and the Popup will display correctly when shown.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Popups must be placed at the top level of a page — they cannot be nested inside Groups, Reusable Elements, or RG cells. A popup inside a group will not render correctly or may not be accessible via the 'Show' action. Always drag Popups to the page root level."},

  {id:7,cat:"Frontend Functionality",type:"ma",scenario:false,
   q:"Which of the following are valid ways to pass data between two pages in Bubble? (Select all that apply)",
   opts:["Use 'Go to page' action and send a Thing as the page's data parameter (requires the destination page to have a content type set).","Store the data in the database before navigating, then read it on the next page using Current User or a URL parameter as a key.","Use a URL parameter to pass a text value (e.g., the record's unique ID) and look it up on the next page.","Use a custom state on the current page — it will persist to the next page since it's stored in the browser.","Use the 'Go to page' action to pass multiple parameters via the 'Send more parameters to the page' option."],
   correct:[0,1,2,4],explanation:"A: Correct — the standard way to pass a Thing. B: Correct — write to DB, navigate, read on arrival. C: Correct — pass an ID in URL, do a search on the new page. D: WRONG — custom states do NOT persist across page navigation; they reset. E: Correct — 'Send more parameters' allows multiple key-value pairs in the URL."},

  {id:8,cat:"Frontend Functionality",type:"mc",scenario:true,
   q:"A button's workflow has 3 steps. Step 2 should only run if a certain condition is met, but Step 3 should always run regardless. What is the correct approach?",
   opts:["Add an 'Only when' condition directly on Step 2. Step 3 has no condition and will always run.","Add an 'Only when' condition to the entire workflow. Steps 2 and 3 will be skipped if it's false.","Use a conditional on the button element to hide it unless the condition is true, preventing the workflow from running.","Split into two separate workflows: one for Step 2 (with its condition) and one for Step 3."],
   correct:0,explanation:"'Only when' can be set on individual workflow steps — it gates only that step. Steps without 'Only when' always run. Option B would gate the entire workflow. Option C prevents the workflow from starting at all. Option D is unnecessary — step-level conditions handle this cleanly."},

  // ── DATABASE & SECURITY ──
  {id:9,cat:"Database & Security",type:"ma",scenario:true,
   q:"You're building a healthcare app. Patients see only their own records. Doctors see records for their assigned patients. Admins see everything. Which privacy rule configurations are correct? (Select all that apply)",
   opts:["On MedicalRecord: Rule — 'This MedicalRecord's Patient = Current User' → View all fields: Yes","On MedicalRecord: Rule — 'Current User's Role = Admin' → View all fields: Yes, Find in searches: Yes","On MedicalRecord: Rule — 'This MedicalRecord's Patient is in Current User's AssignedPatients' → View all fields: Yes","Set a single rule: 'Current User is logged in' → View all fields: Yes, for simplicity — use workflow conditions for filtering","Enable 'Ignore privacy rules' on all backend workflows that Admins use"],
   correct:[0,1,2],explanation:"A, B, C correctly implement role-based access using Bubble's OR-based privacy rules (any matching rule grants access). D is a severe vulnerability — exposes all records to every logged-in user. E is wrong: 'Ignore privacy rules' is for trusted server operations, not a role-based access mechanism."},

  {id:10,cat:"Database & Security",type:"tf",scenario:false,
   q:"True or False: When no privacy rules are configured on a data type in Bubble, all records of that type are completely private and inaccessible to other users by default.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. With NO privacy rules, everything is PUBLIC by default — all users (including unauthenticated ones) can find, view, and modify all records. This is the #1 security trap for new Bubble developers. You must explicitly add rules to restrict access."},

  {id:11,cat:"Database & Security",type:"mc",scenario:true,
   q:"A freelance marketplace has Clients and Freelancers. A Project belongs to one Client but can have many Freelancers. Which data model best represents this?",
   opts:["Project type with a 'Client' field (User) and a 'Freelancers' field (User list). Simple and direct.","Create a separate 'Assignment' type with fields: Project and Freelancer. Use as a join table.","Add a 'Projects' list field to the User type. Each User holds all their associated projects.","Both A and B are valid. A is simpler for small lists; B scales better and is easier to query from the Freelancer's perspective."],
   correct:3,explanation:"Both A and B are valid patterns. A (list field) is simpler when you query from Project→Freelancers. B (join table) is better when you also need Freelancer→Projects and want to store metadata like assignment date or status. The exam often awards the nuanced answer that acknowledges both."},

  {id:12,cat:"Database & Security",type:"ma",scenario:true,
   q:"You're auditing a Bubble app's security. Which of the following configurations represent security vulnerabilities? (Select all that apply)",
   opts:["The User type has no privacy rules configured.","An API Workflow is exposed as public with no authentication required and it modifies user records.","API keys for a third-party service are stored in an Option Set.","The app uses 'Ignore privacy rules' in a backend workflow that generates admin reports.","The Data API is enabled but all data types have 'Find in searches: No' and 'View all fields: No' as default rules."],
   correct:[0,1,2],explanation:"A: Critical — no rules means all user data is publicly readable. B: A public unauthenticated endpoint modifying users is a severe vulnerability. C: Option Sets load client-side; any API key stored there is visible in the browser's network tab. D: Legitimate and safe for trusted server-side admin operations. E: Actually secure — the Data API is enabled but protected by default-deny rules."},

  {id:13,cat:"Database & Security",type:"mc",scenario:false,
   q:"What does the 'Find in searches' privacy rule setting control on a data type?",
   opts:["Whether users can view the field values inside a record","Whether records of this type appear in 'Search for' queries run by the user","Whether users can modify records of this type","Whether the type is accessible via the Data API"],
   correct:1,explanation:"'Find in searches' controls whether a record shows up in Search results at all. Even if a user can view fields ('View all fields: Yes'), if 'Find in searches' is No, the record will never appear in a search query for that user. These two settings are independent and both need to be configured for full access control."},

  {id:14,cat:"Database & Security",type:"tf",scenario:false,
   q:"True or False: Bubble's privacy rules are enforced on the client side, so a determined developer inspecting network traffic could bypass them.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Privacy rules are enforced server-side. Data is filtered before it ever leaves Bubble's servers and reaches the browser. No amount of client-side manipulation can bypass server-side privacy rules. This is one of Bubble's core security guarantees."},

  {id:15,cat:"Database & Security",type:"mc",scenario:true,
   q:"A user deletes their account. The app should also delete all Posts created by that user. What is the best approach?",
   opts:["Add a conditional on the Post display page that hides posts if the author's account is deleted.","Use a Database Trigger on the User type: when a User is deleted, schedule an API Workflow on a list of 'Search for Posts where Created By = This User' to delete each one.","Add 'Delete' cascade rules to the Post type in the data editor so Bubble auto-deletes related records.","Create a frontend workflow on the profile page that deletes all posts before deleting the account."],
   correct:1,explanation:"Bubble has no built-in cascade delete. You must implement it manually. Option B is correct: a DB Trigger fires on deletion, then the API Workflow on a list handles bulk deletion server-side. Option A only hides — it doesn't delete. Option C doesn't exist in Bubble. Option D is unreliable — frontend workflows require an active session and could fail mid-execution."},

  {id:16,cat:"Database & Security",type:"ma",scenario:false,
   q:"Which of the following statements about Option Sets are TRUE? (Select all that apply)",
   opts:["Option Sets are loaded client-side and accessing them costs zero Workload Units.","Option Sets can have custom attributes such as text, number, image, and color fields.","Option Set values can be created and modified at runtime through workflows.","Option Sets are ideal for data that changes frequently, such as live product inventory.","An Option Set option can be stored as a field value on a database Thing."],
   correct:[0,1,4],explanation:"A: True — client-side, zero WU. B: True — attributes are fully customizable. C: FALSE — Option Set values are static, defined only in the editor, and cannot be changed at runtime via workflows. D: FALSE — Option Sets are specifically for static, rarely-changing data. E: True — you can store an Option (e.g., a Status option) as a field type on any data type."},

  // ── PERFORMANCE & WORKLOAD ──
  {id:17,cat:"Performance & Workload",type:"mc",scenario:true,
   q:"Your app's WU consumption tripled after adding a Database Trigger on the Order type that recalculates a User's total spend when an Order is modified. The app processes ~500 orders/day. What is the most likely cause and best fix?",
   opts:["The trigger fires on ALL Order modifications including unrelated field changes. Add 'Only when': 'This Order's Status changed to Paid' to limit execution.","The recalculation search is expensive. Replace it with a cached value in a custom state.","DB Triggers always consume high WU. Replace with a frontend workflow triggered by the user action.","The trigger is causing a cascade loop. Add a boolean 'IsBeingProcessed' field and check it at the start."],
   correct:0,explanation:"Every modification to any Order field — even unrelated ones — evaluates the trigger condition. With 500 orders/day and multiple modifications per order, this multiplies fast. A precise 'Only when' condition limits execution to meaningful state changes. Option B misunderstands custom states (not server-persistent). Option C moves critical business logic client-side, which is unreliable."},

  {id:18,cat:"Performance & Workload",type:"ma",scenario:false,
   q:"Which of the following operations consume Workload Units (WU) in Bubble? (Select all that apply)",
   opts:["A user toggles the visibility of a Group element via a workflow action.","A 'Search for Users where Role = Admin' constraint-based query on page load.","Changing a custom state value from 'step1' to 'step2'.","Scheduling an API Workflow to run in 10 minutes.","A Database Trigger evaluating its 'Only when' condition after every record modification.","A conditional on a Text element that changes its color based on a custom state value."],
   correct:[1,3,4],explanation:"WU is consumed only by server-side operations. B: DB search runs server-side = WU. D: Scheduling an API Workflow is a server-side action = WU. E: Every record modification causes the trigger condition to evaluate server-side = WU (even if false). A (show/hide), C (state change), and F (color conditional on state) are all client-side = zero WU."},

  {id:19,cat:"Performance & Workload",type:"mc",scenario:true,
   q:"A Repeating Group shows 50 products. Each cell contains a text element: 'Do a Search for Categories where ID = Current cell's Product's CategoryID:first item's name'. Users report slow page loads. What is the most effective fix?",
   opts:["Add 'Limit: 1' to the search inside each cell to reduce data fetched per query.","Replace the per-cell search with a direct relationship: store a Category field (type: Category) on the Product type, then use 'Current cell's Product's Category's name'.","Use an Advanced Filter on the RG source to pre-filter products by category.","Move the category lookup to a backend API Workflow and cache results in a custom state on page load."],
   correct:1,explanation:"The root problem is 50 separate DB queries (one per cell). Storing a direct Thing reference eliminates in-cell searches entirely — zero extra WU per cell. Option A reduces data per query but still fires 50 queries. Option C makes things worse (Advanced Filter = client-side, all records fetched). Option D is over-engineered for what a simple data model fix solves."},

  {id:20,cat:"Performance & Workload",type:"ma",scenario:true,
   q:"A developer is optimizing a slow dashboard page with: (1) an RG of 200 orders with per-cell status lookups, (2) a 'Do when condition is true' checking a search every 2 seconds, (3) hidden groups containing RGs. Which optimizations reduce WU? (Select all that apply)",
   opts:["Add 'Limit: 20' to the orders RG source and implement pagination.","Replace per-cell status lookups with a Status field stored directly on the Order type.","Change the 'Do when' condition to use a custom state change triggered by a DB Trigger instead of polling.","Set the hidden groups to 'Collapse when hidden' to prevent their RGs from loading data.","Add search constraints to the orders RG (e.g., date range, current user) instead of loading all orders."],
   correct:[0,1,2,4],explanation:"A: Loads 20 vs 200 records — dramatic WU reduction. B: Eliminates 200 per-cell DB queries. C: Removes the 2-second polling loop that fires for every active session. D: INCORRECT — 'Collapse when hidden' controls layout only, not data loading. E: Server-side constraints are the most impactful WU reduction technique."},

  {id:21,cat:"Performance & Workload",type:"tf",scenario:false,
   q:"True or False: Using ':count' on a Search (e.g., 'Search for Orders:count') is a lightweight operation because Bubble only retrieves a number, not the actual records.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. ':count' runs the full search server-side and costs nearly the same WU as fetching all records. Bubble must still process the entire query to count results. If you need a count, consider storing it as a cached field updated by a DB Trigger, or use constraints to minimize the dataset before counting."},

  {id:22,cat:"Performance & Workload",type:"mc",scenario:false,
   q:"A developer needs to update a 'status' field on 40 records simultaneously. Which approach is most WU-efficient?",
   opts:["Use a Recursive API Workflow that processes one record per cycle, scheduling itself for the next.","Use 'Make changes to a list of Things' action with the list of 40 records — this is a single batched server operation.","Use a frontend workflow with a loop (using a counter custom state) to update each record one by one.","Use the Data API to send 40 individual PATCH requests from an external script."],
   correct:1,explanation:"'Make changes to a list of Things' is a single batched server operation — far more efficient than processing records individually. Recursive workflows have per-cycle overhead. Frontend loops are client-side and unreliable. 40 individual API calls each have their own WU overhead."},

  {id:23,cat:"Performance & Workload",type:"ma",scenario:false,
   q:"Which of the following will NOT consume any Workload Units? (Select all that apply)",
   opts:["Displaying an Option Set value in a text element","Evaluating a conditional that changes an element's background color based on a custom state","Running a 'Search for Things' with zero results returned","Showing or hiding a group via a workflow action","An API Connector call that returns data (configured as 'Data' type)"],
   correct:[0,1,3],explanation:"A: Option Sets are client-side — zero WU. B: Conditional on a state (client-side value) = zero WU. C: FALSE — even a search returning zero results still runs on the server and costs WU (the query was executed). D: Show/hide is purely client-side = zero WU. E: API Connector 'Data' type calls run server-side and consume WU."},

  // ── BACKEND FUNCTIONALITY ──
  {id:24,cat:"Backend Functionality",type:"ma",scenario:false,
   q:"Which statements about Database Triggers in Bubble are TRUE? (Select all that apply)",
   opts:["A DB Trigger fires when a record of the watched type is created, modified, or deleted.","If a DB Trigger modifies the same record that triggered it, a cascade re-trigger will automatically fire again.","DB Triggers can access both the current state and the pre-change state of the modified record.","DB Triggers run server-side and can use 'Ignore privacy rules' to access all fields.","DB Triggers can be scheduled to run at a specific future time."],
   correct:[0,2,3],explanation:"A: Correct — triggers watch all changes. B: FALSE — Bubble prevents cascade re-triggering; trigger-initiated changes don't re-fire the trigger. C: Correct — 'Thing before change' and 'Thing now' are both available. D: Correct — triggers are server-side with 'Ignore privacy rules' available. E: FALSE — triggers are reactive (fire on change), not schedulable."},

  {id:25,cat:"Backend Functionality",type:"mc",scenario:true,
   q:"You need to send a personalized weekly digest email to all 10,000 active users every Monday at 9 AM. What is the correct Bubble implementation?",
   opts:["Create a Recurring Event set to weekly. In the workflow, use 'Make changes to a list of Users' with a 'Send email' action on the list.","Create a Recurring Event set to weekly. Use 'Schedule API Workflow on a list' targeting all active users, with a separate API Workflow that sends the email for one user.","Create a frontend workflow using 'Do when Current date/time = Monday 9 AM' that searches for all users and sends emails in a loop.","Use a Database Trigger on the User type set to fire when 'Modified Date is Monday'. Send the email inside the trigger."],
   correct:1,explanation:"Option B is correct: a Recurring Event initiates, then 'Schedule API Workflow on a list' dispatches individual server-side jobs per user — this scales to 10,000+ reliably. Option A fails because 'Make changes to a list' doesn't support per-item actions like sending individual emails. Option C is completely wrong — frontend workflows don't run without an active browser session. Option D misunderstands DB triggers."},

  {id:26,cat:"Backend Functionality",type:"tf",scenario:false,
   q:"True or False: If a backend API Workflow fails midway through its steps, Bubble will automatically roll back any database changes made by the earlier steps in that workflow.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Bubble has no automatic rollback mechanism. If a workflow fails at Step 5, Steps 1–4 have already committed their changes to the database and will not be undone. You must design workflows defensively — check conditions before each critical step and handle partial failures manually."},

  {id:27,cat:"Backend Functionality",type:"mc",scenario:true,
   q:"A developer creates a backend API Workflow named 'process-order' and tries to call it from an external service, but gets a 404 error. What are the most likely causes? (Choose the best single answer)",
   opts:["The workflow has a syntax error in one of its steps that prevents it from being accessible.","The workflow is not checked as 'Expose as public API endpoint', the API is not enabled in Settings, or the URL is using the wrong environment (dev vs live).","The external service is not whitelisted in Bubble's security settings.","The workflow requires OAuth authentication which the external service hasn't configured."],
   correct:1,explanation:"404 on an API Workflow endpoint is almost always caused by: (1) forgetting to check 'Expose as public API endpoint', (2) not enabling the Workflow API in Settings > API, or (3) calling the dev URL when trying to hit live (or vice versa). Bubble doesn't have IP whitelisting for outbound callers. Auth issues return 401, not 404."},

  {id:28,cat:"Backend Functionality",type:"ma",scenario:false,
   q:"Which of the following are valid use cases for a Recursive API Workflow? (Select all that apply)",
   opts:["Sending a personalized email to each of 5,000 users in a list","Importing 10,000 rows from a CSV file, processing one row per cycle","Updating a single record's field value when triggered by a button click","Running a nightly cleanup of expired session records where the count varies","Replacing a Recurring Event on lower-tier plans that don't support native scheduling"],
   correct:[0,1,3,4],explanation:"A, B, D: Classic recursive use cases — process a large list one item at a time with a termination condition. E: Valid — recursive workflows can simulate recurring events on plans without native scheduling support. C is wrong: a recursive workflow for a single record update is massive overkill; a simple API Workflow or frontend workflow handles this."},

  {id:29,cat:"Backend Functionality",type:"mc",scenario:false,
   q:"What is the key difference between 'Schedule API Workflow on a list' and a Recursive API Workflow?",
   opts:["'Schedule on a list' processes items sequentially one by one; Recursive processes all items simultaneously.","'Schedule on a list' dispatches one workflow execution per list item automatically (Bubble handles iteration); Recursive manually schedules itself for the next item, giving more control over termination logic.","'Schedule on a list' can only be used in frontend workflows; Recursive only works in backend workflows.","'Schedule on a list' is limited to 50 items; Recursive has no limit."],
   correct:1,explanation:"'Schedule API Workflow on a list' is Bubble's built-in iteration — it automatically creates one job per item. Recursive gives you manual control: process one item, check a condition, then optionally schedule the next cycle. Recursive is better for complex termination logic or when you need to process items with dependencies."},

  // ── BUBBLE INTERFACE ──
  {id:30,cat:"Bubble Interface",type:"mc",scenario:true,
   q:"A developer pushes a hotfix to live. 30 minutes later, users report a critical data migration workflow (only in the dev database) didn't run on live. What happened?",
   opts:["The deploy failed silently. The developer should check the Issues panel for errors and re-deploy.","Deploying to live copies app structure and logic, but NOT data or data operations. The migration must be separately run in the live environment.","The workflow ran but was blocked by privacy rules on the live database. Check Server Logs on live.","Bubble automatically migrates data between environments during deployment if the workflow is set to run on 'App is deployed'."],
   correct:1,explanation:"This is a fundamental Bubble concept: deployment copies app structure (pages, workflows, styles, data types) but the live and development databases are completely separate. Any data manipulation — including migration workflows — must be explicitly run in the live environment. There is no 'App is deployed' event trigger in Bubble."},

  {id:31,cat:"Bubble Interface",type:"mc",scenario:true,
   q:"A developer is building a major new feature while the live app is active with real users. What is the correct professional workflow?",
   opts:["Work directly in the development version — since dev and live are separate, changes in dev never affect live until deployed.","Create a branch in Bubble's version control, develop the feature there, test in preview, then merge to main and deploy to live.","Duplicate the entire app, build the feature in the copy, then manually recreate all changes in the original app.","Enable maintenance mode on the live app while making changes in the editor, then disable when done."],
   correct:1,explanation:"Branches are the correct professional workflow. A branch is an isolated copy of the app's structure — changes don't affect main dev or live until deliberately merged. Option A works but risks unstable states in the main dev branch. Option C is impractical. Option D is unnecessary — branches eliminate the need for maintenance mode during development."},

  {id:32,cat:"Bubble Interface",type:"tf",scenario:false,
   q:"True or False: When you deploy to live in Bubble, all data in the development database is automatically copied to the live database.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Deployment in Bubble NEVER copies data between environments. Only the app's structure (pages, elements, workflows, styles, privacy rules, data type definitions) is deployed. The live and development databases are always separate. Data must be manually migrated if needed."},

  {id:33,cat:"Bubble Interface",type:"ma",scenario:false,
   q:"Which of the following are found in Bubble's app Settings panel? (Select all that apply)",
   opts:["Enabling the Data API and Workflow API","Configuring a custom domain","Setting the app's default language and managing translations","Viewing real-time WU consumption metrics","Configuring maintenance mode","Managing app collaborators/editors"],
   correct:[0,1,2,4,5],explanation:"A: Settings > API. B: Settings > Domain/email. C: Settings > Languages. D: INCORRECT — WU consumption metrics are in the App Metrics dashboard/logs, not in Settings. E: Settings > General. F: Settings > General > App editors. Knowing where each setting lives is directly tested on the exam."},

  {id:34,cat:"Bubble Interface",type:"mc",scenario:false,
   q:"What is the primary purpose of Bubble's 'Debugger' tool?",
   opts:["To scan for security vulnerabilities and privacy rule misconfigurations in the app","To step through workflow execution in real time during Preview, showing the value of each expression at each step","To compare differences between the development and live versions of the app","To analyze Workload Unit consumption by each workflow and page"],
   correct:1,explanation:"The Debugger is specifically for runtime workflow inspection in Preview mode — it lets you pause execution step by step and inspect the actual value of every expression and state. The Security Dashboard handles vulnerabilities. Version control handles dev/live comparison. App Metrics handles WU analysis."},

  {id:35,cat:"Bubble Interface",type:"tf",scenario:false,
   q:"True or False: Bubble's version control allows you to revert the live app directly to any previous save point, bypassing the development environment.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Version control lets you revert the development version to a previous save point. To put a reverted version live, you must then deploy it from development to live. You cannot push directly from a historical save to live — it always goes through the dev environment first."},

  // ── LAYOUT & STYLES ──
  {id:36,cat:"Layout & Styles",type:"mc",scenario:true,
   q:"A developer builds a two-column layout using a Row container. On desktop it looks correct, but on mobile the columns overlap instead of stacking. What is the most likely cause?",
   opts:["The Row container's layout type needs to be changed to 'Column' via a conditional when page width is below 768px.","The child elements have no minimum width set, so Bubble doesn't know when to wrap them to a new line.","The child elements are set to 'Align to parent' instead of being direct children of a Row container.","The Row container itself has a fixed width that is too wide for mobile screens."],
   correct:1,explanation:"In Bubble's responsive engine, Row containers wrap children when combined minimum widths exceed available space. Without a minimum width on children, they shrink rather than wrap — causing overlap. Option A is a valid workaround but not the root cause. Option C would cause overlap by design, not a mobile-specific bug."},

  {id:37,cat:"Layout & Styles",type:"tf",scenario:false,
   q:"True or False: In Bubble's responsive engine, a child element set to 'Fill container' width inside a Column layout will expand to take 100% of the available horizontal space.",
   opts:["True","False"],correct:0,
   explanation:"TRUE. In a Column layout, Fill children take 100% of the parent's available width (stacked vertically). In a Row layout, Fill siblings share the horizontal space proportionally. Fill is the key to fluid, responsive layouts — it allows elements to grow/shrink with the parent container."},

  {id:38,cat:"Layout & Styles",type:"mc",scenario:false,
   q:"What is the difference between 'Align to parent' layout and 'Row/Column' layout in Bubble?",
   opts:["'Align to parent' is for mobile layouts; 'Row/Column' is for desktop layouts.","'Align to parent' uses absolute positioning — children can overlap and are positioned relative to the container. 'Row/Column' uses flexbox — children flow in sequence and cannot overlap without intentional z-index manipulation.","'Row/Column' supports responsive breakpoints; 'Align to parent' does not.","They are identical — 'Align to parent' is just the legacy name for 'Row/Column'."],
   correct:1,explanation:"This is a fundamental layout distinction. 'Align to parent' is absolute positioning — great for overlapping elements like modals or image overlays. 'Row/Column' is flexbox-based flow — elements stack or sit side by side without overlapping. Most responsive layouts use Row/Column. Align to parent is for specific overlay use cases."},

  {id:39,cat:"Layout & Styles",type:"ma",scenario:false,
   q:"Which of the following will cause a Group to NOT collapse its height when its content is hidden? (Select all that apply)",
   opts:["The Group has a fixed height set (e.g., 200px) instead of 'Fit to content height'","The Group's 'Collapse when hidden' checkbox is unchecked on the hidden child element","The hidden child element has a minimum height that prevents the parent from shrinking","The Group is inside a Row container — Row containers don't support height collapse","The Group itself is set to 'Fixed' height rather than 'Fit to content'"],
   correct:[0,2,4],explanation:"A: A fixed height on the Group overrides any content-based collapsing. C: A min-height on a child creates a floor — the parent cannot shrink below it. E: If the Group itself has Fixed height, it won't resize regardless of content. B is wrong — 'Collapse when hidden' on the child removes the child's space, which then allows the parent to shrink (if set to fit content). D is wrong — Row containers do support height changes."},

  {id:40,cat:"Layout & Styles",type:"mc",scenario:true,
   q:"A Reusable Element (navigation bar) looks correct on the homepage but appears broken (wrong width) on the product page. What is the most likely cause?",
   opts:["Reusable Elements cannot be placed on multiple pages — each page needs its own copy.","The Reusable Element has a fixed width set internally. On the homepage the parent container matches that width, but on the product page the parent is a different width.","The product page has different privacy rules that block the Reusable Element from rendering.","The Reusable Element needs to be re-initialized on each page by running a workflow on page load."],
   correct:1,explanation:"Reusable Elements with fixed widths will look correct when the parent container happens to match that width, but will appear broken (too wide, clipped, or too narrow) when placed in containers of different widths. The fix is to set the Reusable Element's root width to 'Fill container' so it adapts to whatever parent it's placed in."},

  // ── APIS & INTEGRATIONS ──
  {id:41,cat:"APIs & Integrations",type:"mc",scenario:true,
   q:"You're integrating Stripe webhooks so your app updates an Order's status to 'Paid' when Stripe confirms payment. What is the correct Bubble implementation?",
   opts:["Use the API Connector to poll Stripe's API every 30 seconds using a Recurring Event, checking for new paid orders.","Create a backend API Workflow, expose it as public, provide its URL to Stripe as the webhook endpoint. The workflow receives the payload and updates the Order.","Create a frontend workflow on the dashboard page using 'Do when condition is true' that checks Stripe via API Connector each time the page loads.","Use Bubble's Data API to let Stripe directly write to the Order type using a POST request with the admin API token."],
   correct:1,explanation:"Webhooks require a server-side endpoint that Stripe can POST to. A backend API Workflow exposed as public creates exactly this. Option A (polling) is inefficient and misses real-time updates. Option C only works when someone is on that page. Option D exposes your admin token to Stripe — a severe security risk that bypasses all privacy rules."},

  {id:42,cat:"APIs & Integrations",type:"ma",scenario:false,
   q:"Which statements about Bubble's API Connector are correct? (Select all that apply)",
   opts:["API Connector calls can be configured as either 'Data' (auto-loads) or 'Action' (triggered manually).","Marking a parameter as 'Private' ensures it is sent server-side only, not exposed in client-side code.","The API Connector can be used to receive incoming webhook calls from external services.","'Initialize call' must be run so Bubble can detect the API response structure and create data types.","Shared headers in the API Connector apply only to the specific call they're defined on."],
   correct:[0,1,3],explanation:"A: Correct — 'Use as' dropdown controls this. B: Correct — 'Private' hides the value from browser network traffic. C: FALSE — the API Connector is for OUTBOUND calls only. Incoming webhooks are received by backend API Workflows, not the Connector. D: Correct — initialization maps response fields. E: FALSE — shared headers apply to ALL calls under that API."},

  {id:43,cat:"APIs & Integrations",type:"mc",scenario:true,
   q:"An external mobile app needs to read and create records in your Bubble app's database, authenticated as individual users. Which Bubble feature should you use?",
   opts:["Use the Workflow API with 'Expose as public' on all workflows. No auth needed since the mobile app handles it.","Use the Data API with user-level authentication. Privacy rules apply based on the authenticated user's permissions.","Use the API Connector to create a bridge between the mobile app and Bubble's database.","Enable the Data API with the admin token for simplicity — the mobile app will store the token securely."],
   correct:1,explanation:"The Data API with user-level authentication is correct. When requests include user credentials, Bubble enforces privacy rules as if that user were logged in — the correct security model. Option A exposes public endpoints with no user context. Option C is backwards — the API Connector is for Bubble calling external APIs. Option D is critically wrong: an admin token in a mobile app can be extracted, bypassing all privacy rules."},

  {id:44,cat:"APIs & Integrations",type:"tf",scenario:false,
   q:"True or False: Bubble's Data API respects the same privacy rules configured in the database editor, based on the authenticated user making the request.",
   opts:["True","False"],correct:0,
   explanation:"TRUE. The Data API enforces privacy rules server-side based on the authenticated user. If a request is authenticated as User A, User A's privacy rules apply — they can only see/modify what those rules permit. The only exception is when using an admin API token, which bypasses all privacy rules entirely."},

  {id:45,cat:"APIs & Integrations",type:"mc",scenario:false,
   q:"What is the correct way to store a third-party API secret key in a Bubble app?",
   opts:["In an Option Set attribute so it's easily accessible across the app","In a private header field in the API Connector — marked as 'Private' so it's server-side only","In a custom state on the page that needs it","In a database field on a Settings type with a privacy rule restricting view to Admins only"],
   correct:1,explanation:"API secret keys must NEVER be client-side. 'Private' parameters in the API Connector are stored server-side and never sent to the browser. Option A is wrong — Option Sets load client-side and are visible in browser dev tools. Option C is wrong — custom states are client-side. Option D puts the key in the database (retrievable via the Data API if misconfigured) and is risky."},

  {id:46,cat:"APIs & Integrations",type:"ma",scenario:false,
   q:"Which of the following correctly describe the difference between Bubble's Data API and Workflow API? (Select all that apply)",
   opts:["The Data API allows direct CRUD operations on database records (GET, POST, PUT, PATCH, DELETE) for specific data types.","The Workflow API allows external callers to trigger specific server-side workflows you've defined.","The Data API automatically bypasses all privacy rules — it's designed for admin access only.","Both the Data API and Workflow API must be enabled in Settings > API before they can be used.","The Workflow API can return custom data in its response using the 'Return data from API' action."],
   correct:[0,1,3,4],explanation:"A: Correct — the Data API is a REST interface for direct database operations. B: Correct — the Workflow API exposes your backend workflows as callable endpoints. C: FALSE — the Data API respects privacy rules by default; only admin token requests bypass them. D: Correct — both must be explicitly enabled. E: Correct — 'Return data from API' sends structured data back to the caller."},

  {id:47,cat:"APIs & Integrations",type:"mc",scenario:true,
   q:"A developer configures an API Connector call to fetch a user's profile from an external service. After clicking 'Initialize call', Bubble shows an error: 'Could not connect'. The developer verified the API key is correct. What should they check next?",
   opts:["The API Connector only works in the live environment — switch to live and try again.","The endpoint URL may be incorrect, the external service may be down, or the initialization is being blocked by the external API's rate limits. Check the URL and try again in a few minutes.","'Initialize call' requires the app to be deployed to live first — it doesn't work in development.","The API Connector requires OAuth authentication for all external services — configure OAuth first."],
   correct:1,explanation:"'Could not connect' during initialization usually means: wrong URL, the external service is temporarily unavailable, or the request was rate-limited. The API Connector works in both dev and live environments — initialization happens in dev. OAuth is only required if the specific API requires it."},

  // ── MIXED ADVANCED ──
  {id:48,cat:"Performance & Workload",type:"mc",scenario:true,
   q:"An app has a 'Notifications' feature. Each user sees their own unread notification count in the header. The count updates in real time. A developer implements this with: 'Do when condition is true (every time): Search for Notifications where User = Current User AND Read = no:count is not NotifCount state → set state to new count'. What is the problem?",
   opts:["Custom states cannot store numbers — the state type needs to be changed to text.","The 'Do when' condition runs a DB search roughly every 2 seconds per active user session, creating a massive WU drain at scale.","'Do when condition is true' doesn't support ':count' expressions — use ':first item' instead.","The condition will never trigger because Bubble caches search results and the count won't update."],
   correct:1,explanation:"'Do when condition is true' continuously re-evaluates its condition (approximately every 2 seconds). This means a DB search runs every 2 seconds for every user who is logged in. With 100 concurrent users that's 50 server-side DB queries per second just for notification counts. The correct approach is a Database Trigger that updates a cached 'UnreadCount' field on the User when a Notification is created or marked read."},

  {id:49,cat:"Backend Functionality",type:"mc",scenario:true,
   q:"A developer needs to process a list of 200 records. They choose to use a Recursive API Workflow. What is the essential termination condition pattern?",
   opts:["The workflow automatically stops after 100 iterations — a second recursive chain must handle the remaining 100.","Check if the list of remaining items is empty (or if a counter has reached the list length) BEFORE scheduling the next cycle. If the condition is met, do not schedule — breaking the recursion.","Set a maximum WU budget — Bubble will stop the workflow automatically when it's exceeded.","Use the 'Cancel a scheduled API Workflow' action at the start of each cycle if the list is empty."],
   correct:1,explanation:"The recursive pattern is: process item → remove it from the list (or increment a counter) → check if anything remains → if yes, schedule next cycle; if no, stop. Without this check, the workflow loops forever consuming WU. Bubble does NOT automatically stop recursive workflows. Option D uses 'Cancel' incorrectly — cancel is for externally stopping a scheduled workflow, not for self-termination."},

  {id:50,cat:"Database & Security",type:"mc",scenario:true,
   q:"A SaaS app has multiple organizations. Each organization has users. Users should only see data belonging to their own organization. What is the most scalable privacy rule pattern?",
   opts:["Add each user's email to an allowed list field on every record they should access.","Add an 'Organization' field to every data type, then create a privacy rule: 'This Thing's Organization = Current User's Organization' → View/Find enabled. Apply this rule to all data types.","Create a separate Bubble app for each organization with its own database.","Use Advanced Filters in every search to filter by Current User's Organization — no privacy rules needed."],
   correct:1,explanation:"Storing an Organization reference on every record and using a privacy rule that matches Current User's Organization is the standard multi-tenant pattern in Bubble. It's server-side (secure), scales well, and applies automatically to all searches. Option A doesn't scale. Option C is impractical. Option D uses client-side filtering — Advanced Filters still expose data to the client before filtering, and privacy rules are not optional for security."},
];
