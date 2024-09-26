import React, { useState, useRef, useEffect } from "react";
import styles from "../css-files/Chatbot.module.css";
import Message from "../interfaces/ChatBot/Message";
import DiscoveryDashboard from "./Discovery";
import useMarketResearch from "../hooks/useMarketResearch";
import { stateCoverage } from "../interfaces/DiscoveryDashboard/Data";
import CarriesAnalysis from "./CarriesAnalysis";
import { useNavigate } from "react-router-dom";
import { useToken } from "./UserProvider";

export const featureData = {
  // 'Parcel Intelligence': [
  //   'What is Parcel Intelligence?',
  //   'How can Parcel Intelligence benefit me?',
  //   'Other'
  // ],
  // 'PLD Analysis': [
  //   'What is PLD Analysis?',
  //   'How can PLD Analysis benefit me?',
  //   'Other'
  // ],
  Discover: [
    "Shipper Discovery?",
    "How can Shipper Discovery benefit me?",
    "Other",
  ],
  "Market Research": [
    "What is Market Research?",
    "How can Market Research benefit me?",
    "Other",
  ],
};

const FeatureButton = ({ feature, selectedFeature, toggleFeature }) => {
  const boxShadow =
    selectedFeature === feature
      ? "0px 4px 10px 0px rgba(6, 216, 216, 0.40)"
      : "none";

  return (
    <button
      className="inline-flex mr-3 h-8 justify-center items-center flex-shrink-0 rounded-lg text-sm mt-1 bg-[rgba(74,229,201,0.20)] text-white px-2 py-1.5"
      style={{ boxShadow }}
      onClick={() => toggleFeature(feature)}
    >
      {feature}
    </button>
  );
};

