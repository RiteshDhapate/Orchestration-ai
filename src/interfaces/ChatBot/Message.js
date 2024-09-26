import { useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import * as XLSX from "xlsx";
import styles from "../../css-files/Chatbot.module.css";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import MarketResearchComponent from "./MarketResearchComponent";
import HeatMap from "./HeatMap";
import GaugeChart from "./GaugeChart";
import { Button, IconButton, Modal, UploadFile } from "../../componentLibrary";
import { Spinner } from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Papa from "papaparse";
import { useToken } from "../../pages/UserProvider";

const SortIcon = ({ direction, onSort, currentSortKey, sortKey }) => {
  return (
    <div className="flex flex-col">
      {direction !== "asc" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 cursor-pointer -mb-3"
          onClick={() => onSort("asc")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9 12 5.25 15.75 9"
          />
        </svg>
      )}
      {direction !== "desc" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 cursor-pointer -mt-3"
          onClick={() => onSort("desc")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15"
          />
        </svg>
      )}
    </div>
  );
};

const Message = ({
  showDiscount,
  onDiscountClick,
  carrierRanking,
  type,
  text,
  table,
  chart,
  map,
  toggleChatbot,
  marketResearch,
  isExpanded,
  loading,
  onRecommendationClick,
  discountYesNoButton,
  discountYesClick,
  uploadPldYesNoButton,
  uploadPldYesClick,
  showUploadPldButton,
  setMessages,
  showUploadIcon,
  showRateIncreaseButton,
  onRateIncreaseButtonClick,
  noClick,
}) => {
  const token = useToken();
  const [showText, setShowText] = useState(type !== "bot");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [sortedData, setSortedData] = useState([]);

  const [errors, setErrors] = useState([]);
  const [fileProcessing, setFileProcessing] = useState(false);

  const [openUploadModal, setOpenUploadModal] = useState();
  const [uploadingLoader, setUploadingLoader] = useState(false);
  const [showMapping, setShowMapping] = useState(false);
  const [uploadData, setUploadData] = useState({
    partner: null,
    client: null,
    file: null,
    pldFields: [],
    carrier: "any",
  });

  const data = useMemo(() => {
    return table || [];
  }, [table]);

  useEffect(() => {
    if (type === "bot") {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [type]);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
    const sortedArray = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sortedArray);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sortedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table_data.xlsx");
  };

  const userStyle = {
    background: "rgba(6, 216, 216, 0.40)",
    borderRadius: "8px",
    display: "flex",
    maxWidth: window.innerWidth < 500 ? "95%" : isExpanded ? "50%" : "356px",
    width: "auto",
    padding: "12px",
    alignItems: "center",
    gap: "8px",
  };

  const botStyle = {
    background: "rgba(74, 229, 201, 0.20)",
    borderRadius: "8px",
    // display: 'flex',
    padding: "12px",
    alignItems: "center",
    gap: "8px",
    alignSelf: "stretch",
    paddingLeft: "25px",
    marginLeft: "3px",
    maxWidth: window.innerWidth < 500 ? "95%" : isExpanded ? "70%" : "356px",
    width: "auto",
  };

  const LoaderComponent = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex items-center space-x-2">
        <Spinner />
      </div>
    </div>
  );
  const onShowUploadModal = () => {
    setOpenUploadModal(true);
  };

  const onCloseUploadModal = () => {
    setOpenUploadModal(false);
    setUploadData({
      partner: null,
      client: null,
      file: null,
      pldFields: [],
    });
    setErrors([]);
  };

  const uploadHandler = () => {
    // const missingFields = requiredFields.filter((field) => !uploadData[field]);
    // if (missingFields?.length > 0) {
    //   setErrors(missingFields);
    // } else {
    setErrors([]);
    setShowMapping(true);
    handleFileUpload();
    // }
  };

  const handleFileSelection = (files) => {
    setUploadData({ ...uploadData, file: files[0] });
  };

  const handleFileUpload = (file) => {
    // Simulate file upload
    setFileProcessing(true);

    const formData = new FormData();
    formData.append("file", uploadData.file);

    const url =
      "https://bid-engine-test.orchestro.ai/api/v2/core/shiptalk/pld-upload?client=client1&partner=Moyer&ratecard=ratecard";
    const headers = {
      Authorization: "Bearer " + token,
    };

    fetch(url, {
      method: "POST",
      headers: headers,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setFileProcessing(false);
        setOpenUploadModal(false);
        // Add user response with file icon and file name
        const userFileResponse = {
          type: "user",
          text: {
            name: uploadData?.file?.name,
            icon: "📄",
          },
          showUploadIcon: true,
        };
        setMessages((prevMessages) => [...prevMessages, userFileResponse]);

        const rfpUrl =
          "https://bid-engine-test.orchestro.ai/api/v2/core/pre-sale/rfp-file-upload-details/shiptalk";

        fetch(rfpUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data?.status === "COMPLETED") {
              const nextMessage = {
                type: "bot",
                text: "Great, view the rate increase effects and saving strategies here.",
                showRateIncreaseButton: true,
              };
              setMessages((prevMessages) => [...prevMessages, nextMessage]);
              setUploadData({
                partner: null,
                client: null,
                file: null,
                pldFields: [],
                carrier: "any",
              });
              setErrors([]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // we will use this when we have real api endpoint
  // const handleFileUpload = file => {
  //   setFileProcessing(true)
  //   const fileExtension = file.name.split('.').pop()?.toLowerCase()
  //   if (fileExtension === 'xls' || fileExtension === 'xlsx') {
  //     const reader = new FileReader()
  //     reader.onload = e => {
  //       const data = new Uint8Array(e.target?.result)
  //       const workbook = XLSX.read(data, { type: 'array' })
  //       const sheetName = workbook.SheetNames[0]
  //       const worksheet = workbook.Sheets[sheetName]
  //       const headers = XLSX.utils.sheet_to_json(worksheet, {
  //         header: 1,
  //         raw: false
  //       })[0]
  //       const firstRow = XLSX.utils.sheet_to_json(worksheet, {
  //         header: 1,
  //         raw: false
  //       })[1]
  //       let pldFields = []
  //       if (headers?.length > 0 && firstRow?.length) {
  //         pldFields = headers
  //           ?.map((label, index) => ({ label, index }))
  //           .filter(({ label }) => label)
  //           .map(({ label, index }) => {
  //             return {
  //               id: label,
  //               content: firstRow[index]?.toString(),
  //               label: label
  //                 ?.toString()
  //                 ?.split('_')
  //                 ?.map(
  //                   word =>
  //                     word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  //                 )
  //                 .join(' '),
  //               isDropped: false
  //             }
  //           })
  //       }
  //       setUploadData(prevData => ({
  //         ...prevData,
  //         pldFields: pldFields,
  //         file: file
  //       }))
  //       setErrors(errors?.filter(cur => cur !== 'file'))
  //       setFileProcessing(false)
  //     }
  //     reader.readAsArrayBuffer(file)
  //   } else if (fileExtension === 'csv') {
  //     let pldFields = []
  //     Papa.parse(file, {
  //       header: true,
  //       skipEmptyLines: true, // Ensure empty lines are not skipped
  //       step: function (results, parser) {
  //         let row = results.data
  //         pldFields = Object.keys(row).map(key => {
  //           return {
  //             id: key,
  //             content: row[key]?.toString(),
  //             label: key
  //               .split('_')
  //               .map(
  //                 word =>
  //                   word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  //               )
  //               .join(' '),
  //             isDropped: false
  //           }
  //         })
  //         parser.abort() // Stop after the first row (header) is parsed
  //         setUploadData(prevData => ({
  //           ...prevData,
  //           pldFields: pldFields,
  //           file: file
  //         }))
  //         setFileProcessing(false)
  //       },
  //       complete: function () {}
  //     })
  //   }
  // }

  const renderTable = () => {
    if (sortedData.length === 0) return null;

    const headers = Object.keys(sortedData[0]);

    return (
      <>
        <div
          style={{
            overflow: "auto",
            maxHeight: "300px",
            borderRadius: "10px 10px 0px 0px",
          }}
          className={`${styles.customScrollbar} mt-2`}
        >
          <table
            className="bg-transparent text-[14px] text-gray-200"
            style={{ maxWidth: "max-content", minWidth: "100%" }}
          >
            <thead className="h-13 mb-2 bg-[rgba(129,243,250,0.20)] sticky top-0">
              <tr className="bg-[#2a6b87]">
                {headers.map((header) => (
                  <th key={header} className="px-4 py-2 w-max cursor-pointer">
                    <div className="flex items-center">
                      {header}
                      <SortIcon
                        direction={
                          sortConfig.key === header
                            ? sortConfig.direction
                            : null
                        }
                        onSort={(direction) => handleSort(header, direction)}
                        currentSortKey={sortConfig.key}
                        sortKey={header}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <div className="mt-[5px]"></div>
            <tbody className="bg-[rgba(129,243,250,0.20)]">
              {sortedData.map((row, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="px-4 py-2 w-max border-b border-[#FFFFFF33]"
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="w-full flex flex-row justify-end mt-[5px] px-4 py-2 text-[#74BCFF] text-right text-[14px] bg-[rgba(129,243,250,0.20)] cursor-pointer"
          style={{ borderRadius: "0px 0px 10px 10px" }}
          onClick={exportToExcel}
        >
          <img src="/Table.svg" className="ml-auto mr-[2px]" alt=""></img>{" "}
          Export to Sheets
        </div>
      </>
    );
  };

  const renderChart = () => {
    return chart.chartType === "pie-chart" ? (
      <PieChart {...{ chartData: chart }} />
    ) : chart.chartType === "bar-chart" ? (
      <BarChart {...{ chartData: chart }} />
    ) : chart.chartType === "gauge-chart" ? (
      <GaugeChart {...{ chartData: chart }} />
    ) : null;
  };

  const renderMap = () => {
    return <HeatMap bounds={null} states={chart?.data} table={table} />;
  };

  const renderMarketComponent = () => {
    return <MarketResearchComponent {...{ marketResearch }} />;
  };

  return (
    <div
      className={`flex ${
        type === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`p-3 rounded-lg max-w-xs relative`}
        style={type === "user" ? userStyle : botStyle}
      >
        {type !== "user" && (
          <>
            <img
              src="/chat-bot/bot-reply.svg"
              alt="Bot Logo"
              style={{
                width: "35px",
                height: "35px",
                position: "absolute",
                top: "0px",
                left: "5px",
                margin: "8px",
              }}
            />
          </>
        )}
        {type === "bot" && loading && !text && (
          <div className={`${styles.loader}`}>
            <hr className={`${styles.animatedBg}`} />
            <hr className={`${styles.animatedBg}`} />
            <hr className={`${styles.animatedBg}`} />
          </div>
        )}
        {showText && (
          <div
            style={{
              marginLeft: type !== "user" ? "32px" : "0",
              overflow: "hidden",
            }}
          >
            {type === "bot" ? (
              <>
                <ReactMarkdown>{text}</ReactMarkdown>
                {table && renderTable()}
                {chart && renderChart()}
                {chart?.chartType === "choropleth-us-map" && renderMap()}
                {marketResearch?.isMarketResearch && renderMarketComponent()}
              </>
            ) : (
              <div>
                {" "}
                {!showUploadIcon ? (
                  text
                ) : (
                  <div className=" flex gap-3">
                    <div> {text?.icon}</div>
                    <div> {text?.name}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {type === "bot" && text?.length > 0 && showDiscount && (
          <div className="flex mt-5 ml-7 gap-5">
            <Button onClick={onDiscountClick}>Discount</Button>
          </div>
        )}
        {type === "bot" && carrierRanking && (
          <div className="flex mt-5 ml-7 gap-5">
            <Button onClick={onRecommendationClick}>Carrier Ranking</Button>
          </div>
        )}
        {type === "bot" && showRateIncreaseButton && (
          <div className="flex mt-5 ml-7 gap-5">
            <Button onClick={onRateIncreaseButtonClick}>Rate Increase</Button>
          </div>
        )}

        {type === "bot" && showUploadPldButton && (
          <div className="flex mt-5 ml-7 gap-5">
            <Button onClick={onShowUploadModal}>Upload PLD</Button>
          </div>
        )}
        {type === "bot" && discountYesNoButton && (
          <div className="flex mt-5 ml-7 gap-5">
            <Button
              className="text-[#74BCFF] bg-none border border-[#858698] border-opacity-20 min-w-[80px] "
              onClick={discountYesClick}
            >
              Yes
            </Button>
            <Button
              onClick={noClick}
              className="text-[#74BCFF] bg-none border border-[#858698] border-opacity-20 min-w-[80px] "
            >
              No
            </Button>
          </div>
        )}
        {type === "bot" && uploadPldYesNoButton && (
          <div className="flex mt-5 ml-7 gap-5">
            <Button
              className="text-[#74BCFF] bg-none border border-[#858698] border-opacity-20 min-w-[80px] "
              onClick={uploadPldYesClick}
            >
              Yes
            </Button>
            <Button
              onClick={noClick}
              className="text-[#74BCFF] bg-none border border-[#858698] border-opacity-20 min-w-[80px] "
            >
              No
            </Button>
          </div>
        )}
      </div>

      <Modal
        open={openUploadModal}
        className="!p-2 w-[610px] py-6 md:!py-6 2xl:!p-3 md:!p-3 md:!px-5 max-w-[60%] lg:!max-w-[50%]
                 max-h-[88vh] 2xl:h-fit xl:h-fit md:h-fit sm:h-fit sm:max-h-fit parcel-intelligence-modal bg-[#181921] rounded-xl"
        hideClose
      >
        {uploadingLoader && <LoaderComponent />}
        <div className="flex flex-col min-w-0 items-center gap-2 w-[92%] mx-auto">
          <div className="w-full flex justify-between items-center pb-4 border-b border-0 border-[#FFFFFF]">
            <h2 className="text-left text-base font-bold ">PLD Upload</h2>
            <IconButton
              context="secondary"
              aria-label="Close"
              onClick={onCloseUploadModal}
            >
              <XMarkIcon />
            </IconButton>
          </div>
          <UploadFile
            accept={{
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx", ".csv"],
            }}
            className={{
              container: "w-full",
              uploadFile: "!max-w-full",
            }}
            onSelection={handleFileSelection}
            value={uploadData?.file ? [uploadData?.file] : []}
            showLoader={fileProcessing}
            isError={errors.includes("file") ? "isError" : ""}
            isMultiple={false}
            setUploadData={setUploadData}
          />
          <Button
            onClick={uploadHandler}
            className="continue-button text-[#EBEBEB99] xl:text-md md:text-sm  font-medium 2xl:w-[142px] md:w-[110px] w-[110px] disabled:bg-none disabled:text-white disabled:border disabled:opacity-50 "
            disabled={!uploadData?.file || fileProcessing}
          >
            Continue
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Message;
