  
  const FetchData = async (url,setValue) =>  {
	const response= await fetch(url);
    const responseData=await response.json();
     setValue(responseData);
  }
  
  export default FetchData;
  