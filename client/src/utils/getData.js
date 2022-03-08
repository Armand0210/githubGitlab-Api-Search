export const getData = async (url) => {
  try {
    //calling endpoint
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    //if unsuccessful show error in console.log()
    console.log(err);
  }
};
