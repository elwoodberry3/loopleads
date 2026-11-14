/**
 * LoopLeads landing page copy — sourced from "003 — Landing Page Copy, Version 1".
 * Edit words here; the page components only handle layout.
 */

export const site = {
  name: "LoopLeads",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://loopleads.app",
  title: "LoopLeads — Stop losing leads when you miss a call",
  description:
    "Missed-call lead recovery for small junk removal and field service crews. When you can't pick up, LoopLeads greets the caller, finds out what they need, and emails you who to call back.",
  brandLine: "Every missed call deserves a second chance.",
};

export const hero = {
  eyebrow: "Small crew. Big opportunities. Fewer missed inquiries.",
  headline: "Stop losing leads when you miss a call.",
  intro: "You're busy running your business. You can't always answer the phone.",
  body: "LoopLeads helps capture missed customer inquiries, find out what callers need, and notify you so you can follow up — without dropping everything you're doing.",
  kicker: "Keep doing what you do best. Let LoopLeads help with the calls you can't answer.",
  primaryCta: "Show me how LoopLeads works",
  secondaryCta: "Watch the 3-minute video",
  trust: "Built for small service businesses. Simple to understand. Designed to work alongside your existing tools.",
  videoCaption: "See what happens when a customer calls while you're on the job.",
};

export const problem = {
  headline: "You're great at your job. But you can't be everywhere at once.",
  places: ["On a roof.", "Under a sink.", "Driving between appointments.", "Loading a truck.", "Finally sitting down to eat lunch."],
  beats: ["Your phone rings.", "You can't answer."],
  body: [
    "And somewhere on the other end of that call is someone who might need exactly what your business offers.",
    "The problem? You don't know whether they want a quote, need service, or just have a question.",
    "By the time you finish the job and call them back, they may have already moved on.",
  ],
  pullquote: "You work too hard to let a busy day become a missed opportunity.",
  shouldnts: [
    "You shouldn't need to hire a receptionist just to find out who was calling.",
    "You shouldn't have to stop working every time your business phone rings.",
    "And you shouldn't need another complicated system to solve a simple problem.",
  ],
  close: "That's why we're building LoopLeads.",
};

export const solution = {
  headline: "Meet LoopLeads. A smarter way to handle missed calls.",
  body: "LoopLeads is a Missed-Call Lead Recovery Platform designed for busy service professionals. When you can't answer an eligible business call, LoopLeads helps capture the inquiry and alerts you with information you can use.",
  promise: "No complicated sales software. No unnecessary steps. Just a better way to handle calls you couldn't answer.",
  steps: [
    {
      title: "Catch the call",
      body: "With compatible call routing, LoopLeads can handle an unanswered business call using a greeting customized for your company.",
    },
    {
      title: "Find out what they need",
      body: "A simple automated menu helps customers identify why they're calling, whether it's a new estimate, an existing job, or another inquiry.",
    },
    {
      title: "Get the details",
      body: "LoopLeads records the available call information and sends an alert to your email so you know who contacted you and what to follow up on.",
    },
    {
      title: "Take the next step",
      body: "You decide when and how to respond. LoopLeads gives you a more organized starting point instead of an unexplained missed call.",
    },
  ],
  cta: "See the missed-call demo",
};

export const demo = {
  headline: "See what happens when you can't pick up the phone.",
  setup: [
    "Imagine you're finishing a junk removal job.",
    "A potential customer finds your company on Google and calls about hauling away an old sofa and several appliances.",
    "You're carrying furniture. Your hands are full.",
  ],
  without: "The phone rings. Nobody answers. You find a missed call later, but you don't know why that person contacted you.",
  withSteps: [
    "A supported call-routing setup sends the unanswered inquiry into your LoopLeads workflow.",
    "The customer hears your greeting.",
    "The customer selects an option.",
    "LoopLeads captures the available details and sends your business an email alert.",
  ],
  greeting:
    "Thanks for calling Johnson's Junk Removal. We're helping another customer right now. Press 1 for a new estimate, press 2 for an existing job, or press 3 for another question.",
  alert: {
    business: "Johnson's Junk Removal",
    caller: "(555) 010-XXXX",
    time: "2:14 PM",
    inquiry: "New estimate request",
    next: "Contact the caller",
  },
  disclaimer: "Illustrative example; the information available depends on the caller and configured workflow.",
  outcome: "Now, when you finish the job, you know where to start.",
  outcomeBold:
    "You didn't have to put down the furniture. You didn't have to interrupt your crew. And you have a chance to follow up with someone who reached out to your business.",
  cta: "Book my 5-minute demo",
};

