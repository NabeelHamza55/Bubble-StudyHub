import type { ExamQuestion } from "../types";

export const STUDY_QUIZ_QUESTIONS: ExamQuestion[] = [
  // ── BUBBLE INTERFACE (1001–1015) ──
  {id:1001,cat:"Bubble Interface",type:"mc",scenario:true,
   q:"A team ships a privacy-rule change to live on Friday. Monday, support reports users can still see other tenants' invoices in search. Dev preview looks correct. What most likely happened?",
   opts:["Live deploy failed silently; redeploy from the Issues panel.","The team tested in dev/preview but did not deploy the same version to live, or live still runs an older deploy.","Privacy rules are client-only; users must hard-refresh.","Bubble auto-rolls back live deploys when WU spikes."],
   correct:1,explanation:"Per the Bubble Manual, dev and live are separate environments. Structure (including privacy rules) reaches live only after Deploy to live. Preview/dev behavior does not change production until deployed."},

  {id:1002,cat:"Bubble Interface",type:"tf",
   q:"True or False: Creating a version-control branch in Bubble isolates structural changes until you merge back to main.",
   opts:["True","False"],correct:0,
   explanation:"TRUE. Branches (manual.bubble.io version control) let you build features in isolation. Merging applies changes to main dev; deploying still pushes main to live."},

  {id:1003,cat:"Bubble Interface",type:"mc",
   q:"Where do you enable the Workflow API and Data API for external callers?",
   opts:["Plugins tab","Settings > API","Data > App data","Logs > Server log"],
   correct:1,explanation:"Both APIs are toggled under Settings > API (Bubble Manual). Without enabling them, endpoints return errors even if workflows are marked public."},

  {id:1004,cat:"Bubble Interface",type:"ma",
   q:"Which items are copied when you Deploy to live? (Select all that apply)",
   opts:["Page and reusable element structure","Workflow and API workflow definitions","All records in the development database","Privacy rules and option set definitions","Custom domain DNS records at your registrar"],
   correct:[0,1,3],explanation:"Deploy copies app structure: design, workflows, data type definitions, privacy rules, option sets. It never copies dev database records (Manual: development vs live data). DNS at your registrar is outside Bubble."},

  {id:1005,cat:"Bubble Interface",type:"mc",scenario:true,
   q:"A developer restores dev to last Tuesday's save after a bad merge. Live still shows yesterday's bug. What is the correct next step?",
   opts:["Revert live directly from version history.","Fix or re-merge in dev, verify in preview, then Deploy to live.","Duplicate the app; live auto-syncs from the copy.","Enable maintenance mode to roll back live."],
   correct:1,explanation:"Version control reverts the development app. Live changes only via Deploy to live from dev (Manual). You cannot push a historical save straight to live without going through dev."},

  {id:1006,cat:"Bubble Interface",type:"tf",
   q:"True or False: After deploying to live, running a one-time data migration workflow in dev will automatically migrate live data.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Dev and live databases are separate. Migration workflows must be executed in the target environment (often live via backend workflow or manual run)." },

  {id:1007,cat:"Bubble Interface",type:"mc",
   q:"What is the primary purpose of Bubble's Debugger in Preview?",
   opts:["Scan for missing privacy rules","Step through workflows and inspect expression values at each step","Compare live vs dev element trees","Export WU reports to CSV"],
   correct:1,explanation:"The Debugger (Manual: testing workflows) pauses workflow execution in Preview so you can inspect data sources and step results—essential for certification-level troubleshooting."},

  {id:1008,cat:"Bubble Interface",type:"ma",
   q:"A startup uses collaborators on a marketplace app. Which practices follow Bubble's editor workflow guidance? (Select all that apply)",
   opts:["Use branches for large features; merge after review in preview","Edit live database directly to fix production user data when urgent","Use app comments on elements/workflows for handoff notes","Deploy to live only after testing the merged main dev version","Share the Bubble account password so everyone uses one login"],
   correct:[0,2,3],explanation:"Branches, comments, and deploy-after-preview are recommended (Manual: collaboration & version control). Live DB edits in editor are possible but risky; shared passwords violate best practice and Bubble's collaborator model."},

  {id:1009,cat:"Bubble Interface",type:"mc",scenario:true,
   q:"Custom domain works on live but the editor still opens the bubbleapps.io URL. A stakeholder expects the editor at app.example.com. What is accurate?",
   opts:["Point the editor subdomain to Bubble in Settings > Domain","The Bubble editor always runs on bubble.io; custom domains apply to the published app only","Deploy again to bind the editor","Enable 'Use custom domain for editor' in General settings"],
   correct:1,explanation:"Custom domains (Manual: domain settings) apply to the running app users visit, not the Bubble builder URL. Development/preview URLs remain on Bubble's infrastructure."},

  {id:1010,cat:"Bubble Interface",type:"tf",
   q:"True or False: Maintenance mode blocks all access including API workflows hitting your app.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Maintenance mode (Settings > General) shows a message to browser users on the web app. Backend/API workflows can still run depending on configuration—check Manual for current behavior on API access during maintenance."},

  {id:1011,cat:"Bubble Interface",type:"mc",
   q:"Where do you configure default app language and static text translations?",
   opts:["Settings > Languages","Design tab > Responsive","Plugins > Translate","Data > Option sets only"],
   correct:0,explanation:"Settings > Languages manages default language and translation keys (Manual: localization). Option sets are not a substitute for app string translation."},

  {id:1012,cat:"Bubble Interface",type:"mc",scenario:true,
   q:"Two developers edit the same workflow on main dev without a branch. Saves conflict. What does Bubble version control provide?",
   opts:["Real-time Google Docs-style simultaneous editing","Save history and ability to restore prior versions; branches prevent overlapping work","Automatic merge of conflicting workflow steps","Locking live until one developer finishes"],
   correct:1,explanation:"Bubble offers save history and branches (Manual). Concurrent edits on main can overwrite; branches isolate work. There is no live collaborative merge of workflow steps."},

  {id:1013,cat:"Bubble Interface",type:"ma",
   q:"Which are found under Settings > General? (Select all that apply)",
   opts:["App name and timezone","Maintenance mode","Workflow API enable toggle","Collaborator / app editor access","Custom domain configuration"],
   correct:[0,1,3],explanation:"General holds app identity, timezone, maintenance, collaborators (Manual). API toggles live under Settings > API; domain under Domain/email."},

  {id:1014,cat:"Bubble Interface",type:"tf",
   q:"True or False: Preview mode always uses the same database as the live app so stakeholders see real production data.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Preview uses the development database by default (Manual: preview vs live). Never use real PHI/PII in dev unless intentionally synced."},

  {id:1015,cat:"Bubble Interface",type:"mc",scenario:true,
   q:"After merging a branch, automated tests pass in preview but a plugin key differs on live. Checkout fails in production. Best explanation?",
   opts:["Plugins don't deploy","Plugin keys/secrets may be environment-specific; verify live plugin settings after deploy","Privacy rules block Stripe","Branches don't merge plugin metadata"],
   correct:1,explanation:"Structure deploys; plugin credentials and some plugin settings may need to be set per environment (Manual: plugins & deploy). Always verify live plugin configuration post-deploy."},

  // ── LAYOUT & STYLES (1016–1029) ──
  {id:1016,cat:"Layout & Styles",type:"mc",scenario:true,
   q:"A healthcare portal's two-column Row overlaps on mobile instead of stacking. Children lack min width. What does the responsive engine do?",
   opts:["Auto-switches Row to Column at 768px","Children shrink below min width instead of wrapping, causing overlap","Forces horizontal scroll on all pages","Hides the second column via privacy rules"],
   correct:1,explanation:"Manual (responsive engine): Row wraps when combined min widths exceed space. Without min width, flex children shrink and can overlap rather than wrap."},

  {id:1017,cat:"Layout & Styles",type:"tf",
   q:"True or False: In a Column container, a child set to Fill container width spans the full available horizontal space.",
   opts:["True","False"],correct:0,
   explanation:"TRUE. Fill container makes the child expand along the parent's main axis (Manual: layout types)." },

  {id:1018,cat:"Layout & Styles",type:"mc",
   q:"When should you use Align to parent instead of Row/Column?",
   opts:["All mobile layouts","Overlapping elements (badges on images, positioned modals) where flex flow isn't desired","Any RG cell layout","Replacing the responsive engine entirely"],
   correct:1,explanation:"Align to parent is absolute positioning within the parent (Manual). Row/Column is flex flow. Use align-to-parent for overlays, not general page structure."},

  {id:1019,cat:"Layout & Styles",type:"mc",scenario:true,
   q:"A SaaS dashboard RG looks fine on desktop but cells clip on tablet. Which fixes align with the manual? (Select all that apply)",
   opts:["Set reusable header width to Fill container","Add min width to RG cell inner groups so Row wraps","Use fixed 1200px width on the page root","Use conditionals to switch parent Row to Column below a breakpoint","Move Popups inside the RG for easier access"],
   correct:[0,1,3],explanation:"Fill container, min widths, and breakpoint conditionals are documented responsive patterns. Fixed page width breaks tablet. Popups must be page-level (Manual)." },

  {id:1020,cat:"Layout & Styles",type:"mc",scenario:true,
   q:"A hidden accordion section still leaves empty vertical space. The parent Group uses Fit height. What is the most likely cause?",
   opts:["RG pagination","Child hidden but parent has Fixed height, or child lacks Collapse when hidden","Privacy rules on the Group","API Connector delay"],
   correct:1,explanation:"Manual: Collapse when hidden removes layout space; parent must be fit-to-content, not fixed height, for collapse to shrink the group."},

  {id:1021,cat:"Layout & Styles",type:"tf",
   q:"True or False: Collapse when hidden on a Group prevents its Repeating Group from loading data while hidden.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Collapse when hidden affects layout space only (Manual & performance docs). RG data sources still evaluate unless you gate the source with conditionals or limits."},

  {id:1022,cat:"Layout & Styles",type:"mc",
   q:"In a Row with three buttons each set to Fill container equally, how is horizontal space divided?",
   opts:["Each takes 100% width stacked","Space is shared proportionally among Fill siblings","Only the first button expands","Fill is ignored in Rows"],
   correct:1,explanation:"Manual: In Row layouts, multiple Fill children share available horizontal space—key for responsive toolbars."},

  {id:1023,cat:"Layout & Styles",type:"ma",
   q:"Which prevent a fit-height Group from shrinking when content is hidden? (Select all that apply)",
   opts:["Group set to Fixed height","Hidden child without Collapse when hidden checked","Child with min height larger than remaining content","Parent Row always prevents height collapse","Using Column layout on the parent"],
   correct:[0,2],explanation:"Fixed height and child min-height block collapse (Manual). Collapse when hidden on the child helps. Row vs Column doesn't inherently block vertical collapse."},

  {id:1024,cat:"Layout & Styles",type:"mc",scenario:true,
   q:"A marketplace product card RE shows cropped images on some pages only. The RE root width is 320px fixed. Fix?",
   opts:["Duplicate the RE per page","Set RE root to Fill container width; use max width inside if needed","Switch all pages to Align to parent","Disable responsive engine"],
   correct:1,explanation:"Manual: Reusable elements should Fill their parent container so they adapt across pages with different column widths."},

  {id:1025,cat:"Layout & Styles",type:"tf",
   q:"True or False: You can place a Popup inside a Repeating Group cell so each row has its own popup instance.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Popups belong at page root (Manual: elements). Nested popups break show/hide behavior—use one page-level popup and pass context via custom state."},

  {id:1026,cat:"Layout & Styles",type:"mc",
   q:"What does 'min height' on a flex child primarily affect?",
   opts:["WU consumption","The smallest size before wrapping or overflow behavior triggers in responsive layouts","Database query limits","OAuth token lifetime"],
   correct:1,explanation:"Min height/width control responsive wrapping and overflow (Manual: responsive properties)—not server metrics."},

  {id:1027,cat:"Layout & Styles",type:"mc",scenario:true,
   q:"Bulk email campaign landing page: hero text overflows on small phones. Text element has no max width; parent Row won't wrap. Best fix?",
   opts:["Smaller font only","Wrap text element in Column (or set max width %) inside a wrapping Row; test at mobile breakpoint","Convert text to image","Use Advanced filter on copy"],
   correct:1,explanation:"Manual recommends Column for stacked mobile content and constraining text width. Font size alone doesn't fix layout overflow."},

  {id:1028,cat:"Layout & Styles",type:"mc",scenario:true,
   q:"Building a 4-step signup on one page for a fintech app. Valid layout patterns? (Select all that apply)",
   opts:["Four Groups, visibility driven by number custom state","Four pages with Go to page passing a Thing parameter","Popup per step nested in each step Group","Single page, Row/Column layout with Collapse when hidden on inactive steps","Option-set-driven step labels in a text custom state controlling visibility"],
   correct:[0,1,4],explanation:"Custom state + groups and multi-page flows are standard (Manual). Nested popups are invalid; collapse helps layout but doesn't replace state-driven visibility."},

  {id:1029,cat:"Layout & Styles",type:"mc",
   q:"True or False: Styles in Bubble are global—changing a style updates all elements using that style.",
   opts:["True","False"],correct:0,
   explanation:"TRUE. Styles (Manual: Styling) propagate to linked elements, supporting consistent design systems across SaaS apps."},

  // ── FRONTEND FUNCTIONALITY (1030–1044) ──
  {id:1030,cat:"Frontend Functionality",type:"mc",scenario:true,
   q:"Save Profile button: update Current User, go to dashboard only if save succeeded. Correct pattern?",
   opts:["One workflow: Make changes to User, then Go to page with Only when on step 2 checking updated field","Two workflows: button + Do when User changes","Navigate first, update on dashboard load","Store in custom state only—states persist across navigation"],
   correct:0,explanation:"Workflow steps run in order; per-step Only when gates step 2 (Manual: workflows). Custom states don't persist across Go to page."},

  {id:1031,cat:"Frontend Functionality",type:"tf",
   q:"True or False: Custom states persist after page refresh and are visible to other users.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Custom states are per-session client memory (Manual). Use database or URL params for persistence."},

  {id:1032,cat:"Frontend Functionality",type:"mc",scenario:true,
   q:"Marketplace onboarding wizard on one page without navigation. Valid approaches? (Select all that apply)",
   opts:["Groups per step + number custom state + conditionals","Five pages + URL parameters for partial data","RG with 5 rows as step navigator","Text custom state for step name + group visibility","Custom state shared across users via database"],
   correct:[0,1,3],explanation:"State-driven groups and multi-page flows are valid (Manual). RG-as-wizard is an anti-pattern. States aren't cross-user."},

  {id:1033,cat:"Frontend Functionality",type:"mc",scenario:true,
   q:"RG lists Products; Input filters live as user types. Most efficient approach?",
   opts:["Advanced filter only","Search for Products with constraint Name contains Input's value","Do when every 2s to refresh state","Client-side JavaScript plugin only"],
   correct:1,explanation:"Constraints run server-side (Manual: searches). Advanced filters fetch then filter client-side—higher WU at scale."},

  {id:1034,cat:"Frontend Functionality",type:"mc",
   q:"Difference between Trigger custom event vs Schedule custom event?",
   opts:["Trigger runs inline in current workflow sequence; Schedule runs after current workflow completes (even at 0 delay)","Trigger is server-only","They are identical","Schedule is frontend-only"],
   correct:0,explanation:"Manual: Trigger inserts steps now; Schedule dispatches separately—critical for order and error boundaries."},

  {id:1035,cat:"Frontend Functionality",type:"tf",
   q:"True or False: Popups may be nested inside Groups or RG cells.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Popups must be at page level (Manual: popup element)." },

  {id:1036,cat:"Frontend Functionality",type:"ma",
   q:"Valid ways to pass data between pages? (Select all that apply)",
   opts:["Go to page with Thing as page data (destination has type)","URL parameter with unique id + search on arrival","Custom state on origin page persists automatically","Send more parameters on Go to page","Write to DB before navigate, read on load"],
   correct:[0,1,3,4],explanation:"Thing params, URL params, extra parameters, and DB handoff work (Manual). Custom states reset on navigation."},

  {id:1037,cat:"Frontend Functionality",type:"mc",scenario:true,
   q:"Workflow has 3 steps. Step 2 only if checkbox checked; Step 3 always runs. Implementation?",
   opts:["Only when on step 2 only","Only when on entire workflow","Hide button","Two separate buttons only"],
   correct:0,explanation:"Only when applies per step (Manual). Ungated steps always execute."},

  {id:1038,cat:"Frontend Functionality",type:"mc",scenario:true,
   q:"Telehealth app: show appointment popup with patient name from clicked RG row. Pattern?",
   opts:["Nested popup in cell","Page-level popup; set custom state to Current cell's Appointment on click, then Show popup","Store name in option set","Privacy rule on popup"],
   correct:1,explanation:"Manual: one page popup + custom state (or similar) carries row context—standard RG interaction pattern."},

  {id:1039,cat:"Frontend Functionality",type:"tf",
   q:"True or False: 'Do when condition is true' is ideal for real-time unread counts at 10k concurrent users.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. It re-evaluates ~every 2s per session (Manual/performance)—use DB triggers to cache counts instead."},

  {id:1040,cat:"Frontend Functionality",type:"mc",scenario:true,
   q:"E-commerce cart: update line quantity without full page reload. Sound patterns? (Select all that apply)",
   opts:["Custom state list mirroring cart + Make changes on checkout","Make changes to Cart Line on button click + refresh RG source","Advanced filter on all Products globally","Trigger custom event from quantity buttons","Schedule API workflow on every +/- click"],
   correct:[0,1,3],explanation:"State + DB updates and custom events are normal frontend patterns (Manual). Global advanced filters are inefficient; scheduling API per click is heavy."},

  {id:1041,cat:"Frontend Functionality",type:"mc",
   q:"What happens when a workflow step has Only when false?",
   opts:["Entire workflow cancels","That step is skipped; later steps still run","Bubble throws an error","Previous steps roll back"],
   correct:1,explanation:"Manual: Only when skips individual steps without rolling back prior committed actions."},

  {id:1042,cat:"Frontend Functionality",type:"mc",scenario:true,
   q:"User must confirm delete in popup before API delete runs. Sequence?",
   opts:["Delete on row click; popup informational only","Show popup → user confirms → workflow deletes with Only when confirmed state is yes","Delete in Do when","Delete via client plugin"],
   correct:1,explanation:"Standard confirm pattern: gate destructive step with state/flag (Manual: workflows & popups)." },

  {id:1043,cat:"Frontend Functionality",type:"tf",
   q:"True or False: URL parameters can pass a Thing directly without sending an id text.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. URL parameters are text (Manual). Pass unique id, then Do a search for Thing on the destination page."},

  {id:1044,cat:"Frontend Functionality",type:"mc",scenario:true,
   q:"Multi-tenant SaaS header search: filter RG of Projects by Input. Admins see all orgs; members see theirs. Where to enforce org scope?",
   opts:["Advanced filter after fetching all projects","Constraint on Search for Projects: Organization = Current User's Organization (+ admin exception via separate rule/search)","Hide RG with conditional only","Option set on Input"],
   correct:1,explanation:"Server-side constraints + privacy rules enforce tenancy (Manual). UI-only hiding is insecure."},

  // ── BACKEND FUNCTIONALITY (1045–1058) ──
  {id:1045,cat:"Backend Functionality",type:"ma",
   q:"True statements about Database Triggers? (Select all that apply)",
   opts:["Fire on create/modify/delete of watched type","Re-fire infinitely when trigger updates same record","Expose before-change and after-change data","Run server-side; may ignore privacy rules","Replace Recurring Events entirely always"],
   correct:[0,2,3],explanation:"Manual: triggers are reactive, server-side, with before/after; Bubble prevents simple infinite re-trigger loops on same record."},

  {id:1046,cat:"Backend Functionality",type:"mc",scenario:true,
   q:"Weekly digest to 10,000 users Monday 9am. Best architecture?",
   opts:["Recurring event + Make changes to list with Send email on list","Recurring event + Schedule API Workflow on a list of users, each running a per-user email workflow","Frontend Do when Monday","DB trigger on User modified date"],
   correct:1,explanation:"Manual: Schedule on list dispatches one backend job per item—scales for bulk email; list Make changes doesn't send per-row emails."},

  {id:1047,cat:"Backend Functionality",type:"tf",
   q:"True or False: If an API workflow fails at step 5, steps 1–4 are automatically rolled back.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. No transactions/rollback (Manual). Design idempotent steps and error handling."},

  {id:1048,cat:"Backend Functionality",type:"mc",scenario:true,
   q:"External ERP calls 'process-order' API workflow but gets 404. Most likely causes?",
   opts:["Syntax error in step 3","Endpoint not exposed as public, Workflow API disabled, or wrong dev/live base URL","IP whitelist missing","RG limit exceeded"],
   correct:1,explanation:"Manual: 404 usually means API not enabled, workflow not public, or environment URL mismatch—not auth (401)." },

  {id:1049,cat:"Backend Functionality",type:"ma",
   q:"Valid Recursive API Workflow use cases? (Select all that apply)",
   opts:["Email each of 5,000 users","Import CSV rows one per cycle","Update one field on button click","Nightly cleanup of variable-sized expired rows","Simulate recurring schedule on plans without native recurring events"],
   correct:[0,1,3,4],explanation:"Manual: recursion processes lists with termination checks. Single-record button updates don't need recursion."},

  {id:1050,cat:"Backend Functionality",type:"mc",
   q:"Schedule API Workflow on a list vs Recursive workflow?",
   opts:["List schedules one job per item automatically; recursive manually schedules next cycle with custom termination","List runs all items in one WU-free batch","Recursive is frontend-only","List limited to 10 items"],
   correct:0,explanation:"Manual contrasts built-in list scheduling vs hand-rolled recursion for complex control."},

  {id:1051,cat:"Backend Functionality",type:"mc",scenario:true,
   q:"Healthcare app: when LabResult is created, notify assigned clinician. Should run even if patient can't see clinician email. Implementation?",
   opts:["Frontend workflow on results page","API workflow triggered from DB trigger on LabResult create, Ignore privacy rules if needed for lookup","Do when every 2 seconds","Option set change"],
   correct:1,explanation:"Manual: DB triggers + backend workflows run server-side regardless of client session; use carefully with privacy."},

  {id:1052,cat:"Backend Functionality",type:"tf",
   q:"True or False: Backend workflows can run without any user logged in if triggered by API or schedule.",
   opts:["True","False"],correct:0,
   explanation:"TRUE. API workflows, schedules, and triggers operate server-side (Manual)—no browser session required."},

  {id:1053,cat:"Backend Functionality",type:"mc",scenario:true,
   q:"Recursive workflow processes 200 invoices. Essential termination pattern?",
   opts:["Bubble stops at 100 automatically","Before scheduling next cycle, check remaining list empty or index >= count; stop if done","Cancel scheduled workflow each time list empty","Rely on WU cap to halt"],
   correct:1,explanation:"Manual: you must explicitly stop recursion—no auto stop at N iterations."},

  {id:1054,cat:"Backend Functionality",type:"mc",scenario:true,
   q:"Marketplace payout batch Friday night. Which are safe backend patterns? (Select all that apply)",
   opts:["API workflow with Ignore privacy rules only for trusted admin token calls","Public unauthenticated workflow that updates Payout fields","Schedule on list of pending payouts with per-row Stripe API Connector action","Frontend loop over 500 sellers","DB trigger on Payout with Only when Status changed to Approved"],
   correct:[0,2,4],explanation:"Manual: secure endpoints require auth; list scheduling and conditional triggers are standard. Public unauthenticated money workflows are critical vulnerabilities."},

  {id:1055,cat:"Backend Functionality",type:"mc",
   q:"What does 'Return data from API' do in a backend workflow?",
   opts:["Emails the user","Sends JSON response to the API caller","Deletes the record","Opens a popup"],
   correct:1,explanation:"Manual: Workflow API responses use Return data from API for structured JSON to external clients."},

  {id:1056,cat:"Backend Functionality",type:"mc",
   q:"True or False: Recurring Events can call Schedule API Workflow on a list.",
   opts:["True","False"],correct:0,
   explanation:"TRUE. Recurring events initiate backend workflows (Manual), including scheduling work on lists."},

  {id:1057,cat:"Backend Functionality",type:"mc",scenario:true,
   q:"User deletion should remove all Posts. No cascade delete in Bubble. Best approach?",
   opts:["Hide posts in UI","DB trigger on User deleted → Schedule API workflow on list of Posts to delete each","Cascade in data editor","Frontend delete all then user"],
   correct:1,explanation:"Manual: implement cascade via trigger + list workflow—server-side and reliable vs frontend-only."},

  {id:1058,cat:"Backend Functionality",type:"mc",scenario:true,
   q:"Import 8,000 CSV rows via API. Hits timeout if one workflow does all. Pattern?",
   opts:["Single frontend upload workflow","Recursive or list-scheduled API workflow processing batches/rows with termination","Store CSV in option set","Advanced filter"],
   correct:1,explanation:"Manual recommends batching via recursion or schedule-on-list for large server jobs."},

  // ── DATABASE & SECURITY (1059–1072) ──
  {id:1059,cat:"Database & Security",type:"mc",scenario:true,
   q:"Healthcare: patients see own records; doctors see assigned patients; admins see all. Correct privacy rules? (Select all that apply)",
   opts:["MedicalRecord: Patient = Current User → view/find","MedicalRecord: Current User Role Admin → view/find","MedicalRecord: Patient in Current User's AssignedPatients → view/find","Single rule: logged in → view all","Ignore privacy rules on all patient-facing pages"],
   correct:[0,1,2],explanation:"Manual: privacy rules are OR'd; specific allow rules per role. Logged-in-only is insufficient for PHI."},

  {id:1060,cat:"Database & Security",type:"mc",
   q:"True or False: With no privacy rules on a type, records are private by default.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. No rules = public (Manual)—top certification trap."},

  {id:1061,cat:"Database & Security",type:"mc",scenario:true,
   q:"Freelance marketplace: Project has one Client, many Freelancers. Scalable model?",
   opts:["Freelancers list on Project only","Assignment join type (Project + Freelancer + metadata)","All projects on User list only","No relations—search all users"],
   correct:1,explanation:"Manual/data modeling: join types scale for many-to-many and metadata (rates, status)." },

  {id:1062,cat:"Database & Security",type:"mc",scenario:true,
   q:"Security audit findings—actual vulnerabilities? (Select all that apply)",
   opts:["User type has zero privacy rules","Public API workflow modifies users without auth","Stripe secret in option set attribute","Ignore privacy rules in admin report backend workflow","Data API on with default deny view/find on all types"],
   correct:[0,1,2],explanation:"Manual: no rules=public; public write APIs and client-visible secrets fail audits. Ignore rules in trusted backend jobs can be valid. Default deny + API enabled can be OK."},

  {id:1063,cat:"Database & Security",type:"mc",
   q:"What does Find in searches control?",
   opts:["Field visibility inside a record","Whether records appear in Search for results","Whether records can be deleted","SMTP settings"],
   correct:1,explanation:"Manual: separate from View all fields—records can be viewable if directly referenced but not searchable."},

  {id:1064,cat:"Database & Security",type:"mc",
   q:"True or False: Privacy rules are enforced server-side before data reaches the client.",
   opts:["True","False"],correct:0,
   explanation:"TRUE. Core Bubble security guarantee (Manual: privacy)." },

  {id:1065,cat:"Database & Security",type:"mc",scenario:true,
   q:"Multi-tenant SaaS: users see only their Organization's data. Scalable pattern?",
   opts:["Email allow list on each record","Organization field on types + rule This Organization = Current User's Organization","Separate Bubble app per tenant only","Advanced filters only, no privacy rules"],
   correct:1,explanation:"Manual standard multi-tenant pattern: org field + privacy rules on all tenant data types."},

  {id:1066,cat:"Database & Security",type:"ma",
   q:"True about Option Sets? (Select all that apply)",
   opts:["Client-side; zero WU to display","Can have attributes (text, image, color)","Values editable at runtime via workflows","Good for static enums like Order Status","Can be stored as field values on Things"],
   correct:[0,1,3,4],explanation:"Manual: option sets are static in editor, client-cached, not for volatile inventory."},

  {id:1067,cat:"Database & Security",type:"mc",scenario:true,
   q:"Privacy rules use OR logic across rules on one type. User matches Rule A (member) and not Rule B (admin). Can they access?",
   opts:["No—ALL rules must match","Yes—any matching allow rule grants access defined by that rule","Only on Tuesdays","Only via Data API"],
   correct:1,explanation:"Manual: multiple rules are OR'd; first matching allow applies its permissions."},

  {id:1068,cat:"Database & Security",type:"tf",
   q:"True or False: Storing HIPAA data in dev for realistic preview is acceptable without safeguards.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Dev/live DBs are separate but dev is still a real database (Manual)—treat PHI carefully; use synthetic data in dev."},

  {id:1069,cat:"Database & Security",type:"mc",
   q:"Admin API token on Data API requests will:",
   opts:["Respect user privacy rules","Bypass all privacy rules","Only work in preview","Disable workflows"],
   correct:1,explanation:"Manual: admin token is full access—never embed in client apps."},

  {id:1070,cat:"Database & Security",type:"mc",scenario:true,
   q:"RG shows Orders for current user but user can see another user's order id in network tab when guessing UUID. Missing control?",
   opts:["RG page size","Privacy rules on Order (view/find restricted to owner)","Font size","Custom domain"],
   correct:1,explanation:"Manual: without privacy rules, direct ID access or searches may leak data—rules must restrict view and find."},

  {id:1071,cat:"Database & Security",type:"mc",scenario:true,
   q:"Marketplace messages between buyer and seller. Which rules are appropriate? (Select all that apply)",
   opts:["Message: Sender = Current User OR Recipient = Current User → view","Message: logged in → view all for moderation UI on admin role rule","Message: Current User Role = Admin → view/find","Store messages in custom state only","No rules—RG advanced filter"],
   correct:[0,2],explanation:"Manual: participant-based rules plus explicit admin rule. Custom states aren't shared; advanced filters without rules are insecure."},

  {id:1072,cat:"Database & Security",type:"mc",
   q:"True or False: 'View all fields' and 'Find in searches' must both be configured for complete access control.",
   opts:["True","False"],correct:0,
   explanation:"TRUE. Manual treats them independently—you may allow find but restrict fields or vice versa depending on design."},

  // ── PERFORMANCE & WORKLOAD (1073–1086) ──
  {id:1073,cat:"Performance & Workload",type:"mc",scenario:true,
   q:"DB trigger on Order recalculates user spend on ANY field change; WU tripled. Fix?",
   opts:["Only when Status changed to Paid (or relevant field changed)","Cache in custom state on page","Move trigger to frontend","Delete trigger"],
   correct:0,explanation:"Manual/performance: tighten trigger Only when to meaningful changes—every modify evaluates trigger."},

  {id:1074,cat:"Performance & Workload",type:"mc",
   q:"Which consume Workload Units? (Select all that apply)",
   opts:["Toggle Group visibility via workflow","Search for Users with constraints on page load","Change custom state","Schedule API workflow in 10 minutes","DB trigger Only when evaluation after modify","Text color conditional on custom state"],
   correct:[1,3,4],explanation:"Manual: WU = server work—searches, schedules, trigger evaluations. Pure client UI/state = no WU."},

  {id:1075,cat:"Performance & Workload",type:"mc",scenario:true,
   q:"RG 50 products; each cell searches Category by ID. Slow loads. Best fix?",
   opts:["Limit 1 on inner search","Store Category as Thing field on Product; display Current cell's Product's Category's name","Advanced filter on RG","API Connector per cell"],
   correct:1,explanation:"Manual: eliminate N+1 queries via proper relational fields—performance best practice."},

  {id:1076,cat:"Performance & Workload",type:"mc",scenario:true,
   q:"Dashboard: 200-order RG with per-cell lookups, Do when polling search every 2s, hidden RGs. WU reductions? (Select all that apply)",
   opts:["RG limit 20 + pagination","Status field on Order instead of per-cell search","Replace polling with trigger-updated cached count","Collapse when hidden stops hidden RG data load","Add date/user constraints to RG source"],
   correct:[0,1,2,4],explanation:"Manual: pagination, denormalization, triggers vs polling, constraints reduce WU. Collapse is layout-only."},

  {id:1077,cat:"Performance & Workload",type:"mc",
   q:"True or False: Search for Orders:count is lightweight because only a number returns.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Manual: count still executes full search server-side—cache counts via fields/triggers when possible."},

  {id:1078,cat:"Performance & Workload",type:"mc",
   q:"Update 40 records at once—most WU-efficient?",
   opts:["Recursive one-by-one","Make changes to a list of Things (single batched operation)","Frontend counter loop","40 separate Data API PATCH from browser"],
   correct:1,explanation:"Manual: list make changes is one batched server operation."},

  {id:1079,cat:"Performance & Workload",type:"ma",
   q:"Which consume ZERO WU? (Select all that apply)",
   opts:["Display option set in text","Conditional on custom state color","Search returning zero rows","Show/hide group action","API Connector Data call on page load"],
   correct:[0,1,3],explanation:"Manual: zero-row search still costs WU; API Connector data loads are server-side."},

  {id:1080,cat:"Performance & Workload",type:"mc",scenario:true,
   q:"SaaS app notification badge uses Do when + search count every 2s for 500 concurrent users. Impact?",
   opts:["No impact—counts are free","Hundreds of searches per second—massive WU; use trigger-maintained UnreadCount on User","Custom states can't be numbers","Bubble caches forever"],
   correct:1,explanation:"Manual performance docs warn against polling searches; cache on User via DB trigger."},

  {id:1081,cat:"Performance & Workload",type:"tf",
   q:"True or False: Advanced filters on an RG data source reduce server WU because filtering happens in the browser.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Advanced filters still fetch underlying data server-side first (Manual)—often worse than constraints."},

  {id:1082,cat:"Performance & Workload",type:"mc",scenario:true,
   q:"Bulk email RG preview loads 10,000 Campaign rows on admin page. First fix?",
   opts:["More fonts","Add constraints + pagination/limit on Search for Campaigns","Delete privacy rules","Move RG to popup"],
   correct:1,explanation:"Manual: constrain and paginate large searches—primary WU lever."},

  {id:1083,cat:"Performance & Workload",type:"mc",
   q:"Why avoid API Connector 'Data' type calls on every page load for static config?",
   opts:["They run server-side and consume WU each load","They break responsive engine","They disable privacy rules automatically","They require branches"],
   correct:0,explanation:"Manual: Data calls execute server-side per load—use option sets for static config (0 WU)." },

  {id:1084,cat:"Performance & Workload",type:"mc",scenario:true,
   q:"RG performance checklist for 100k-row table. Valid? (Select all that apply)",
   opts:["Server-side constraints (date, status, owner)","Pagination with limit","Per-cell Do a search for related Thing","Full table advanced filter","Index-friendly fields used in constraints"],
   correct:[0,1,4],explanation:"Manual: constrain, paginate, denormalize—not full scans or per-cell searches at scale."},

  {id:1085,cat:"Performance & Workload",type:"mc",
   q:"True or False: Ignoring privacy rules in a backend workflow increases WU because more fields are read.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Ignore privacy rules affects access control, not WU pricing directly (Manual)—WU follows operations run."},

  {id:1086,cat:"Performance & Workload",type:"mc",scenario:true,
   q:"Marketplace search loads all Products then advanced-filters by city client-side. Users in one city only. Better approach?",
   opts:["Keep advanced filter","Add constraint City = dropdown's value on Search for Products","Bigger RG page size","Remove privacy rules"],
   correct:1,explanation:"Manual: server constraints limit rows transferred—critical for marketplaces."},

  // ── APIS & INTEGRATIONS (1087–1100) ──
  {id:1087,cat:"APIs & Integrations",type:"mc",
   q:"Stripe webhook should mark Order Paid when charge succeeds. Correct setup?",
   opts:["Recurring poll Stripe","Public backend API workflow URL in Stripe; workflow parses event and updates Order","Frontend Do when on dashboard","Data API POST with admin token in Stripe"],
   correct:1,explanation:"Manual: inbound webhooks hit exposed backend API workflows—not API Connector (outbound only)." },

  {id:1088,cat:"APIs & Integrations",type:"ma",
   q:"True about API Connector? (Select all that apply)",
   opts:["Use as Data or Action","Private parameters stay server-side","Receives inbound webhooks natively","Initialize call maps response fields","Shared headers apply to all calls in that API"],
   correct:[0,1,3,4],explanation:"Manual: Connector is outbound; webhooks use Workflow API. Shared headers are API-wide."},

  {id:1089,cat:"APIs & Integrations",type:"mc",
   q:"Mobile app reads/creates user-scoped records as logged-in users. Use?",
   opts:["Public Workflow API only","Data API with user authentication so privacy rules apply","API Connector bridge","Admin Data API token in the app binary"],
   correct:1,explanation:"Manual: user-authenticated Data API enforces privacy rules per user—never ship admin token to clients."},

  {id:1090,cat:"APIs & Integrations",type:"mc",
   q:"True or False: Data API requests with user auth enforce privacy rules for that user.",
   opts:["True","False"],correct:0,
   explanation:"TRUE. Manual: same rules as app except admin token bypass."},

  {id:1091,cat:"APIs & Integrations",type:"mc",
   q:"Where to store third-party API secret?",
   opts:["Option set","API Connector private header/parameter","Page custom state","Public text element"],
   correct:1,explanation:"Manual: private Connector params are server-side; option sets and states are client-visible."},

  {id:1092,cat:"APIs & Integrations",type:"mc",
   q:"Data API vs Workflow API—correct? (Select all that apply)",
   opts:["Data API: REST CRUD on types","Workflow API: run defined backend workflows","Data API always bypasses privacy","Both enabled in Settings > API","Workflow API can return data via Return data from API"],
   correct:[0,1,3,4],explanation:"Manual distinguishes REST data access vs custom workflow endpoints; privacy applies without admin token."},

  {id:1093,cat:"APIs & Integrations",type:"mc",
   q:"API Connector initialize fails 'Could not connect' but key is valid. Next checks?",
   opts:["Must be live only","URL typo, service down, or rate limit—verify endpoint in dev","Requires deploy first","OAuth always required"],
   correct:1,explanation:"Manual: initialization runs in editor/dev; connection errors are URL/service/rate issues."},

  {id:1094,cat:"APIs & Integrations",type:"mc",
   q:"Zapier must create Invoice records when a Google Sheet row is added. Secure approach?",
   opts:["Workflow API with authentication + workflow that creates Invoice with validation","Public workflow no auth","Sheet embed in RG","Option set row storage"],
   correct:0,explanation:"Manual: expose Workflow API with proper auth; validate payload server-side."},

  {id:1095,cat:"APIs & Integrations",type:"mc",
   q:"True or False: Putting the Data API admin token in a mobile app is safe if the app is published on app stores.",
   opts:["True","False"],correct:1,
   explanation:"FALSE. Manual: admin token bypasses all privacy—extractable from binaries; use user auth."},

  {id:1096,cat:"APIs & Integrations",type:"mc",
   q:"Healthcare partner polls your app for new appointments every 5 seconds from 50 clinics. Problems? (Select all that apply)",
   opts:["Polling wastes WU vs webhook push to your API workflow","Data API admin token in their script bypasses patient privacy","API Connector Action on a schedule per clinic is lighter than polling","Misconfigured public workflow could expose PHI","Option sets for appointment times are ideal live schedules"],
   correct:[0,1,3],explanation:"Manual: prefer event-driven webhooks; never share admin tokens; public endpoints risk PHI exposure."},

  {id:1097,cat:"APIs & Integrations",type:"mc",
   q:"API Connector 'Use as' Data means:",
   opts:["Call runs automatically when relevant page loads (server-side)","Call only on button click always","No WU ever","Replaces database"],
   correct:0,explanation:"Manual: Data type loads on page load (server-side, WU). Action type runs from workflows."},

  {id:1098,cat:"APIs & Integrations",type:"mc",
   q:"External service needs custom JSON including nested user object from workflow. Return how?",
   opts:["Send email with JSON","Return data from API action building structured fields","Set custom state","Store in option set"],
   correct:1,explanation:"Manual: Return data from API defines Workflow API response bodies."},

  {id:1099,cat:"APIs & Integrations",type:"mc",
   q:"True or False: The API Connector can call external APIs from backend workflows using Action-type calls.",
   opts:["True","False"],correct:0,
   explanation:"TRUE. Manual: Action calls run in workflows (frontend or backend depending on context)—Data type is for auto-load."},

  {id:1100,cat:"APIs & Integrations",type:"mc",
   q:"SaaS integrates Slack notify on new support ticket. Ticket created via frontend workflow. Reliable notify?",
   opts:["Slack API Connector only in frontend after Create thing","After Create thing, Schedule/API workflow (or same backend) calling Slack Action server-side","Do when on tickets page","Slack option set"],
   correct:1,explanation:"Manual: external side effects belong in backend workflows so they run if user closes tab—frontend-only calls can fail."},
];
