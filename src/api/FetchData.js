  
  const FetchData = async (url,setValue) =>  {
	const response= await fetch(url);
    const responseData=await response.json();
    if(response.ok)
     setValue(responseData);
    else throw new Error("Couldn't find data")
  }
  
  export default FetchData;
  