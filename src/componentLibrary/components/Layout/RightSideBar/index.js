import { SearchIcon } from "@chakra-ui/icons";
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
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { USERS } from "../LeftSidebar/constant";
import { DownArrowIcon } from "../../../../assets/Icons";

const RightSidebar = ({ addPost }) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();
  const [showMoreUsers, setShowMoreUsers] = React.useState(false);
  const [username, setUsername] = React.useState("");

  const visibleUsers = showMoreUsers ? USERS : USERS.slice(0, 3);

  const generateRandomAuthor = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter A-Z
    return `Anonymous_${randomChar}${randomNum}`;
  };

  const createPost = async () => {
    await addPost(
      JSON.stringify({
        id: uuidv4(),
        title: title,
        content: content,
        author: generateRandomAuthor(),
      })
    );
    setTitle("");
    setContent("");
  };
  return (
    <div className="h-screen bg-transparent text-white sticky top-0 overflow-auto">
      {/* Create Post Section */}
      <CardWrapper title="Create a post">
        {/* Input Fields */}
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 mb-3 bg-[#181921] text-gray-300 placeholder-gray-500 border border-[#D9D9D933] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          placeholder="What's on your mind"
          className="w-full p-3 bg-[#181921] text-gray-300 placeholder-gray-500 border border-[#D9D9D933] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          rows="4"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />

        {/* Post Button */}
        <button
          className="bg-[#181921] border border-[#D9D9D933] w-full py-2 mt-3 rounded-md text-white font-semibold"
          onClick={createPost}
        >
          Post
        </button>
      </CardWrapper>

      {/* Experts Section */}
      <CardWrapper title="Experts">
        <div className="space-y-4">
          {visibleUsers.map((user, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center flex-wrap gap-2"
              >
                <div className="flex items-center">
                  <img
                    src={user.img}
                    alt="expert-avatar"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <span className="text-sm text-nowrap">{user.name}</span>
                    <p className="text-xs text-gray-400 text-nowrap">
                      {user.position}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-[#181921] border border-[#1A8DBE] py-1 px-3 rounded-md text-sm text-[#1A8DBE] transition duration-300 flex items-center text-nowrap gap-2"
                  onClick={() => {
                    setUsername(user.name);
                    onOpen();
                  }}
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 10.5195C2.5 14.6617 5.85786 18.0195 10 18.0195C14.1421 18.0195 17.5 14.6617 17.5 10.5195C17.5 6.3774 14.1421 3.01953 10 3.01953C5.85786 3.01953 2.5 6.3774 2.5 10.5195Z"
                      stroke="#1A8DBE"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.33333 13.0195V8.01953L12.5 10.5195L8.33333 13.0195Z"
                      stroke="#1A8DBE"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Join Live
                </button>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setShowMoreUsers(!showMoreUsers)}
          className="text-gray-400 mt-4 flex gap-4 items-center"
        >
          {showMoreUsers ? "Show less" : "Show more"}
          <DownArrowIcon
            style={{
              transform: showMoreUsers ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>
      </CardWrapper>

      {/* Virtual Event Section */}
      <CardWrapper title="Virtual Event">
        <p className="mb-2 font-semibold text-sm">
          Future of Last Mile Delivery
        </p>
        <p className="text-gray-400 text-xs">
          September 20, 2024 at 4:00 PM PST
        </p>

        <button
          className="px-4 py-1 mt-2 rounded-lg relative text-white text-sm transition duration-200 border border-slate-600 flex gap-1 items-center"
          onClick={() => onOpenRegister()}
        >
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-blue-600 via-20% to-transparent" />
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.33333 8.51953H8M8 8.51953H10.6667M8 8.51953V11.1862M8 8.51953V5.85286M8 14.5195C4.68629 14.5195 2 11.8332 2 8.51953C2 5.20582 4.68629 2.51953 8 2.51953C11.3137 2.51953 14 5.20582 14 8.51953C14 11.8332 11.3137 14.5195 8 14.5195Z"
              stroke="#A0A5AE"
              stroke-opacity="0.8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="relative z-20">Register</span>
        </button>
      </CardWrapper>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Live Call with {username}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You're about to join a live video call with {username}. Please
            ensure your camera and microphone are working.
          </ModalBody>
          <ModalFooter>
            <a
              href="https://orchestra-video.vercel.app/meeting/user_2mcGIwKv6r4HUUILzCtAt9bSZdc?personal=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                type="button"
                className="bg-[#181921] border border-[#1A8DBE] py-1 px-3 rounded-md text-sm text-[#1A8DBE] transition duration-300 flex items-center text-nowrap gap-2"
              >
                Join Call
              </button>
            </a>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenRegister} onClose={onCloseRegister} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register for Future of Last-Mile Delivery</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Would you like to Register for Future of Last-Mile Delivery on
            October 15, 2024 at 2:00 PM EST?
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="bg-[#181921] border border-[#1A8DBE] py-1 px-3 rounded-md text-sm text-[#1A8DBE] transition duration-300 flex items-center text-nowrap gap-2"
            >
              Register
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RightSidebar;

const CardWrapper = ({ title, children }) => {
  return (
    <div className="mb-6 p-4 bg-[#181921] border border-[#D9D9D933] rounded-lg shadow-md">
      <div className="flex justify-between w-full items-center mb-3 border-b pb-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <SearchIcon />
      </div>
      {children}
    </div>
  );
};