export const benefits = {
  headline: "Less phone tag. More time running your business.",
  items: [
    {
      icon: "hands",
      title: "Keep your hands on the job",
      body: "You're in business to provide a service, not spend the entire day watching your phone. LoopLeads helps handle eligible missed inquiries while you concentrate on your customers.",
    },
    {
      icon: "why",
      title: "Know why people called",
      body: "Stop relying on a list of unknown numbers. Receive available caller details and inquiry information in an actionable notification.",
    },
    {
      icon: "greet",
      title: "Give customers a better first response",
      body: "A professional, branded greeting can acknowledge a caller even when nobody on your team is available to answer personally.",
    },
    {
      icon: "list",
      title: "Stop chasing unorganized callbacks",
      body: "Instead of trying to remember which missed number belongs to which customer, start with a record of the inquiry and a clear next step.",
    },
    {
      icon: "tools",
      title: "Keep your existing business tools",
      body: "LoopLeads isn't designed to replace your scheduling, estimating, invoicing, or job management software. It's focused on the first interaction: helping you capture an inquiry when you can't answer.",
    },
    {
      icon: "simple",
      title: "Start simple",
      body: "You don't need to be a software expert. LoopLeads is designed around a straightforward call-routing and notification workflow, with assisted setup available during the pilot.",
    },
  ],
} as const;

export const audience = {
  headline: "Built for the people who actually do the work.",
  intro: "Whether you're running one truck or managing a small crew, incoming calls can arrive at the worst possible time.",
  featured: {
    title: "Junk removal",
    body: "You're moving furniture, loading debris, and driving to the next pickup. LoopLeads helps identify estimate inquiries you couldn't answer.",
    note: "Our founding pilot is open to junk removal crews first.",
  },
  others: [
    {
      title: "Pressure washing",
      body: "You're operating equipment and finishing someone's driveway. LoopLeads helps capture inquiries while you're working.",
    },
    {
      title: "Landscaping & lawn care",
      body: "You're mowing, trimming, and managing a crew. LoopLeads helps organize callbacks instead of leaving you with a list of unfamiliar numbers.",
    },
    {
      title: "HVAC & plumbing",
      body: "You're on a service call, sometimes in places where answering a phone is impossible. LoopLeads can support configured inquiry handling and escalation rules, subject to your operational requirements.",
    },
    {
      title: "Residential cleaning & property services",
      body: "You're between appointments or working inside a customer's home. LoopLeads helps keep new inquiries visible without requiring you to interrupt the job.",
    },
  ],
  close: "Whatever service you provide, the problem is familiar: the phone doesn't stop ringing just because you're busy.",
};

export const simplicity = {
  headline: "You don't need to become a tech expert to recover a lead.",
  intro: [
    "Let's make this simple.",
    "You already have a business to run. You may have a company phone number, a few employees, a calendar, and a system that works well enough.",
    "You don't want to spend the weekend learning another complicated platform. We get it.",
    "LoopLeads is designed to fit into the way you already work.",
  ],
  points: [
    {
      label: "Your business number",
      body: "We evaluate compatible call forwarding and routing so you may be able to keep using the number customers already know.",
    },
    {
      label: "Your existing software",
      body: "Continue using your current scheduling and business management tools. A direct Jobber, Workiz, or other CRM integration is not required for the initial call-capture workflow.",
    },
    { label: "Your notifications", body: "Receive the information you need through configured email alerts." },
    {
      label: "Your business",
      body: "You still decide which customers to contact, which jobs to accept, and how your schedule operates.",
    },
  ],
  close: "It's your business. LoopLeads just helps you stay on top of incoming opportunities.",
  cta: "Show me how easy it is",
};

