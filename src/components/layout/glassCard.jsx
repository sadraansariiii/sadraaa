const GlassCard = ({ children, height = "h-full" }) => (
  <div
    className={`w-full ${height} bg-black/40 backdrop-blur-[80px] rounded-[8px] p-4 z-10 border-[1px] border-neutral-700 flex flex-col overflow-auto`}
  >
    {children}
  </div>
);

export default GlassCard;
