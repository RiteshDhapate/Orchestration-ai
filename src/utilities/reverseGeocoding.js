export const reverseGeocoding = async ({ lat = 0, lng = 0 }) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_GEOCODE_API_KEY}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      if (
        data.results[0].address_components &&
        data.results[0].address_components.length > 0
      ) {
        const addressObj = {};
        data.results[0].address_components.forEach((address) => {
          if (address.types.includes("locality")) {
            addressObj.city = address.long_name;
          }
          if (address.types.includes("administrative_area_level_1")) {
            addressObj.state = address.short_name;
          }
          if (address.types.includes("postal_code")) {
            addressObj.zip = address.long_name;
          }
        });
        return addressObj;
      }
    } else {
      throw new Error("No results found for geocoding");
    }
  } catch (error) {
    console.error("Geocoding failed:", error);
  }
};
