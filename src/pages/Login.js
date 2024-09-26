import React, { useContext } from "react";
import { useMediaQuery } from "@chakra-ui/react";

import { Button, Logo } from "../componentLibrary";
import { UserContext } from "./UserProvider";
import "../index.css";

const Login = () => {
  const [min767] = useMediaQuery("(max-width: 767px)");
  const { handleLogin } = useContext(UserContext);

  const Submit = async () => {
    await handleLogin();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#181921]" id="login">
      {min767 && (
        <div className="p-4">
          <Logo width="100px" mode="light" />
        </div>
      )}
      <div className="flex items-center justify-center min-[768px]:min-h-screen px-4 min-[768px]:px-0 mt-14 min-[768px]:mt-0">
        <div className="w-full h-full">
          <div className="z-10 flex flex-col min-[768px]:flex-row justify-around gap-y-6">
            <div>
              <p className="text-[14px] min-[768px]:text-[18px] min-[1197px]:text-[30px] font-normal">
                Welcome to
              </p>
              <p className="text-[35px] min-[768px]:text-[58px] min-[1197px]:text-[80px] font-semibold">
                ORCHESTRO
              </p>
              <p className="text-[14px] min-[768px]:text-[18px] min-[1197px]:text-[30px] text-[#FFB323]">
                An Open Parcel Network
              </p>
            </div>

            <div className="rounded-[20px] border border-[rgba(133,134,152,0.20)] shadow-custom-black bg-[#191A23] flex flex-col items-center p-[17.5px_20.9px_17.5px_21.5px] min-[768px]:p-[28px_33px_90px_34px] min-[1440px]:p-[36px_43px_120px_44px] z-1 w-[92vw] min-[1440px]:w-[30vw] min-[768px]:w-[46vw] opacity-100 mx-auto min-[768px]:mx-0">
              {!min767 && (
                <>
                  <img
                    src="/loginLogo.png"
                    alt="alt"
                    className="w-[750px] mt-[3vh]"
                  />
                  <p className="text-[24px] font-normal mt-[2vh] text-white mb-[30px]">
                    Log In
                  </p>
                </>
              )}
              <button
                type="button"
                onClick={Submit}
                className="flex gap-2 border border-[#85869833] px-4 py-2 rounded-lg"
              >
                <img src="/images/logos/google-logo.png" alt="Google Login" />
                Login using Google
              </button>
              <Button
                type="button"
                className="!text-xs min-[768px]:!text-base mt-4 font-medium w-[102px] min-[768px]:w-[211px] h-6 min-[768px]:h-10 !rounded min-[768px]:!rounded-lg"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