const Chatbot = ({ hideChatBot = false, discoverClick, setDiscoverClick }) => {
  const [socketResponseMsg, setSocketResponseMsg] = useState({
    reports: [],
    logs: [],
  });

  const { sendMessage } = useMarketResearch(setSocketResponseMsg);

  const [isInputOpen, setIsInputOpen] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [replacedCarrier, setReplacedCarrier] = useState(null);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState("Discover");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const messagesEndRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [showCarrierAnalysis, setShowCarrierAnalysis] = useState(false);
  const [showCarrierRanking, setShowCarrierRanking] = useState(false);
  const navigate = useNavigate();
  const token = useToken();

  const defaultDashboardData = {
    stateCoverageData: {
      data: null,
      loading: true,
    },
    customerSentimental: {
      data: null,
      loading: true,
    },
    interactiveComparison: {
      data: null,
      loading: true,
    },
    shippingCostComparison: {
      data: null,
      loading: true,
    },
    carrierRateComparison: {
      data: null,
      loading: true,
    },
  };

  const defaultDiscoveryData = {
    jsonifyContent: {
      data: null,
      loading: false,
      fetched: false,
    },
    agenticData: {
      data: null,
      loading: false,
      fetched: false,
    },
  };
  const [dataState, setDataState] = useState(defaultDashboardData);
  const [discoveryData, setDiscoveryData] = useState(defaultDiscoveryData);
  const defaultDiscountData = {
    data: null,
    loading: false,
    fetched: false,
  };

  const defaultHistoricalData = {
    recommendation: {
      data: null,
      loading: true,
    },
    historical: {
      data: null,
      loading: true,
    },
  };

  const [historicalData, setHistoricalData] = useState(defaultHistoricalData);
  const [discountData, setDiscountData] = useState(defaultDiscountData);

  const isMobile = window.innerWidth <= 500;

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(true);
      updateZIndex(true);
    }
  }, [isMobile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateZIndex = (expanded) => {
    document.documentElement.style.setProperty(
      "--navigation-z-index",
      expanded ? "40" : "750"
    );
  };

  useEffect(() => {
    if (discoverClick) {
      toggleChatbot();
      // toggleExpand()
    }
  }, [discoverClick]);

  const toggleChatbot = () => {
    if (isChatboxOpen) {
      setIsChatboxOpen(false);
      setShowCarrierRanking(false);
      setTimeout(() => {
        setIsInputOpen(false);
        setSelectedFeature("Discover");
        setInputValue("");
        setMessages([]);
        setChatHistory([]);
        setDiscoverClick?.(false);
        setDataState(defaultDashboardData);
        setDiscoveryData(defaultDiscoveryData);
      }, 500);
    } else {
      setIsInputOpen(true);
      setTimeout(() => setIsChatboxOpen(true), 500);
    }
  };

  const toggleExpand = () => {
    setIsExpanded((prevState) => {
      const newState = !prevState;
      updateZIndex(newState);
      return newState;
    });
  };

  const toggleFeature = (feature) => {
    if (feature === "Discover") {
      setChatHistory([]);
      setShowRecommendation(false);
      setShowCarrierAnalysis(false);
      setSelectedFeature(feature);
    } else {
      setSelectedFeature(feature);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const getChatEndpoint = () => {
    if (selectedFeature === "Discover") {
      return `${process.env.REACT_APP_ORCHESTRO_CHAT_API}/chat`;
    } else {
      return `${process.env.REACT_APP_LLM_SERVICES_URL}/pld_llm`;
    }
  };

  useEffect(() => {
    // socket useEffect

    if (
      (socketResponseMsg?.logs?.length > 0 ||
        socketResponseMsg?.reports?.length > 0) &&
      !socketResponseMsg.logs.some((log) => log.includes("Total run time:"))
    ) {
      setLoading(false);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        if (updatedMessages.length > 0) {
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          lastMessage.marketResearch = {
            // ...lastMessage,
            isMarketResearch: true,
            mainMessageLoader: false,
            logLoader: true,
            data: socketResponseMsg,
          };
        }
        return updatedMessages;
      });
    } else if (
      socketResponseMsg.logs.some((log) => log.includes("Total run time:"))
    ) {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        if (updatedMessages.length > 0) {
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          lastMessage.marketResearch = {
            data: {
              ...lastMessage.marketResearch?.data,
            },
            isMarketResearch: true,
            mainMessageLoader: false,
            logLoader: false,
          };
        }
        return updatedMessages;
      });
      setSocketResponseMsg({ logs: [], reports: [] });
    }
  }, [socketResponseMsg]);

  const setErrorForDashboard = () => {
    setDiscoveryData({
      jsonifyContent: {
        data: null,
        loading: false,
        fetched: true,
        error: false,
      },
      agenticData: {
        data: null,
        loading: false,
        fetched: true,
        error: true,
      },
    });
    setDataState({
      stateCoverageData: {
        data: null,
        loading: false,
      },
      customerSentimental: {
        data: null,
        loading: false,
      },
      interactiveComparison: {
        data: null,
        loading: false,
      },
      shippingCostComparison: {
        data: null,
        loading: false,
      },
      carrierRateComparison: {
        data: null,
        loading: false,
      },
    });
  };

  const fetchRecommendationData = async (chatData) => {
    if (chatData?.length <= 1) return;
    try {
      const jsonifyResponse = await fetch(
        `${process.env.REACT_APP_JSONIFY_CHAT_API}/jsonify-agent/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ history: JSON.stringify(chatData) }),
        }
      );

      if (!jsonifyResponse.ok)
        throw new Error("Failed to fetch jsonifyContent");

      const jsonifyData = await jsonifyResponse.json();
      const jsonifyContent = jsonifyData?.requirements;

      if (!jsonifyContent) {
        setDiscoveryData((prev) => ({
          ...prev,
          jsonifyContent: {
            data: null,
            loading: false,
            fetched: true,
            error: false,
          },
        }));
        return;
      }

      const agenticResponse = await fetch(
        `${process.env.REACT_APP_PROCESSING_SHIPPING_API}/process-shipping/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonifyContent),
        }
      );

      const agenticData = agenticResponse.ok
        ? await agenticResponse.json()
        : null;

      if (agenticData) {
        setDiscoveryData({
          jsonifyContent: {
            data: jsonifyContent,
            loading: false,
            fetched: true,
            error: false,
          },
          agenticData: {
            data: agenticData,
            loading: false,
            fetched: true,
            error: false,
          },
        });
      } else {
        setErrorForDashboard();
      }
    } catch (error) {
      setErrorForDashboard();
    }
  };

  const addYesResponse = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: "Yes" },
      { type: "bot", text: null },
    ]);
  };

  const discountYesClick = () => {
    setLoading(true);
    addYesResponse();
    setTimeout(() => {
      const dummyResponse = {
        type: "bot",
        text: "Looking at your data, it seems like your annual spend on carriers is in the range of $1 to $2 M. Here are carrier discounts you can benefit from.",
        showDiscountButton: true,
      };
      setLoading(false);
      setMessages((prevMessages) => {
        const updatedData = [...prevMessages];
        updatedData[updatedData.length - 1] = {
          ...updatedData[updatedData.length - 1],
          ...dummyResponse,
        };
        return updatedData;
      });
      setDiscountData((prev) => ({
        ...prev,
        loading: true,
      }));
      fetchHistoricalData();
      setTimeout(() => {
        const nextMessage = {
          type: "bot",
          text: "Do you want to see how a carrier rate increase would affect your shipping cost and savings strategies in the future?",
          uploadPldYesNoButton: true,
        };
        setMessages((prevMessages) => [...prevMessages, nextMessage]);
      }, 5000);
    }, 3000);
  };

  const uploadPldYesClick = () => {
    setLoading(true);
    addYesResponse();
    setTimeout(() => {
      const dummyResponse = {
        type: "bot",
        text: "Upload your PLD file to see the rate increase effects and personalized saving strategies.",
        showUploadPldButton: true,
      };
      setLoading(false);
      setMessages((prevMessages) => {
        const updatedData = [...prevMessages];

        updatedData[updatedData.length - 1] = {
          ...updatedData[updatedData.length - 1],
          ...dummyResponse,
        };

        return updatedData;
      });
    }, 3000);
  };

  async function generateKey() {
    return crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  }

  async function encryptData(key, data) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encodedData
    );

    return {
      iv: Array.from(iv),
      ciphertext: Array.from(new Uint8Array(encryptedData)),
    };
  }

  function toBase64Url(array) {
    return btoa(String.fromCharCode.apply(null, array))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  async function onRateIncreaseButtonClick() {
    const rfpLogin =
      "https://bid-engine-test.orchestro.ai/api/v2/core/pre-sale/google-user-login";
    const headers = {
      Authorization: "Bearer " + token,
    };
    const response = await fetch(rfpLogin, {
      method: "POST",
      headers: headers,
    });
    const data = await response.json();
    const key = await generateKey();
    const state = JSON.stringify(data);
    const encryptedState = await encryptData(key, state);
    const ivBase64 = toBase64Url(new Uint8Array(encryptedState.iv));
    const ciphertextBase64 = toBase64Url(
      new Uint8Array(encryptedState.ciphertext)
    );
    const keyBase64 = toBase64Url(
      new Uint8Array(await crypto.subtle.exportKey("raw", key))
    );
    const url = new URL(process.env.REACT_APP_RFP_BASE_URL + "/login");
    url.searchParams.set("iv", ivBase64);
    url.searchParams.set("ciphertext", ciphertextBase64);
    url.searchParams.set("key", keyBase64);
    window.open(url.toString(), "_blank");
  }

  const handleSendMessage = async (optionalValue = null) => {
    const messageText = optionalValue !== null ? optionalValue : inputValue;
    setLoading(true);
    if (messageText.trim() !== "") {
      const newMessages = [...messages, { type: "user", text: messageText }];
      setInputValue("");
      setMessages(newMessages);

      const botMessage = {
        type: "bot",
        text: null,
        table: null,
        showCarrierRankingButton: false,
        marketResearch: {
          isMarketResearch: selectedFeature === "Market Research",
          mainMessageLoader: true,
          logLoader: false,
          data: socketResponseMsg,
        },
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);

      const apiUrl = getChatEndpoint(selectedFeature);
      const apiKey = process.env.REACT_APP_LLM_SERVICE_KEY;

      if (selectedFeature === "Discover") {
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_message: messageText,
              conversation_history: chatHistory,
            }),
          });
          const data = await response.json();
          if (data?.showButton) {
            setShowCarrierRanking(true);
            setTimeout(() => {
              const dummyResponse = {
                type: "bot",
                text: "Do you want to analyze the discounts that you get from carriers?",
                discountYesNoButton: true, // Add the yesNoButton key to the response
              };
              setMessages((prevMessages) => [...prevMessages, dummyResponse]);
            }, 5000); // 5-second delay
          }
          const newBotMessage = {
            type: "text",
            text: data.assistant_response,
            showCarrierRankingButton: data?.showButton,
          };
          const containsAdultSignature = data?.assistant_response
            ?.toLowerCase()
            .includes("adult");
          if (containsAdultSignature) {
            setDiscoveryData((prev) => {
              if (
                !prev?.agenticData?.loading &&
                !prev?.agenticData?.fetched &&
                !prev?.jsonifyContent?.loading &&
                !prev?.jsonifyContent?.fetched
              ) {
                fetchRecommendationData(data.conversation_history);
                setDataState(defaultDashboardData);
                return {
                  agenticData: {
                    data: null,
                    loading: true,
                    fetched: false,
                  },
                  jsonifyContent: {
                    data: null,
                    loading: true,
                    fetched: false,
                  },
                };
              }
              return prev;
            });
          }
          setChatHistory(data.conversation_history);
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            if (updatedMessages.length > 0) {
              const lastMessage = updatedMessages[updatedMessages.length - 1];
              lastMessage.text = newBotMessage.text;
              const showCarrierRankingButton =
                updatedMessages[updatedMessages.length - 1];
              showCarrierRankingButton.showCarrierRankingButton =
                newBotMessage.showCarrierRankingButton;
            }
            return updatedMessages;
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      } else if (selectedFeature === "Market Research") {
        sendMessage(
          `start { "agent" : "Auto Agent", "report_source" : "web", "report_type" : "research_report", "source_urls" : [], "task" : "${messageText}", "tone" : "Objective" }`
        );
      } else {
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
            body: `{
          "question": "${messageText}"
        }`,
          });

          const data = await response.json();

          const newBotMessage = {
            type: "bot",
            text: data.answer,
            table: data?.table.length > 0 ? data.table : null,

            // table:
            //   data.table.length > 0 && !data.graph.length ? data.table : null,
            chart: data?.graph,
          };

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            if (updatedMessages.length > 0) {
              const lastMessage = updatedMessages[updatedMessages.length - 1];
              lastMessage.text = newBotMessage.text;
              lastMessage.table = newBotMessage.table;
              lastMessage.chart = newBotMessage.chart;
              lastMessage.map = newBotMessage.map;
            }
            return updatedMessages;
          });
        } catch (error) {
          const newBotMessage = {
            type: "bot",
            text: "Sorry, I am unable to fetch the answer at the moment.",
            table: null,
          };
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            if (updatedMessages.length > 0) {
              const lastMessage = updatedMessages[updatedMessages.length - 1];
              lastMessage.text = newBotMessage.text;
              lastMessage.table = newBotMessage.table;
            }
            return updatedMessages;
          });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const fetchDataOnViewButtonClick = (latestData) => {
    if (
      !latestData?.agenticData?.fetched &&
      !latestData?.jsonifyContent?.fetched &&
      !latestData?.agenticData?.loading &&
      !latestData?.jsonifyContent?.loading
    ) {
      setDataState(defaultDashboardData);
      setDiscoveryData({
        jsonifyContent: { data: null, loading: true, fetched: false },
        agenticData: { data: null, loading: true, fetched: false },
      });
      fetchRecommendationData(chatHistory);
    }
  };

  const viewRecommendation = () => {
    if (!isExpanded) {
      setIsExpanded((prevState) => {
        const newState = !prevState;
        updateZIndex(newState);
        return newState;
      });
    }
    setShowRecommendation(true);
    setDiscoveryData((prev) => {
      fetchDataOnViewButtonClick(prev);
      return prev;
    });
  };

  const setData = (key, value) => {
    setDataState((prev) => ({ ...prev, [key]: value }));
  };

  const fetchData = async (url, body, key) => {
    try {
      let updatedBody = body;
      if (key === "stateCoverageData") {
        const defaultArray = ["ups", "usps", "fedex", "dhl"];
        const carrierResults = updatedBody?.carriers?.reduce(
          (result, carrier) => {
            const matchName = defaultArray.find((defaultItem) =>
              carrier?.toLowerCase()?.includes(defaultItem)
            );

            if (matchName) {
              result.matches = {
                ...result.matches,
                [carrier]: stateCoverage[matchName],
              };
            } else {
              result.nonMatches.push(carrier);
            }

            return result;
          },
          { matches: {}, nonMatches: [] }
        );
        if (carrierResults?.nonMatches?.length > 0) {
          updatedBody = {
            ...updatedBody,
            carriers: carrierResults?.nonMatches,
          };
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBody),
          });

          if (!response.ok) throw new Error("Network response was not ok");

          const data = await response.json();
          const updatedCarriersCoverage = {
            ...(data || {}),
            ...carrierResults.matches,
          };
          const reorderedData = {};
          body.carriers?.forEach((cur) => {
            if (updatedCarriersCoverage[cur]) {
              reorderedData[cur] = updatedCarriersCoverage[cur];
            }
          });
          setData(key, { loading: false, data: reorderedData });
        } else {
          setData(key, { loading: false, data: carrierResults.matches });
        }
      } else {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setData(key, { loading: false, data });
      }
    } catch (error) {
      setData(key, { loading: false, data: null });
    }
  };

  const getRandomItem = (arr) => {
    const randomIndex = Math.floor(Math.random() * Math.min(3, arr?.length));
    return arr[randomIndex];
  };

  useEffect(() => {
    if (discoveryData.agenticData?.data?.ranked_vendors?.length > 0) {
      const carriers = [];
      discoveryData.agenticData?.data?.ranked_vendors?.forEach((cur, index) => {
        if (index === 0) {
          carriers.push(cur.first_ranked_carrier);
        } else if (index === 1) {
          carriers.push(cur.second_ranked_carrier);
        } else if (index === 2) {
          carriers.push(cur.third_ranked_carrier);
        } else if (index === 3) {
          carriers.push(cur.fourth_ranked_carrier);
        }
      });
      if (carriers?.length > 0) {
        setReplacedCarrier(getRandomItem(carriers));
      }
      fetchData(
        `${process.env.REACT_APP_CARRIER_RATE_API}/carrier-rate-comparison/`,
        { carriers: carriers, years: 5 },
        "carrierRateComparison"
      );
      fetchData(
        `${process.env.REACT_APP_SHIPPING_COST_API}/shipping-cost-comparison/`,
        {
          carriers: carriers,
          num_examples: 5,
        },
        "shippingCostComparison"
      );
      fetchData(
        `${process.env.REACT_APP_CARRIER_INTERACTIVE_API}/carrier-interactive-comparison/`,
        { carriers: carriers },
        "interactiveComparison"
      );
      fetchData(
        `${process.env.REACT_APP_CUSTOMER_SENTIMENT_API}/customer-sentiment-comparison/`,
        { carriers: carriers },
        "customerSentimental"
      );
      fetchData(
        `${process.env.REACT_APP_STATE_COVERAGE_API}/state-coverage-comparison/`,
        { carriers: carriers },
        "stateCoverageData"
      );
    }
  }, [discoveryData.agenticData?.data]);

  const carriesDiscountAnalysis = () => {
    if (!isExpanded) {
      setIsExpanded((prevState) => {
        const newState = !prevState;
        updateZIndex(newState);
        return newState;
      });
    }
    setShowCarrierAnalysis(true);
  };

  const fetchHistoricalData = async () => {
    try {
      const formData = new FormData();
      const dummyFile = new File(["dummy content"], "dummyfile.txt", {
        type: "text/plain",
      });
      formData.append("file", dummyFile);
      const discountResponse = await fetch(
        `${process.env.REACT_APP_CARRIER_DISCOUNT_API}/generate-discount-data/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!discountResponse.ok)
        throw new Error("Failed to fetch discountResponse");

      const discountResponseData = await discountResponse.json();

      if (!discountResponseData) {
        setDiscountData((prev) => ({
          ...prev,
          data: null,
          loading: false,
          fetched: true,
          error: true,
        }));
        return;
      } else {
        setDiscountData((prev) => ({
          ...prev,
          data: discountResponseData,
          loading: false,
          fetched: true,
          error: false,
        }));
      }
    } catch (error) {
      setErrorForDashboard();
    }
  };

  const fetchHistoricalAndRecommendationData = async (url, body, key) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setHistoricalData((prev) => ({
        ...prev,
        [key]: { loading: false, data },
      }));
    } catch (error) {
      setHistoricalData((prev) => ({
        ...prev,
        [key]: { loading: false, data: null },
      }));
    }
  };

  useEffect(() => {
    if (discountData?.data?.carriers) {
      fetchHistoricalAndRecommendationData(
        `${process.env.REACT_APP_AI_DISCOUNT_API}/ai-recommendations/`,
        discountData?.data,
        "recommendation"
      );
      fetchHistoricalAndRecommendationData(
        `${process.env.REACT_APP_HISTORICAL_API}/generate-negotiation-progress/`,
        discountData?.data,
        "historical"
      );
    }
  }, [discountData]);

  const noClick = () => {
    setChatHistory([]);
    setMessages([]);
    setShowCarrierRanking(false);
  };

  return (
    <>
      {isExpanded && isInputOpen && (
        <div className={styles.backgroundOverlay}></div>
      )}
      {isInputOpen && (
        <div
          className={`fixed ${
            isExpanded ? "inset-0" : "bottom-[10vh] right-8"
          } ${isInputOpen ? "z-50" : ""}`}
        >
          <div
            id="chatbot-wrapper"
            className={`${styles.chatbotBox} ${
              isChatboxOpen ? styles.open : ""
            } ${isExpanded ? styles.expanded : ""}`}
          >
            {showRecommendation || showCarrierAnalysis ? (
              <>
                {showRecommendation && (
                  <DiscoveryDashboard
                    dataState={dataState}
                    discoveryData={discoveryData}
                    replacedCarrier={replacedCarrier}
                  />
                )}
                {showCarrierAnalysis && (
                  <CarriesAnalysis
                    onBack={() => {
                      setShowCarrierAnalysis(false);
                      setShowRecommendation(false);
                    }}
                    historicalData={historicalData}
                    discountData={discountData}
                  />
                )}
                {showRecommendation && (
                  <div
                    className="absolute top-0 right-0 p-2 cursor-pointer"
                    onClick={() => {
                      setShowCarrierAnalysis(false);
                      setShowRecommendation(false);
                    }}
                  >
                    <img
                      src="/chat-bot/Close_MD.svg"
                      alt="Close"
                      className="w-6 h-6"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {/* {!isMobile && (
                  <div
                    className="absolute top-0 left-0 p-2 cursor-pointer"
                    onClick={toggleExpand}
                  >
                    <img
                      src="/chat-bot/Expand.svg"
                      alt="Expand"
                      className="w-6 h-6"
                    />
                  </div>
                )} */}

                <div
                  className="absolute top-0 right-0 p-2 cursor-pointer"
                  onClick={toggleChatbot}
                >
                  <img
                    src="/chat-bot/Close_MD.svg"
                    alt="Close"
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex flex-col h-full">
                  <div className="flex items-center pt-8 pl-3">
                    <img
                      src="/chatbot-icon.svg"
                      alt="Send"
                      className="cursor-pointer h-[45px] w-[45px]"
                    />
                    <h2 className="text-[#EBEBEB] ml-3 text-lg font-semibold">
                      AI Chatbot
                    </h2>
                  </div>
                  <div
                    className={`flex-1 h-fit flex flex-col pt-2 pb-1 overflow-y-auto ${styles.customScrollbar}`}
                  >
                    <p className="text-[#EBEBEB] text-center text-sm font-medium mt-4">
                      Welcome to the Chatbot!
                    </p>
                    <p className="text-[#EBEBEB] text-center text-sm font-medium mt-4">
                      Select the feature you want to ask about.
                    </p>
                    <div className="flex flex-row flex-wrap justify-center mt-4 pb-auto">
                      {Object.keys(featureData).map((feature, index) => (
                        <FeatureButton
                          key={index}
                          feature={feature}
                          selectedFeature={selectedFeature}
                          toggleFeature={toggleFeature}
                        />
                      ))}
                    </div>
                    <div className={`mt-4 h-fit px-1 py-1 mb-[60px]`}>
                      {messages.map((msg, index) => (
                        <Message
                          key={index}
                          type={msg.type}
                          text={msg.text}
                          table={msg.table}
                          chart={msg.chart}
                          toggleChatbot={toggleChatbot}
                          carrierRanking={msg?.showCarrierRankingButton}
                          discountYesNoButton={msg?.discountYesNoButton}
                          uploadPldYesNoButton={msg?.uploadPldYesNoButton}
                          show
                          map={msg.map}
                          showUploadPldButton={msg?.showUploadPldButton}
                          showUploadIcon={msg?.showUploadIcon}
                          showRateIncreaseButton={msg?.showRateIncreaseButton}
                          showDiscount={msg?.showDiscountButton}
                          marketResearch={msg?.marketResearch}
                          onDiscountClick={carriesDiscountAnalysis}
                          onRecommendationClick={viewRecommendation}
                          discountYesClick={discountYesClick}
                          uploadPldYesClick={uploadPldYesClick}
                          setMessages={setMessages}
                          noClick={noClick}
                          onRateIncreaseButtonClick={onRateIncreaseButtonClick}
                          {...{
                            loading,
                            isExpanded,
                          }}
                        />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className={`${styles.chatInputBox} ${
              isInputOpen ? styles.open : ""
            }  mb-[2px] flex items-center ${
              isExpanded ? styles.inputExpanded : "mr-1"
            } ${showRecommendation || showCarrierAnalysis ? "hidden" : ""}`}
          >
            <div>
              <img src="/chat-bot/ai_star.svg" alt="Logo" className="w-6 h-6" />
            </div>
            <input
              type="text"
              placeholder="Question goes here..."
              value={inputValue}
              disabled={showCarrierRanking}
              onKeyDown={handleKeyPress}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 p-2 ml-1 text-sm font-medium leading-5 text-white bg-transparent outline-none placeholder:text-sm placeholder:leading-5 placeholder:text-white placeholder:font-medium"
            />
            <div onClick={() => handleSendMessage()}>
              <img
                src="/chat-bot/Send.svg"
                alt="Send"
                className="cursor-pointer h-[30px] w-[30px]"
              />
            </div>
          </div>
        </div>
      )}
      {!hideChatBot && (
        <div
          onClick={toggleChatbot}
          className="cursor-pointer fixed bottom-[10vh] right-8 z-50"
          style={{ display: isInputOpen ? "none" : "flex" }}
        >
          <img
            src="/chatbot-icon.svg"
            alt="Chatbot Icon"
            className="w-12 h-12 rounded-full"
          />
        </div>
      )}
    </>
  );
};

export default Chatbot;