export const plans = {
  headline: "Start with what you need. Add more when you're ready.",
  light: {
    id: "light",
    name: "LoopLeads Light",
    tagline: "Simple missed-call capture",
    status: "Available for the founding pilot",
    body: "For business owners who need a better way to identify and follow up with unanswered inquiries.",
    features: [
      "Configurable call routing",
      "Branded business greeting",
      "Simple keypad-based inquiry selection",
      "Call event logging",
      "Owner email notifications",
      "Standard onboarding assistance",
    ],
    cta: "Ask about LoopLeads Light",
  },
  core: {
    id: "core",
    name: "LoopLeads Core",
    tagline: "Missed-call recovery with automated text-back",
    status: "Planned",
    body: "For businesses that want to add compliant messaging and additional customer qualification.",
    lead: "Planned capabilities include everything in Light, plus:",
    features: [
      "Automated missed-call text-back",
      "Configurable qualification questions",
      "Service-area qualification",
      "Follow-up notifications",
      "Basic lead activity reporting",
    ],
    fineprint:
      "Core messaging features are subject to release readiness, supported phone configuration, applicable messaging registration, customer consent, and provider requirements.",
    cta: "Explore Core availability",
  },
} as const;

export const founder = {
  headline: "Want to see what LoopLeads could do for your business?",
  body: [
    "We're preparing a small founding-customer program to validate LoopLeads with real service businesses.",
    "The goal is straightforward: demonstrate the workflow, evaluate your phone setup, help you get configured, and measure how effectively the service captures eligible unanswered inquiries.",
  ],
  stepsLead: "Here's what happens next",
  steps: [
    { title: "See the demo", body: "We'll walk you through a sample missed customer call, from the first ring to the owner notification." },
    {
      title: "Check your setup",
      body: "We'll review your business number, routing compatibility, and the type of inquiries you receive.",
    },
    {
      title: "Choose your starting point",
      body: "If your business is a fit and the service is available, we'll explain the appropriate subscription, onboarding requirements, and activation process.",
    },
  ],
  cta: "Book my 5-minute demo",
  reassurance:
    "No need to understand AI, automation, webhooks, or complicated software. We'll show you the customer experience in plain English.",
};

export const faqs = [
  {
    q: "What is LoopLeads?",
    a: "LoopLeads is a missed-call lead recovery service for small field service businesses. It's designed to capture information from otherwise unanswered inquiries and notify the business so someone can follow up.",
  },
  {
    q: "Do I have to get a new business phone number?",
    a: "Not necessarily. LoopLeads is designed to use supported call forwarding or routing configurations. We'll check your existing phone provider and setup before confirming compatibility.",
  },
  {
    q: "Does LoopLeads automatically text customers when I miss their calls?",
    a: "Automated text-back is a planned LoopLeads Core capability. It can only be activated for eligible accounts after applicable messaging registration, consent, and provider requirements are satisfied. LoopLeads Light focuses on call capture and owner notifications without customer text-back.",
  },
  {
    q: "Do I need to use Jobber, Workiz, or Housecall Pro?",
    a: "No. The initial service does not require a field service management platform. If you already use one, LoopLeads is intended to complement your workflow rather than replace it. Direct software integrations are a future capability, not part of the initial Light offering.",
  },
  {
    q: "Will LoopLeads automatically book jobs for me?",
    a: "Not in the initial Light offering. LoopLeads helps capture incoming opportunities and gives you information for follow-up. Scheduling and automated booking are planned for future capabilities.",
  },
  {
    q: "Is LoopLeads an AI receptionist?",
    a: "LoopLeads is positioned as a missed-call lead recovery platform. Its initial workflow uses configured call handling, customer input, and notifications. It does not require a full conversational AI receptionist.",
  },
  {
    q: "How long does setup take?",
    a: "That depends on your phone provider, routing configuration, and the services being activated. We'll evaluate these requirements during onboarding and explain the expected timeline before activation.",
  },
  {
    q: "What if someone calls with an emergency?",
    a: "Emergency and urgent inquiries require business-specific escalation procedures. We'll review those requirements during setup. LoopLeads should not be treated as an emergency dispatch service.",
  },
  {
    q: "How much does LoopLeads cost?",
    a: "LoopLeads is being developed around straightforward setup fees and monthly subscription options. We'll explain the current offer, usage allowances, and applicable charges during your demonstration.",
  },
  {
    q: "Will LoopLeads guarantee that I get more jobs?",
    a: "No system can guarantee that every caller becomes a customer. LoopLeads helps capture and organize eligible inquiries you might otherwise miss, giving you a better opportunity to follow up and win the work.",
  },
];

