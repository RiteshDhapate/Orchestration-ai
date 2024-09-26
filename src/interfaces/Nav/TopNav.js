import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../componentLibrary";
import { SearchIcon } from "@chakra-ui/icons";
import {
  DocumentIcon,
  HomeIcon,
  LogoutIcon,
  MessageIcon,
  ProfileIcon,
  UsersIcon,
} from "../../assets/Icons";
import { UserContext } from "../../pages/UserProvider";

const ToolsPopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <UsersIcon stroke="#A0A5AECC" fill="transparent" />
        <span className="text-[#A0A5AECC]">Tools</span>
      </div>
      {isOpen && (
        <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-[#181921] border border-[#85869833] rounded-lg p-2 shadow-lg">
          <div className="grid gap-2">
            <a
              href="https://sustainpack-one.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="p-2 hover:bg-[#2A2B36] rounded cursor-pointer">
                <span className="text-[#A0A5AECC]">SustainPack Advisor</span>
              </div>
            </a>
            <a
              href="https://ship-talk-shipment-details-omega.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="p-2 hover:bg-[#2A2B36] rounded cursor-pointer">
                <span className="text-[#A0A5AECC]">
                  Multivendor Orchestration
                </span>
              </div>
            </a>
            <a
              href="https://shipping-cost-analysis-ochre.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="p-2 hover:bg-[#2A2B36] rounded cursor-pointer">
                <span className="text-[#A0A5AECC]">Shipping Cost Analysis</span>
              </div>
            </a>
            <a
              href="https://pld-analyzer.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="p-2 hover:bg-[#2A2B36] rounded cursor-pointer">
                <span className="text-[#A0A5AECC]">PLD Data Analyzer</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const TopNav = () => {
  const { handleLogout, user } = useContext(UserContext);

  return (
    <div className="flex flex-col md:flex-row gap-3 bg-[#181921] border border-[#85869833] rounded-lg p-3 px-6 justify-between items-center">
      <div className="flex gap-4">
        <Link to="/">
          <Logo width="80px" mode="light" />
        </Link>
        <div className="flex border border-[#85869833] rounded-lg">
          <div className="flex h-100 items-center justify-center px-3">
            <SearchIcon color="#A0A5AECC" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="rounded-e-lg py-2 bg-transparent text-[#A0A5AECC] placeholder-[#A0A5AECC] focus:outline-none"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Link
          to="/app/home"
          className="flex flex-col justify-center items-center"
        >
          <HomeIcon
            stroke="#1A8DBE"
            fill="transparent"
            width={25}
            height={24}
          />
          <span className="text-[#1A8DBE]">Home</span>
        </Link>
        <a
          href="https://orchestro-chat.vercel.app/chat"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col justify-center items-center"
        >
          <MessageIcon stroke="#A0A5AECC" fill="transparent" />
          <span className="text-[#A0A5AECC]">Message</span>
        </a>
        <ToolsPopover />
        <div className="flex flex-col justify-center items-center">
          <DocumentIcon stroke="#A0A5AECC" fill="transparent" />
          <span className="text-[#A0A5AECC]">Document</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <ProfileIcon stroke="#A0A5AECC" fill="transparent" />
          <span className="text-[#A0A5AECC]">Profile</span>
        </div>
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={handleLogout}
        >
          <LogoutIcon stroke="#A0A5AECC" fill="transparent" />
          <span className="text-[#A0A5AECC]">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
