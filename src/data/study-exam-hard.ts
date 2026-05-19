import type { ExamQuestion } from "../types";

/** Expert-tier multi-answer only — IDs 1101–1135 */
export const HARD_MA_QUESTIONS: ExamQuestion[] = [
  // ── BUBBLE INTERFACE (1101–1105) ──
  {id:1101,cat:"Bubble Interface",type:"ma",scenario:true,
   q:"Friday 5pm: privacy rules fixed in dev, preview passes, live still leaks cross-tenant invoices Monday. Which failure modes are plausible? (Select all that apply)",
   opts:["Deploy to live never ran after the fix","Live database was edited manually but structure wasn't redeployed","Preview uses dev DB—fix wasn't validated against live data shape","Collaborator edited live app directly without merging to dev first","Changing privacy rules requires a custom domain redeploy"],
   correct:[0,2,3],explanation:"Structure (privacy rules) reaches live only via deploy; preview ≠ live DB. Live editor edits bypass dev branch workflow—classic cert trap. DNS/custom domain is unrelated to privacy rules."},

  {id:1102,cat:"Bubble Interface",type:"ma",scenario:true,
   q:"You branch for a payments feature, merge to main, deploy to live. Stripe webhooks fail with 404 but worked in dev API tests. What should you verify? (Select all that apply)",
   opts:["Workflow API enabled on live app (Settings > API)","The workflow is marked 'Expose as a public API workflow'","Live webhook URL uses the live app's base URL, not dev","Deploy copies plugin secret keys automatically","API workflow name/endpoint path unchanged after merge"],
   correct:[0,1,2,4],explanation:"404 = endpoint missing, wrong environment URL, or workflow not public/enabled. Plugin keys often need live-specific values—deploy does not reliably copy secrets."},

  {id:1103,cat:"Bubble Interface",type:"ma",
   q:"Which actions change LIVE user data without deploying app structure? (Select all that apply)",
   opts:["Run a backend workflow in live via API with admin token","Edit a record in App Data while viewing live database in editor","Deploy to live from dev","Merge a version-control branch in dev","A scheduled API workflow already deployed fires on live"],
   correct:[0,1,4],explanation:"Live DB is mutable via server workflows and editor data tab. Deploy/merge change structure in dev until you deploy— they don't directly mutate live records."},

  {id:1104,cat:"Bubble Interface",type:"ma",scenario:true,
   q:"HIPAA app: team wants realistic staging with production-like volume. Which violate Bubble + compliance best practice? (Select all that apply)",
   opts:["Copy production PHI into dev for QA","Use synthetic patients in dev; deploy privacy rules to live","Run migration workflow in dev only and assume live migrated","Share one Bubble login for all developers","Use branches; restrict live DB access to break-glass admins"],
   correct:[0,2,3],explanation:"Dev/live DBs are separate; PHI in dev is a compliance failure. Migrations must run where data lives. Shared accounts break audit trails."},

  {id:1105,cat:"Bubble Interface",type:"ma",
   q:"Issue Checker flags slow page before launch. Which remediations align with Manual guidance? (Select all that apply)",
   opts:["Reduce count of data sources on initial view","Add constraints/limits to heavy searches","Move all logic to client-side custom states","Defer below-fold RGs until tab/scroll interaction","Replace all Groups with Align to parent"],
   correct:[0,1,3],explanation:"Issue Checker targets WU/load patterns—fewer searches, constrained data, deferred loading. Client-only state doesn't replace server searches; align-to-parent isn't a performance fix."},

  // ── LAYOUT & STYLES (1106–1110) ──
  {id:1106,cat:"Layout & Styles",type:"ma",scenario:true,
   q:"Fintech dashboard: sidebar + main RG overlap on iPhone 13. Sidebar Group min-width 280px; main Row never wraps. Valid fixes? (Select all that apply)",
   opts:["Conditional: below breakpoint, parent Row → Column","Conditional hide sidebar; show menu icon opening Group Focus","Set sidebar min-width 0 on mobile","Nest Popup inside RG cell for sidebar","Reduce page root fixed width from 1400px to fit viewport"],
   correct:[0,1,2,4],explanation:"Breakpoint Column stack, off-canvas pattern, and min-width 0 are standard responsive fixes. Popups can't nest in RG; fixed root width causes horizontal overflow."},

  {id:1107,cat:"Layout & Styles",type:"ma",scenario:true,
   q:"Accordion sections A/B/C in Column; hidden sections leave gaps. Parent fit-height; children have Collapse when hidden. Still gaps. Causes? (Select all that apply)",
   opts:["Parent Group is Fixed height, not fit to content","Hidden child missing Collapse when hidden","Sibling has min-height larger than collapsed content","Collapse when hidden stops RG data load (so height stays)","Using Column prevents any vertical collapse"],
   correct:[0,1,2],explanation:"Layout gaps are structural—fixed height, missing collapse on child, min-height floors. Collapse doesn't gate data; Column supports collapse when configured correctly."},

  {id:1108,cat:"Layout & Styles",type:"ma",
   q:"Reusable Element (RE) header: logo + nav. On 4 pages widths differ; RE uses fixed 960px width. Which are true? (Select all that apply)",
   opts:["RE should use Fill container width at root","Inner Row can use Fill children for proportional nav items","Duplicating RE per page is required for responsive behavior","Max width on inner Column can cap content on large screens","Privacy rules affect RE width"],
   correct:[0,1,3],explanation:"RE root Fill adapts to parent; inner Fill splits space. Duplication defeats RE purpose. Privacy doesn't control layout width."},

  {id:1109,cat:"Layout & Styles",type:"ma",scenario:true,
   q:"Multi-step KYC form on one page: 6 Groups, number state 1–6, only current Group visible. Step 4 RG must not load until step 4. Required? (Select all that apply)",
   opts:["Conditional on RG data source: only when currentStep = 4","Collapse when hidden on steps 1–3 Groups","Hide button on step 4 until prior steps valid","Custom state alone prevents RG search evaluation","Move RG to page level; show via visibility conditional"],
   correct:[0,4],explanation:"Only conditional data source (or not rendering) stops server fetch. Collapse/hide don't block searches. State doesn't gate evaluation without binding to source."},

  {id:1110,cat:"Layout & Styles",type:"ma",
   q:"Style system refactor: change Primary Button style color. What updates automatically? (Select all that apply)",
   opts:["All elements linked to that style","Elements with overridden color on that style still linked but may keep override","Elements with detached styles","Option set attributes","Reusable elements using the style unless locally overridden"],
   correct:[0,1,4],explanation:"Linked styles propagate; local overrides persist. Detached styles don't update. Option sets are separate from element styles."},

  // ── FRONTEND FUNCTIONALITY (1111–1115) ──
  {id:1111,cat:"Frontend Functionality",type:"ma",scenario:true,
   q:"Checkout: Step 1 address, Step 2 payment, Step 3 confirm. User clicks Back from 3 to 2, then forward—card charged twice. Architecture mistakes? (Select all that apply)",
   opts:["Charge action on step visibility conditional, not guarded by 'paymentCompleted' flag","No idempotency key / status check before Create payment","Custom state holds cart but payment uses separate unlinked workflow","Trigger custom event on every Group show","Only when on step 3 button without checking Order status = Paid"],
   correct:[0,1,2,4],explanation:"Visibility ≠ once-only execution. Idempotent server checks (Order status, flags) prevent double charge. Ungated steps and show-triggered workflows re-fire."},

  {id:1112,cat:"Frontend Functionality",type:"ma",scenario:true,
   q:"RG of 10k Products; live filter Input. Dev fast; live times out. Which explain the gap? (Select all that apply)",
   opts:["Dev DB has 50 rows; live has 10k","Advanced filter on RG in live only","Missing constraint on Search; full table scan","Input debounce plugin removed in live deploy","Privacy rules narrower in dev, wider in live"],
   correct:[0,2,4],explanation:"Volume + unconstrained search = timeout. Advanced filter still fetches underlying set. Privacy scope changes result size. Debounce doesn't fix unbounded search."},

  {id:1113,cat:"Frontend Functionality",type:"ma",
   q:"Passing a Thing to a typed page AND a text URL parameter 'tab=settings'. On destination, valid patterns? (Select all that apply)",
   opts:["Page type Project + Current page's Project for record context","Read URL parameter tab to show settings Group via conditional","Assume custom state from origin survived navigation","Search Project from URL unique id if Thing not sent","Send more parameters only works for numbers"],
   correct:[0,1,3],explanation:"Typed page data + URL params combine cleanly. States reset on navigation. URL params are text. Send more parameters accepts text pairs."},

  {id:1114,cat:"Frontend Functionality",type:"ma",scenario:true,
   q:"Do when condition is true: Search for Messages:count > 0 every ~2s. 2k online users. Symptoms? (Select all that apply)",
   opts:["WU scales with concurrent sessions × poll frequency","Replacing with custom state change only on button fixes scale","DB trigger incrementing unread on Message create scales better","Collapse hidden message Groups stops the searches","Switching to Advanced filter on RG eliminates polls"],
   correct:[0,2],explanation:"Polling searches multiply by active sessions. Triggers maintain denormalized counts. Collapse doesn't stop Do when searches. Advanced filter doesn't replace polling condition."},

  {id:1115,cat:"Frontend Functionality",type:"ma",
   q:"Workflow: Step1 Create Thing, Step2 Trigger custom event 'notify', Step3 Schedule same custom event 0s. What can happen? (Select all that apply)",
   opts:["Trigger runs notify inline before Step 3","Schedule(0) runs notify after entire workflow completes","Notify may run twice if both fire","Schedule 0 is identical to Trigger in all cases","Order matters for side effects (emails/API)"],
   correct:[0,1,2,4],explanation:"Trigger = inline; Schedule = after workflow ends—even at 0s. Both can execute notify. Side-effect order is certification-critical."},

  // ── BACKEND FUNCTIONALITY (1116–1120) ──
  {id:1116,cat:"Backend Functionality",type:"ma",scenario:true,
   q:"DB Trigger on Order: when Status → Shipped, Schedule API on list of LineItems to update inventory. Trigger also sets Status on Order in same workflow. Risks? (Select all that apply)",
   opts:["Infinite re-trigger if trigger fires on any Order modify","List schedule is always safer than recursion","Only when Status changed (before vs after) limits runs","Ignore privacy rules may be needed for cross-org inventory","Frontend Do when can replace this pattern at scale"],
   correct:[0,2,3],explanation:"Modifying the triggering record without Only when Status changed re-fires trigger. Use before/after comparison. Cross-tenant inventory may need controlled ignore rules. Frontend can't replace server triggers at scale."},

  {id:1117,cat:"Backend Functionality",type:"ma",scenario:true,
   q:"Recursive workflow imports 20k CSV rows via API. Termination: 'Schedule self only if list:not empty'. Mid-run deploy to live. What breaks? (Select all that apply)",
   opts:["Scheduled continuation may reference dev vs live mismatch if workflows differ","In-flight schedules may run old workflow version until queue drains","Deploy auto-migrates partial CSV data to live","Must run import in environment where data should land","Bubble auto-rolls back unfinished recursion on deploy"],
   correct:[0,1,3],explanation:"Schedules are environment-specific; deploy doesn't migrate partial imports or cancel queue magically. Run long migrations in target env with version-stable workflow."},

  {id:1118,cat:"Backend Functionality",type:"ma",
   q:"Public API workflow 'create-lead' with no auth gets spammed. Hardening steps? (Select all that apply)",
   opts:["Require Workflow API authentication / secret header","Add server-side validation + rate limiting pattern (batch/check)","Move to Data API with user token","Disable endpoint; use authenticated Zapier with shared secret","Mark Ignore privacy rules so spam can't fail on rules"],
   correct:[0,1,3],explanation:"Auth + validation + trusted integrators. Data API user auth is different use case. Ignore privacy rules worsens exposure—it doesn't stop spam writes."},

  {id:1119,cat:"Backend Functionality",type:"ma",scenario:true,
   q:"Weekly report: Recurring Event → Schedule API on list of Users (50k) → email workflow. WU spiked. Improvements? (Select all that apply)",
   opts:["Filter list to active subscribers before schedule","Single workflow looping 50k emails in one run","Batch schedule (e.g., 500 per hour) via recursive continuation","Move emails to frontend on page load","Use Make changes to list with Send email on list (no per-user schedule)"],
   correct:[0,2],explanation:"Filter + batched scheduling controls WU spikes. One giant loop risks timeout. List Make changes doesn't send per-row emails like schedule-on-list. Frontend can't batch 50k emails."},

  {id:1120,cat:"Backend Functionality",type:"ma",
   q:"API workflow returns 200 but external client says body empty. Causes? (Select all that apply)",
   opts:["Missing 'Return data from API' action","Return action after Terminate workflow","Wrong content-type expectation on client","Workflow ended early due to Only when false on return step","Privacy rules hide response body from client"],
   correct:[0,1,2],explanation:"Return data from API defines JSON body; placement/order matters. Clients must expect Bubble's JSON format. Privacy rules don't blank Workflow API responses—missing return does."},

  // ── DATABASE & SECURITY (1121–1125) ──
  {id:1121,cat:"Database & Security",type:"ma",scenario:true,
   q:"App has zero privacy rules on Order (legacy). Mobile app uses Data API with user auth. Web app uses RG with constraints. Exposure? (Select all that apply)",
   opts:["Authenticated mobile users can search all Orders via API if types exposed","RG constraints hide data in UI only","Direct GET by UUID may return any Order","Admin token in mobile binary would expose everything","Adding Find in searches: No without View rules fixes all leaks"],
   correct:[0,2,3],explanation:"No rules = public data for permitted API operations. UI constraints ≠ security. UUID guessing works. Admin token is catastrophic. View and Find must both be restricted."},

  {id:1122,cat:"Database & Security",type:"ma",scenario:true,
   q:"Rule A: Member → View yes Find yes. Rule B: Admin → View yes Find yes. User is Member, not Admin, matches A only. Another user's record visible when pasted in URL. Missing? (Select all that apply)",
   opts:["Rule A should constrain This Thing's Organization = Current User's Organization","'View all fields' without 'Find' still allows direct link if View granted elsewhere","Logged-in rule alone on type","Auto-binding bypasses privacy","Privacy rules OR—A alone must fully scope access"],
   correct:[0,4],explanation:"Each allow rule must be narrowly scoped; OR logic means overly broad Member rule exposes records. Org/owner constraints required. Auto-binding still respects rules unless ignore rules used server-side."},

  {id:1123,cat:"Database & Security",type:"ma",
   q:"Option Set 'PlanTier' vs custom type 'Subscription' for billing entitlements. Choose Option Set when? (Select all that apply)",
   opts:["Static labels/icons for three tiers edited only in editor","Runtime-updated prices per customer","Storing Stripe subscription id per user","Display-only badge with zero WU","Enumerating workflow branches by tier name"],
   correct:[0,3,4],explanation:"Option sets: static enums, client-cached display, branch labels. Per-user Stripe ids and changing prices need database types."},

  {id:1124,cat:"Database & Security",type:"ma",scenario:true,
   q:"Backend workflow 'admin-export' uses Ignore privacy rules, loops all Users, returns CSV via API. Auditors flag risk. Valid concerns? (Select all that apply)",
   opts:["Any caller with endpoint access exfiltrates all users","Should require auth + role check inside workflow before loop","Ignore rules appropriate only after verifying admin identity","Data API and Workflow API identical risk","Should log/alert on export execution"],
   correct:[0,1,2,4],explanation:"Ignore rules + public endpoint = mass export. Must gate with authentication and in-workflow authorization. APIs differ but this pattern is high risk. Audit logging is best practice."},

  {id:1125,cat:"Database & Security",type:"ma",
   q:"Delete User should cascade Posts and Comments. Implemented via DB Trigger on User deleted. Pitfalls? (Select all that apply)",
   opts:["Trigger won't fire if user deleted from dev data editor vs workflow","Must schedule deletes on lists—no native cascade","Deleting 10k comments in one synchronous workflow may timeout","Privacy rules may block trigger's deletes unless ignore rules used carefully","Option set cleanup required"],
   correct:[1,2,3],explanation:"Bubble has no SQL cascade—triggers + list workflows required. Large deletes need batching. Trigger runs server-side; privacy may block child deletes without controlled ignore."},

  // ── PERFORMANCE & WORKLOAD (1126–1130) ──
  {id:1126,cat:"Performance & Workload",type:"ma",scenario:true,
   q:"RG cell conditional: Search for Tasks where Project = Current cell's Project's Id AND Assignee = Current User. 200 rows × page load. WU fix? (Select all that apply)",
   opts:["Store task count on Project via DB trigger","Per-cell search replaced with Parent Group's Project's Tasks filtered once","Advanced filter in cell","Limit RG to 20 with pagination","Collapse when hidden on row Groups"],
   correct:[0,1,3],explanation:"N+1 cell searches are a top cert trap—denormalize or parent source + pagination. Advanced filter still fetches. Collapse doesn't remove searches."},

  {id:1127,cat:"Performance & Workload",type:"ma",scenario:true,
   q:"Three hidden tab Groups each contain RG (Search for Orders). Tabs never clicked by most users. WU on load? (Select all that apply)",
   opts:["All three searches likely still run on page load","Conditional data source on each RG: only when tab state = X","Collapse when hidden prevents searches","Moving to separate pages always increases WU","Combining into one search + client filter still server-fetches all orders"],
   correct:[0,1],explanation:"Hidden ≠ skipped unless source is conditional. Separate pages only load when visited—can reduce initial WU. Single unconstrained search still loads all orders."},

  {id:1128,cat:"Performance & Workload",type:"ma",
   q:"Which pairs are TRUE about WU? (Select all that apply)",
   opts:["Search returning 0 rows still costs WU","Custom state change: 0 WU","Show/hide Group in workflow: server WU","Schedule API workflow: WU","Text element conditional on Current User's email: 0 WU"],
   correct:[0,1,3,4],explanation:"Searches cost even empty. Client state/UI conditionals free. Schedule is server-side WU. Show/hide actions are client-side (no WU)—common trap pairing with searches."},

  {id:1129,cat:"Performance & Workload",type:"ma",scenario:true,
   q:"Marketplace: Search for Products with constraint City = dropdown. Advanced filter 'rating > 4' on same RG. 100k products. Problem? (Select all that apply)",
   opts:["Server still returns constraint-filtered set before client advanced filter","WU dominated by large transferred set","Replacing with constraint Rating > 4 on search reduces payload","Advanced filter is always more efficient","Option set for cities eliminates WU"],
   correct:[0,1,2],explanation:"Advanced filter fetches then filters client-side—often worse than server constraints. Option sets don't replace product searches."},

  {id:1130,cat:"Performance & Workload",type:"ma",scenario:true,
   q:"DB Trigger on Comment create updates Post.commentCount. High-traffic forum. Spike causes? (Select all that apply)",
   opts:["Every comment fires trigger evaluation + update","Bulk import of comments fires per row","Removing trigger and using Do when count on page is better at scale","Tight Only when (e.g., only public comments) reduces runs","Trigger + recursive schedule on all Posts nightly is lighter"],
   correct:[0,1,3],explanation:"Triggers run per modification; bulk imports multiply. Do when count on page is worse at scale. Targeted Only when helps. Nightly full recompute is heavy—not lighter."},

  // ── APIS & INTEGRATIONS (1131–1135) ──
  {id:1131,cat:"APIs & Integrations",type:"ma",scenario:true,
   q:"Stripe webhook → Workflow API; also API Connector 'Create PaymentIntent' Action. Charge succeeded but Order stays Pending. Checks? (Select all that apply)",
   opts:["Webhook hits live URL not dev","Workflow Only when parses correct Stripe event type field","API Connector Action and webhook are separate—success in one doesn't update Order without workflow","Initialize Connector call maps wrong field names","Admin Data API token in Stripe dashboard"],
   correct:[0,1,2],explanation:"Inbound webhook vs outbound Connector are different paths. Environment URL and event parsing are common failures. Stripe doesn't use your admin token."},

  {id:1132,cat:"APIs & Integrations",type:"ma",
   q:"Mobile app: users CRUD their Tasks with privacy rules. Architectures that ENFORCE rules? (Select all that apply)",
   opts:["Data API with user authentication token per session","Workflow API public with no auth","Admin Data API token embedded in app","Data API with OAuth user login where supported","API Connector Action from mobile with shared secret in app"],
   correct:[0,3],explanation:"User-scoped Data API enforces privacy. Admin token and client-embedded secrets bypass or ignore rules. Public workflows without auth don't enforce user scope."},

  {id:1133,cat:"APIs & Integrations",type:"ma",scenario:true,
   q:"Partner polls GET /obj/appointment every 3s for 40 clinics. PHI app. Failures? (Select all that apply)",
   opts:["Polling WU vs push webhook to Workflow API","Admin token in partner script bypasses patient privacy","Public workflow returning PHI without auth","API Connector inbound webhook for poll","Use user-scoped tokens + event-driven Workflow API instead"],
   correct:[0,1,2,4],explanation:"Polling multiplies WU; admin token exposes all data; public workflows leak PHI. Connector doesn't receive inbound polls—Workflow API webhooks do."},

  {id:1134,cat:"APIs & Integrations",type:"ma",
   q:"API Connector: shared Bearer header on API + private param on one call. True statements? (Select all that apply)",
   opts:["Private params omit from client-visible code","Shared header applies to all calls in that API definition","Initialize call required to map dynamic fields","Inbound Stripe webhooks use the same Bearer header automatically","Data-type call on page load runs server-side with WU"],
   correct:[0,1,2,4],explanation:"Private params and shared headers per Manual. Initialize maps fields. Webhooks use Workflow API, not Connector headers. Data calls cost WU on load."},

  {id:1135,cat:"APIs & Integrations",type:"ma",scenario:true,
   q:"Zapier creates Invoice via Workflow API; also exposes Data API POST for same type. Duplicate invoices appear. Causes? (Select all that apply)",
   opts:["Two integrations creating records without idempotency key","Zapier retry on timeout duplicates POST","Workflow lacks 'only if external id not exists' search guard","Data API and Workflow API dedupe automatically","Privacy rules prevent duplicates"],
   correct:[0,1,2],explanation:"Dual endpoints + retries require idempotency (unique external id + search before create). Bubble doesn't auto-dedupe. Privacy doesn't block duplicate creates if allowed."},
];
