export const geocodeLocation = async ({
  street = "",
  city = "",
  state = "",
  zip = "",
  country = "",
}) => {
  let address = "";

  if (street) {
    address = street;
  }

  if (city) {
    address = address ? `${address}, ${city}` : city;
  }

  if (state) {
    address = address ? `${address}, ${state}` : state;
  }

  if (zip) {
    address = address ? `${address}, ${zip}` : zip;
  }

  if (country) {
    address = address ? `${address}, ${country}` : country;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_GEOCODE_API_KEY}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const place =
        data.results.filter((result) =>
          result.types.includes("administrative_area_level_1")
        )[0] || null;

      return {
        coords: place
          ? place.geometry.location
          : data.results[0].geometry.location,
        place_id: place ? place.place_id : data.results[0].place_id,
      };
    } else {
      throw new Error("No results found for geocoding");
    }
  } catch (error) {
    console.error("Geocoding failed:", error);
  }
};
