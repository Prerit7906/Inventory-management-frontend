import React from 'react'
import Barcode from 'react-barcode'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


const Barcodes = ({value}) => {
  const [product, setProduct] = useState('');
  useEffect(() => {
    fetchProduct();
  }, [])
  const fetchProduct=async ()=>{
    const response=await fetch(`http://localhost:9090/api/v1.0/products/all/${value}`);
    const responseData=await response.json();
    if(response.ok){
      setProduct(`Id: ${responseData.productId}, Name: ${responseData.productName} `);
    }
  };
  return (
    <div style={{display:"flex",alignItems:"center", justifyContent:"center", flexDirection:"column"}} >
        <Link to={`/products/${parseInt(value)}`}>Go back</Link>
        <Barcode value={product}></Barcode>
    </div>
  )
}

export default Barcodes