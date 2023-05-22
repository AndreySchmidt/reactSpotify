import TheRegistrationInfo from "./TheRegistrationInfo";
import BaseBtn from "./BaseBtn";

function TheRegistration() {
  return (
    <a
      href="/"
      className="bg-gradient-to-r from-[#af2896] to-[#509bf5] text-white py-4 px-8 flex justify-between items-center flex-wrap gap-x-6 gap-y-2"
    >
      <TheRegistrationInfo />
      <BaseBtn primary>Sign up free</BaseBtn>
    </a>
  );
}

export default TheRegistration;
