import { MailIcon, MissedIcon, PhoneIcon } from "./Icons";

/**
 * The hero's one orchestrated moment: an incoming call rings, goes unanswered,
 * then lands as a LoopLeads alert. CSS-only (see globals.css .callstrip);
 * reduced-motion users see the final state.
 */
export function CallStrip() {
  return (
    <div className="callstrip grid" role="img" aria-label="A missed call from (555) 010-XXXX becomes a LoopLeads email alert: new estimate request.">
      <div data-stage="ring" className="flex items-center gap-3 rounded-[12px] bg-white/8 px-4 py-3 ring-1 ring-white/12">
        <span className="ring-icon grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-white">
          <PhoneIcon className="size-5" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm text-white/70">Incoming call</span>
          <span className="block font-bold text-white">(555) 010-XXXX</span>
        </span>
      </div>
      <div data-stage="missed" className="flex items-center gap-3 rounded-[12px] bg-white/8 px-4 py-3 ring-1 ring-white/12">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-ivory-500">
          <MissedIcon className="size-5" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm text-white/70">Missed call, 2:14 PM</span>
          <span className="block font-bold text-white">You're carrying a couch.</span>
        </span>
      </div>
      <div data-stage="caught" className="flex items-center gap-3 rounded-[12px] bg-orange-500 px-4 py-3 text-navy-900">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-900 text-orange-500">
          <MailIcon className="size-5" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold">LoopLeads caught it</span>
          <span className="block font-bold">
            New estimate request from <span className="whitespace-nowrap">(555) 010-XXXX</span>
          </span>
        </span>
      </div>
    </div>
  );
}
