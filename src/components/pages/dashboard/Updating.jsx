import { ImSpinner2 } from "react-icons/im";
import Button from "../../ui/Button";
import { useRouter } from "next/navigation";
import { IoReturnDownBack } from "react-icons/io5";

const Updating = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* آیکون */}
      <div className="w-16 h-16 bg-[var(--orgin-color)]/20 rounded-[10px] mb-4 flex items-center justify-center text-[var(--orgin-color)]">
        <ImSpinner2 size={25} className="animate-spin" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2 text-center">
        این بخش در حال بروزرسانی میباشد
      </h3>
      <p className="text-gray-200 text-center mb-4 leading-6">
        لطفاً شکیبا باشید، به‌زودی این قسمت فعال خواهد شد
      </p>
      <Button
        label={"بازگشت"}
        icon={<IoReturnDownBack size={"1.3rem"} />}
        onClick={() => {
          router.back();
        }}
      />
    </div>
  );
};
export default Updating;
