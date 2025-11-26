const CheckBox = ({ checked, onChange }) => {
  return (
    <div className="flex-shrink-0 mt-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only" // مخفی کردن چک‌باکس پیش‌فرض
      />
      <div
        className={`
            w-6 h-6 rounded-[4px] border-[1px] flex items-center justify-center transition-all duration-200
            ${
              checked
                ? "bg-[var(--orgin-color)] border-[var(--orgin-color)] shadow-lg"
                : "bg-white/10 border-gray-400 group-hover:border-[var(--orgin-color)]"
            }
          `}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default CheckBox;