const DashboardSection = ({ children, tab }) => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* هدر */}
      <div
        className={`w-full ${
          tab ? "h-[50px]" : "h-[24px]"
        } relative xl:block flex-shrink-0 hidden `}
      >
        {tab && (
          <div className="w-fit h-[80px] bg-white/10 backdrop-blur-[50px] rounded-[10px] absolute right-1/2 transform translate-x-1/2 z-10 top-[10px] flex items-center justify-center">
            {tab}
          </div>
        )}
      </div>

      {/* محتوای اصلی */}
      <div
        className={`w-full flex-1 bg-white/10 backdrop-blur-[20px] rounded-[20px] xl:rounded-[20px] p-4 xl:px-4 xl:pb-4 ${
          tab ? "xl:pt-12" : "xl:pt-4"
        } overflow-hidden`}
      >
        <div className="w-full h-full flex flex-col gap-4 overflow-auto ">
          {children}
        </div>
      </div>
    </div>
  );
};
export default DashboardSection;
