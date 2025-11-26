const SectionTitle = ({ type = 1, title, icon, subTitle }) => {
  return (
    <div>
      {type === 1 && (
        <div className="flex items-center mb-2">
          <div className="w-2 h-8 bg-[var(--orgin-color)] rounded ml-2"></div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      )}
      {type === 2 && (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--orgin-color)] rounded-lg flex items-center justify-center text-[var(--text-color)]">
            {icon}
          </div>
          <div className="text-right">
            <div className="font-semibold text-[var(--text-color)] text-sm">
              {title}
            </div>
            <div className="text-xs text-gray-400 mt-1">{subTitle}</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SectionTitle;
