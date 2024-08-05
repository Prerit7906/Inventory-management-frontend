import React from 'react'
import Barcode from 'react-barcode'
import { Link } from 'react-router-dom'

const Barcodes = ({value}) => {
  return (
    <div style={{display:"flex",alignItems:"center", justifyContent:"center", flexDirection:"column"}} >
        <Link to={`/products/${parseInt(value)}`}>Go back</Link>
        <Barcode value={value}></Barcode>
    </div>
  )
}

export default Barcodes