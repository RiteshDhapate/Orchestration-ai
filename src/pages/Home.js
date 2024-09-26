import React, { useEffect } from "react";
import RightSidebar from "../componentLibrary/components/Layout/RightSideBar";
import LeftSidebar from "../componentLibrary/components/Layout/LeftSidebar";
import styles from "../css-files/Home.module.css";
import { FilterIcon, SortIcon } from "../assets/Icons";
import { ThreadList } from "../interfaces/Threads";
import { ShipTalkAi } from "../interfaces/ShipTalkAi";

const Home = () => {
  const [data, setData] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [viewData, setViewData] = React.useState([]);
  const [filterTopic, setFilterTopic] = React.useState("All Posts");

  const addPost = async (formData) => {
    const response = await fetch(
      process.env.REACT_APP_SHIPTALK_API + "/upload_post/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      }
    );
    if (response.ok) {
      const resp = await response.json();
      setViewData([resp, ...data]);
      setFilterTopic("");
    }
  };

  const threadList = async () => {
    setLoader(true);
    const response = await fetch(
      process.env.REACT_APP_SHIPTALK_API + "/get_posts/"
    );
    if (response.ok) {
      const res = await response.json();
      setLoader(false);
      setData(res);
      setViewData(res);
    }
  };

  const applyFilter = (topic) => {
    setFilterTopic(topic);
    if (topic && topic !== "All Posts") {
      setViewData(data.filter((item) => item.category === topic));
    } else {
      setViewData(data);
    }
  };

  useEffect(() => {
    threadList();
    setFilterTopic("All Posts");
  }, []);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-12 gap-3">
      {/* Left Sidebar */}
      <div className="sm:col-span-3">
        <LeftSidebar applyFilter={applyFilter} filterTopic={filterTopic} />
      </div>
      {/* Main content area */}
      <div className="sm:col-span-6 px-4">
        <div
          className={`flex flex-col gap-4 bg-[#18192133] ${styles.customBorder} p-4 mb-4 rounded-lg relative`}
        >
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-blue-600 via-20% to-transparent" />
          <ShipTalkAi />
        </div>
        <div className="bg-[#181921] rounded-lg border border-[#D9D9D933]">
          <div className="flex items-center justify-between p-4 border-b border-[#D9D9D933]">
            <h2 className="text-lg font-semibold">Threads</h2>
            <div className="flex gap-2">
              <FilterIcon />
              <SortIcon />
            </div>
          </div>
          <ThreadList data={viewData} loader={loader} />
        </div>
      </div>
      {/* Right Sidebar */}
      <div className="sm:col-span-3">
        <RightSidebar addPost={addPost} />
      </div>
    </div>
  );
};

export default Home;
