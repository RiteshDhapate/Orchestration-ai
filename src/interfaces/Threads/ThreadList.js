import React from "react";
import Thread from "./Thread";
import { Spinner } from "@chakra-ui/react";

const ThreadList = ({ data, loader }) => {
  return (
    <div className="flex flex-col">
      {loader && (
        <div className="flex justify-center items-center p-4 flex-1">
          <Spinner size={"lg"} />
        </div>
      )}
      {!loader && data.map((item) => <Thread key={item.id} item={item} />)}
    </div>
  );
};

export default ThreadList;
