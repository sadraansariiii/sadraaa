import { BsDownload, BsUpload } from "react-icons/bs";

const MessageList = ({ title, text, status , sender }) => {
  return (
    <div
      className={`p-4 rounded-xl border-[1px] border-neutral-700 bg-white/5`}
    >
      {/* 🔸 وضعیت پیام */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-[8px] ${
              status
                ? "bg-[var(--orgin-color)]/20 text-gray-300"
                : "bg-green-500/20 text-gray-200 "
            }`}
          >
            <span className="text-sm font-semibold">
              {status ? (
                <span className="text-[var(--orgin-color)] flex gap-2">
                  <BsDownload />
                  دریافت شده
                </span>
              ) : (
                <span className="text-green-500 flex gap-2">
                  <BsUpload />
                  ارسال شده
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-xs bg-gray-600/60 px-2 py-1 rounded-md border border-gray-500/40">
            {sender}
          </span>
        </div>
      </div>

      {/* 🔹 عنوان پیام */}
      <h4 className="text-lg font-semibold text-gray-100 mb-2">
        <span className="text-[var(--orgin-color)]">عنوان: </span>
        {title}
      </h4>

      {/* 🔹 متن پیام */}
      <div className="bg-gray-600/40 rounded-lg p-3 border border-gray-500/30">
        <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap break-words">
          {text}
        </p>
      </div>
    </div>
  );
};

export default MessageList;
