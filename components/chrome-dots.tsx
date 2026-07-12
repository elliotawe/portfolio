/** The three-dot window-chrome marker shared by the Terminal section and
 *  every project "browser window" card — one consistent signature motif
 *  instead of two divergent one-off styles. */
export function ChromeDots({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="w-2.5 h-2.5 rounded-full bg-error" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      <span className="w-2.5 h-2.5 rounded-full bg-success" />
    </div>
  );
}