export const finalCta = {
  headline: "Your next customer might call while you're busy serving this one.",
  body: "You don't have to choose between doing great work and keeping track of the people who want to hire you.",
  lines: ["Let LoopLeads help capture the call.", "Let your crew keep moving.", "And when you're ready, you'll have the information you need to follow up."],
  punch: "Stop wondering who called. Start knowing who to call back.",
  cta: "Book my 5-minute demo",
  microcopy: "See the workflow. Ask your questions. Find out whether LoopLeads fits your business.",
};

export const form = {
  headline: "Let's see how LoopLeads could work for you.",
  description: "Tell us a little about your business, and we'll show you how missed-call recovery is designed to work.",
  submit: "Show me the demo",
  submitting: "Sending…",
  successTitle: "Demo request received.",
  successBody:
    "Check your inbox — we've sent a confirmation to {email}. We'll reach out by phone or email to set up your 5-minute demo.",
  privacy:
    "We'll use your information to respond to your demo request. Optional marketing communications require separate consent where applicable.",
  serviceTypes: [
    "Junk removal",
    "Pressure washing",
    "Landscaping & lawn care",
    "HVAC",
    "Plumbing",
    "Residential cleaning",
    "Property services",
    "Other",
  ],
  planOptions: [
    { value: "unsure", label: "Not sure yet" },
    { value: "light", label: "LoopLeads Light" },
    { value: "core", label: "LoopLeads Core" },
  ],
};

/** "Advertisement #1" script — published as the video transcript. */
export const transcript = [
  "You know what's crazy about running your own business? Everybody tells you to answer the phone, because you never know when your next customer is calling.",
  "And they're right.",
  "But they never tell you how you're supposed to answer the phone when you're carrying a 200-pound couch down somebody's stairs. I mean, what am I supposed to do? Drop the couch?",
  "I run a small junk removal business. It's me and a couple of guys, and we're moving all day. We're loading trucks, talking to customers, driving from one job to the next.",
  "And the phone? That thing doesn't care what we're doing.",
  "Some days I finish a job, look at my phone, and I've got three or four missed calls. Now I've got to call everybody back and figure out who wanted what. Was somebody looking for an estimate? Did somebody have a question about an appointment? Or was it somebody just trying to sell me something?",
  "And the worst part is, if one of those people was looking to hire us, they might've already called another company.",
  "Look, I'm not a technology guy. I know how to run my business. I know how to take care of my customers. And I'm pretty good at getting a refrigerator out of somebody's basement. But I don't want to spend my nights learning some complicated computer system.",
  "I don't need twenty new features. I don't need another app that my guys have to figure out. I just need a better way to handle the phone when nobody can answer it.",
  "That's what I like about the idea behind LoopLeads. It's a Missed-Call Lead Recovery Platform. That's a fancy name for something pretty simple. When somebody calls your business and you can't pick up, LoopLeads is designed to help capture what they need and let you know they called.",
  "You're not replacing your entire business system. You're just putting a better process in place for those missed calls.",
  "Here, let me show you what I mean. Let's say somebody calls because they've got an old couch and a washing machine they want hauled away. I'm working, so I can't answer.",
  "With the right phone setup, the call goes into LoopLeads. The customer hears a greeting with my business name, and a simple menu helps identify why they're calling. They press a button for a new estimate. LoopLeads captures the available information, and I get an email that tells me a potential customer called about an estimate.",
  "That's it. When I get done with the job, I know who I need to call back and why. I'm not sitting there staring at an unfamiliar phone number trying to figure out what happened.",
  "And that's the part that makes sense to me. I don't need my guys doing a bunch of extra paperwork. I don't need another complicated dashboard. I don't want to change everything about the way I run my business. If my phone setup is compatible, I can keep using my business number and have a simple process for calls I can't answer. And when I need to follow up, the information is right there.",
  "That's the kind of technology I can actually use.",
  "At the end of the day, I'm trying to grow my business without making everything more complicated. I don't want to spend all night wondering who called me. And I'm definitely not hiring a full-time receptionist just so somebody can tell me I missed a call. If there's a way to catch more of those inquiries and give myself a better chance to call people back, I want to see it.",
  "So if you're like me, and you're too busy doing the work to answer every call, take a look at LoopLeads. They'll show you how the missed-call process works and help you find out if it's right for your business.",
  "Because you never know.",
];
