import { useState, useEffect, useRef } from "react";
import { Select } from "antd";
import { FaEye, FaEyeSlash, FaChevronDown, FaSearch } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { IoCheckmarkDone, IoCloseOutline } from "react-icons/io5";

const Input = ({
  type = "text",
  label,
  placeholder,
  onChange,
  onBlur,
  name,
  value,
  icon,
  error,
  loading,
  disabled,
  onFocus,
  options = [],
  rows = 4,
}) => {
  const [show, setShow] = useState(false);
  const [isErrorAnimating, setIsErrorAnimating] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectRef = useRef(null);
  const searchInputRef = useRef(null);

  // 🔹 انیمیشن خطا
  useEffect(() => {
    if (error) {
      setIsErrorAnimating(true);
      const timer = setTimeout(() => setIsErrorAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // 🔹 بستن dropdown هنگام کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔹 border کلاس
  const getBorderClass = () => {
    if (error) return "border border-red-500";
    if (loading === false) return "border border-green-500";
    if (loading === true) return "border border-red-500";
    return "border border-transparent";
  };

  const borderClass = getBorderClass();
  const animationClass = isErrorAnimating ? "animate-shake" : "";

  const getContainerClasses = () => {
    const baseClasses = `bg-[var(--input-bg)] rounded-[10px] flex items-center transition-all duration-300 ${borderClass} overflow-hidden relative ${
      error ? animationClass : ""
    }`;
    if (type === "textarea") return `${baseClasses} p-4 min-h-[120px]`;
    return `${baseClasses} w-full h-14 px-4`;
  };

  const containerClasses = getContainerClasses();

  const handleSelectChange = (optionValue) => {
    if (onChange) {
      onChange({
        target: { name: name, value: optionValue },
      });
    }
    setIsSelectOpen(false);
    setSearchQuery("");
  };

  const getSelectedLabel = () => {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : placeholder || "انتخاب کنید";
  };

  const getDatePlaceholder = () => placeholder || "YYYY-MM-DD";

  // 🔹 برای searchable-select بدون state اضافی
  const displayedOptions = !searchQuery
    ? options
    : options.filter((option) =>
        option.label?.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="w-full flex flex-col gap-2 text-[var(--text-color)]">
      {label && <label className="text-sm">{label}</label>}
      <div className={containerClasses} ref={selectRef}>
        {disabled && (
          <div className="absolute inset-0 cursor-not-allowed"></div>
        )}

        {/* Password */}
        {type === "password" && (
          <div className="w-full h-full flex items-center gap-1.5 text-[var(--placeholder-color)]">
            {icon}
            <input
              name={name}
              type={show ? "text" : "password"}
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              className="w-full bg-transparent outline-none text-[var(--text-color)] placeholder:text-[var(--placeholder-color)]"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="ml-2 transition-transform hover:scale-110"
            >
              {show ? (
                <FaEye size={"1.2rem"} className="text-[var(--text-color2)]" />
              ) : (
                <FaEyeSlash
                  size={"1.2rem"}
                  className="text-[var(--text-color2)]"
                />
              )}
            </button>
          </div>
        )}

        {/* Text / Email / Tel */}
        {(type === "text" || type === "email" || type === "tel") && (
          <div className="w-full h-full flex items-center gap-1.5 text-[var(--placeholder-color)]">
            {icon}
            <input
              name={name}
              type={type}
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              placeholder={placeholder}
              className="w-full h-full bg-transparent outline-none text-[var(--text-color)] placeholder:text-[var(--placeholder-color)]"
            />
            {loading === "start" && (
              <span className="animate-spin text-blue-400">
                <ImSpinner2 size={"1.2rem"} />
              </span>
            )}
            {loading === false && (
              <span className="!text-green-500 animate-bounce">
                <IoCheckmarkDone size={"1.2rem"} />
              </span>
            )}
            {loading === true && (
              <span className="!text-red-500 animate-pulse">
                <IoCloseOutline size={"1.2rem"} />
              </span>
            )}
          </div>
        )}

        {/* Ant Design Select */}
        {type === "select" && (
          <div
            className={`w-full h-full flex items-center gap-1.5 relative text-[var(--placeholder-color)] `}
          >
            {icon}
            <Select
              showSearch
              value={value || undefined}
              placeholder={
                <span style={{ color: "var(--placeholder-color)" }}>
                  انتخاب کنید
                </span>
              }
              onChange={(val) => handleSelectChange(val)}
              onFocus={() => setIsSelectOpen(true)}
              onBlur={onBlur}
              className="w-full !bg-transparent !text-[var(--text-color)]"
              optionLabelProp="label"
              options={options.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
              suffixIcon={
                <FaChevronDown
                  size={"0.8rem"}
                  className={`text-[var(--text-color2)] transition-transform duration-300 ${
                    isSelectOpen ? "rotate-180" : ""
                  }`}
                />
              }
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{
                border: isSelectOpen ? "none" : undefined,
              }}
            />
          </div>
        )}

        {/* Searchable Select */}
        {type === "searchable-select" && (
          <div className="w-full h-full flex items-center gap-1.5 relative">
            {icon}
            <div
              className="w-full h-full flex items-center cursor-pointer"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span
                className={`${
                  !value
                    ? "text-[var(--placeholder-color)]"
                    : "text-[var(--text-color)]"
                }`}
              >
                {getSelectedLabel()}
              </span>
            </div>
            <div className="absolute left-3 pointer-events-none">
              <FaChevronDown
                size={"0.8rem"}
                className={`text-[var(--text-color2)] transition-transform duration-300 ${
                  isSelectOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isSelectOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-[10px] shadow-lg z-50 max-h-60 overflow-hidden">
                <div className="p-2 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-2 bg-[var(--bg-color)] rounded-[8px] px-3 py-2">
                    <FaSearch
                      size={"0.8rem"}
                      className="text-[var(--text-color2)]"
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="جستجو..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent outline-none text-[var(--text-color)] text-sm placeholder:text-[var(--placeholder-color)]"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                <div className="max-h-48 overflow-y-auto">
                  {displayedOptions.length > 0 ? (
                    displayedOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() =>
                          handleSelectChange(option.value, option.label)
                        }
                        className={`px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-[var(--orgin-color)]/10 ${
                          value === option.value
                            ? "bg-[var(--orgin-color)]/20 text-[var(--orgin-color)]"
                            : "text-[var(--text-color)]"
                        }`}
                      >
                        {option.label}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-[var(--text-color2)] text-center">
                      موردی یافت نشد
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Date */}
        {type === "date" && (
          <div className="w-full h-full flex items-center gap-1.5 relative">
            <input
              name={name}
              type="date"
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={getDatePlaceholder()}
              className="w-full h-full bg-transparent outline-none text-[var(--text-color)] placeholder:text-[var(--placeholder-color)] appearance-none"
              style={{ colorScheme: "dark" }}
            />
            {loading === "start" && (
              <span className="animate-spin text-blue-400 ml-2">
                <ImSpinner2 size={"1.2rem"} />
              </span>
            )}
            {loading === false && (
              <span className="!text-green-500 animate-bounce ml-2">
                <IoCheckmarkDone size={"1.2rem"} />
              </span>
            )}
            {loading === true && (
              <span className="!text-red-500 animate-pulse ml-2">
                <IoCloseOutline size={"1.2rem"} />
              </span>
            )}
          </div>
        )}

        {/* Textarea */}
        {type === "textarea" && (
          <div className="w-full flex flex-col gap-2">
            {icon && (
              <div className="flex items-center gap-2 text-[var(--text-color2)]">
                {icon}
              </div>
            )}
            <textarea
              name={name}
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              rows={rows}
              className="w-full bg-transparent resize-none outline-none text-[var(--text-color)] placeholder:text-[var(--placeholder-color)]"
            ></textarea>

            <div className="flex justify-end items-center gap-2">
              {loading === "start" && (
                <span className="animate-spin text-blue-400">
                  <ImSpinner2 size={"1.2rem"} />
                </span>
              )}
              {loading === false && (
                <span className="!text-green-500 animate-bounce">
                  <IoCheckmarkDone size={"1.2rem"} />
                </span>
              )}
              {loading === true && (
                <span className="!text-red-500 animate-pulse">
                  <IoCloseOutline size={"1.2rem"} />
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div
          className={`px-8 transition-all duration-300 ${
            isErrorAnimating ? "animate-fadeIn" : ""
          }`}
        >
          <span className="!text-red-500 text-[12px] flex items-center gap-2">
            <span className="animate-pulse">⚠</span>
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default Input;
