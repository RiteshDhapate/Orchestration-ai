import React, { useState } from "react";
import { TOPICS, GROUPS } from "./constant"; // Adjust path as necessary
import StarIcon from "../../../../assets/Icons/StarIcon";
import { DownArrowIcon, SearchIcon } from "../../../../assets/Icons";
import Chatbot from "../../../../pages/ChatBot";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const LeftSidebar = ({ applyFilter, filterTopic }) => {
  const [showMoreTopics, setShowMoreTopics] = useState(false);
  const [showMoreGroups, setShowMoreGroups] = useState(false);
  const [discoverClick, setDiscoverClick] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupName, setGroupName] = useState("");

  const visibleTopics = showMoreTopics ? TOPICS : TOPICS.slice(0, 5);
  const visibleGroups = showMoreGroups ? GROUPS : GROUPS.slice(0, 2);

  const handleDiscoverClick = () => {
    setDiscoverClick(true);
  };

  return (
    <>
      <div className="bg-[#181921] border border-[#D9D9D933] text-white h-screen p-4 space-y-6 rounded-lg sticky top-0 overflow-auto">
        {/* Discover Proposal Button */}
        <button
          onClick={handleDiscoverClick}
          className="bg-gradient-to-r from-[#3BA0E6] to-[#3B6EF3] w-full py-2 rounded-md text-center font-semibold"
        >
          Discover Proposal
        </button>

        {/* Topics Section */}
        <div>
          <div className="flex justify-between items-center border-b-[0.5px] p-1 mb-2  border-b-[#858698] border-opacity-20 ">
            <h2 className="text-lg font-semibold">Topics</h2>
            <SearchIcon className="text-gray-400  " />
          </div>
          <div className="space-y-1">
            {visibleTopics.map((topic, index) => {
              const { Icon } = topic;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between text-gray-300 hover:text-white text-nowrap cursor-pointer"
                  onClick={() => applyFilter(topic.label)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="p-2">
                      <Icon width={24} height={24} />
                    </div>
                    <span
                      className={`${filterTopic === topic.label && "text-white font-semibold"}`}
                    >
                      {topic.label}
                    </span>
                  </div>
                  {topic.star ? (
                    <button className="text-gray-400">
                      <StarIcon />
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setShowMoreTopics(!showMoreTopics)}
            className="text-gray-400 mt-4 flex gap-4 items-center"
          >
            {showMoreTopics ? "Show less" : "Show more"}
            <DownArrowIcon
              style={{
                transform: showMoreTopics ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </button>
        </div>

        {/* Groups Section */}
        <div>
          <div className="flex justify-between items-center border-b-[0.5px] p-1 mb-2  border-b-[#858698] border-opacity-20 ">
            <h2 className="text-lg font-semibold">Groups</h2>
            <SearchIcon className="text-gray-400  " />
          </div>
          <div className="space-y-1">
            {visibleGroups.map((topic, index) => {
              const { Icon } = topic;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between text-gray-300 hover:text-white text-nowrap"
                >
                  <div className="flex items-center space-x-2">
                    <div className="p-2">
                      <Icon width={24} height={24} />
                    </div>
                    <span>{topic.label}</span>
                  </div>
                  <button
                    className="bg-[#181921] border border-[#1A8DBE] py-1 px-3 rounded-md text-sm text-[#1A8DBE] transition duration-300 flex items-center text-nowrap gap-2"
                    onClick={() => {
                      setGroupName(topic.label);
                      onOpen();
                    }}
                  >
                    Join
                  </button>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setShowMoreGroups(!showMoreGroups)}
            className="text-gray-400 mt-4 flex gap-4 items-center"
          >
            {showMoreGroups ? "Show less" : "Show more"}
            <DownArrowIcon
              style={{
                transform: showMoreGroups ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </button>
        </div>
      </div>
      <Chatbot
        discoverClick={discoverClick}
        hideChatBot={true}
        setDiscoverClick={setDiscoverClick}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join {groupName} Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to join the {groupName} group? You'll receive
            notifications about new discussions and updates.
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="bg-[#181921] border border-[#1A8DBE] py-1 px-3 rounded-md text-sm text-[#1A8DBE] transition duration-300 flex items-center text-nowrap gap-2"
            >
              Join Group
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LeftSidebar;
