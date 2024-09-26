import React from "react";
import { AiIcon, PinIcon, SendIcon } from "../../assets/Icons";
import { Spinner } from "@chakra-ui/react";

const ShipTalkAi = () => {
  const [prompt, setPrompt] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const containerRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const convertMarkdownToHtml = (markdownText) => {
    // Convert headers (e.g., # Header -> <h1>Header</h1>)
    markdownText = markdownText.replace(/^# (.*$)/gim, "<h1>$1</h1>");
    markdownText = markdownText.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    markdownText = markdownText.replace(/^### (.*$)/gim, "<h3>$1</h3>");

    // Convert bold (e.g., **bold** -> <strong>bold</strong>)
    markdownText = markdownText.replace(
      /\*\*(.*)\*\*/gim,
      "<strong>$1</strong>"
    );

    // Convert italics (e.g., *italic* -> <em>italic</em>)
    markdownText = markdownText.replace(
      /\*\*(.*)\*\*/gim,
      "<strong>$1</strong>"
    );

    // Convert unordered lists (e.g., - Item -> <ul><li>Item</li></ul>)
    markdownText = markdownText.replace(/^\- (.*$)/gim, "<li>$1</li>");
    markdownText = markdownText.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");
    // Convert numbered lists (e.g., 1. Item -> <ol><li>Item</li></ol>)
    markdownText = markdownText.replace(/^\d+\.\s(.*$)/gim, "<li>$1</li>");
    markdownText = markdownText.replace(/(<li>.*<\/li>)/gim, "<ol>$1</ol>");

    // Convert line breaks
    markdownText = markdownText.replace(/\n$/gim, "<br />");
    markdownText = markdownText.replace(/(<br \/>){2,}/gim, "<br />");

    return markdownText.trim(); // return the converted HTML
  };
  const apiCall = async () => {
    if (!prompt) return;
    setLoader(true);
    setTimeout(() => {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
    try {
      const response = await fetch("https://shiptalkai.onrender.com/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_message: prompt,
          conversation_history: [
            {
              role: "user",
              content: "Previous message content",
            },
            // ... additional messages if any
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("My data ->>",data);
        setLoader(false);
        let div = document.createElement("div");
        div.className =
          "bg-[#181921] px-4 py-2 rounded-lg border border-[#D9D9D933] self-end leading-8";
        div.innerHTML = prompt;
        containerRef.current.append(div);
        let divAns = document.createElement("div");
        divAns.className =
          "bg-[#181921] px-4 py-2 rounded-lg border border-[#D9D9D933] self-start flex flex-col gap-3 leading-8";
        divAns.innerHTML = convertMarkdownToHtml(data.assistant_response);
        containerRef.current.append(divAns);
        setPrompt("");
        setTimeout(() => {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      } else {
        try {
          const response = await fetch(
            process.env.REACT_APP_SHIPTALK_API + "/AI_bot/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                question: prompt,
              }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            setLoader(false);
            let div = document.createElement("div");
            div.className =
              "bg-[#181921] px-4 py-2 rounded-lg border border-[#D9D9D933] self-end leading-8";
            div.innerHTML = prompt;
            containerRef.current.append(div);
            let divAns = document.createElement("div");
            divAns.className =
              "bg-[#181921] px-4 py-2 rounded-lg border border-[#D9D9D933] self-start flex flex-col gap-3 leading-8";
            divAns.innerHTML = convertMarkdownToHtml(data.content);
            containerRef.current.append(divAns);
            setPrompt("");
            setTimeout(() => {
              scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
              });
            }, 100);
          }
        } catch (err) {
          setLoader(false);
          console.log(err);
        }
      }
    } catch (err) {
      setLoader(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-start gap-3">
        <AiIcon />
        <span className="font-bold text-lg">ShipTalk AI Assistant</span>
      </div>
      <div
        className="flex flex-col items-center justify-start max-h-[400px] overflow-y-auto"
        ref={scrollRef}
      >
        <div
          className="flex w-full flex-col items-center justify-start gap-3"
          ref={containerRef}
        ></div>
        {loader ? (
          <div className="flex justify-center items-center p-4 flex-1">
            <Spinner size={"lg"} />
          </div>
        ) : null}
      </div>
      <div className="flex border rounded-lg">
        <div className="flex h-100 items-center justify-center px-3">
          <PinIcon />
        </div>
        <input
          type="text"
          placeholder="Ask a Question"
          className="grow rounded-e-lg py-2 bg-transparent focus-visible:outline-none"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              apiCall();
            }
          }}
        />
        <div className="flex h-100 items-center justify-center px-3">
          <button
            className="grow p-2 rounded-lg bg-[#1A8DBE]"
            onClick={apiCall}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
};
export default ShipTalkAi;
