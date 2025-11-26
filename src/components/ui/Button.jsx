const Button = ({ label, icon, onClick, type = 1, disabled, className }) => {
  return (
    <div>
      {type == 1 && (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`w-full min-w-[100px] truncate px-4 h-10 rounded-[10px] text-[12px] lg:text-[16px] font-medium text-[var(--text-color)] flex ${
            icon ? "gap-2" : ""
          } justify-center items-center  transition-all duration-300 ${
            disabled
              ? "cursor-not-allowed bg-[var(--orgin-color)]/70"
              : "cursor-pointer bg-[var(--orgin-color)]"
          } ${className}`}
        >
          <span>{label}</span>
          <span>{icon}</span>
        </button>
      )}

      {type == 2 && (
        <button
          disabled={disabled}
          onClick={onClick}
          className="w-12 h-12 xl:w-14 xl:h-14 bg-[var(--bg-color)] rounded-[10px] flex justify-center items-center hover:text-[var(--orgin-color)] cursor-pointer text-[var(--text-color)] text-[20px] shadow-[0_0_5px_0px_#898686] "
        >
          {icon}
        </button>
      )}

      {type == 3 && (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`w-full min-w-[100px] px-4 h-10 border-2 border-[var(--orgin-color)] cursor-pointer rounded-[10px] text-[12px] lg:text-[16px] truncate font-medium text-[var(--orgin-color)] hover:text-[var(--text-color)] hover:bg-[var(--orgin-color)] transition-all duration-300 ${className} flex items-center justify-center gap-2`}
        >
          {label}
          {icon}
        </button>
      )}

      {type == 4 && (
        <button
          disabled={disabled}
          onClick={onClick}
          className="w-10 h-10 bg-[var(--bg-color)] rounded-[10px] flex justify-center items-center hover:text-[var(--orgin-color)] cursor-pointer text-[var(--text-color)] text-[20px] shadow-[0_0_5px_0px_#898686] "
        >
          {icon}
        </button>
      )}

      {type == "green" && (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`w-full min-w-[100px] truncate px-4 h-10 rounded-[10px] text-[12px] lg:text-[16px] font-medium text-[var(--text-color)] flex ${
            icon ? "gap-2" : ""
          } justify-center items-center  transition-all duration-300 ${
            disabled
              ? "cursor-not-allowed bg-[var(--green-color)]/70"
              : "cursor-pointer bg-[var(--green-color)]"
          } ${className}`}
        >
          <span>{label}</span>
          <span>{icon}</span>
        </button>
      )}

      {type == "red" && (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`w-full min-w-[100px] truncate px-4 h-10 rounded-[10px] text-[12px] lg:text-[16px] font-medium text-[var(--text-color)] flex ${
            icon ? "gap-2" : ""
          } justify-center items-center  transition-all duration-300 ${
            disabled
              ? "cursor-not-allowed bg-[var(--red-color)]/70"
              : "cursor-pointer bg-[var(--red-color)]"
          } ${className}`}
        >
          <span>{label}</span>
          <span>{icon}</span>
        </button>
      )}

      {type == "blue" && (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`w-full min-w-[100px] truncate px-4 h-10 rounded-[10px] text-[12px] lg:text-[16px] font-medium text-[var(--text-color)] flex ${
            icon ? "gap-2" : ""
          } justify-center items-center  transition-all duration-300 ${
            disabled
              ? "cursor-not-allowed bg-[var(--blue-color)]/70"
              : "cursor-pointer bg-[var(--blue-color)]"
          } ${className}`}
        >
          <span>{label}</span>
          <span>{icon}</span>
        </button>
      )}
    </div>
  );
};
export default Button;
