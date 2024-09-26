export const downloadFileFromBlob = async (
  url,
  fileName = "",
  authorizationToken = "",
  method = "GET",
  body = {}
) => {
  try {
    const options = {
      method,
      headers: new Headers({
        Authorization: authorizationToken,
      }),
    };

    if (method === "POST") {
      options.headers = new Headers({
        Authorization: authorizationToken,
        "Content-Type": "application/json",
      });
      options.body = body;
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      console.error("Error fetching download:", response.error);
    } else {
      const blob = await response.blob();

      if (blob && !blob.error) {
        // Create a hidden anchor element, build the url and download it by clicking on it
        var objectUrl = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = objectUrl;
        a.download = fileName;
        // we need to append the element to the dom and click like this for firefox
        document.body.appendChild(a);
        a.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        a.remove(); //afterwards we remove the element again
        URL.revokeObjectURL(objectUrl);
      } else {
        console.error("Error fetching download:", blob.error);
      }
    }
  } catch (error) {
    console.error("Error fetching download:", error);
  }
};
