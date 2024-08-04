import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/ProductDetails.css";
import { imageDb } from "../firebase/firebase.js";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import UploadedImages from "./UploadedImages"; // New component for displaying images

const ProductDetails = () => {
  const { productId } = useParams();
  const numericProductId = Number(productId);
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    unitPrice: "",
    unitsInStocks: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${productId}/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
           setAlertMessage("Image Uploaded successfully :)");
      setTimeout(() => {
        setAlertMessage('');
      }, 5000);
          setFileName("");
          setImg(null); // Clear the selected image after upload
        });
      });
    }
  };

  const fetchImages = async () => {
    try {
      const listRef = ref(imageDb, `files/${productId}`);
      const images = await listAll(listRef);
      const urls = await Promise.all(
        images.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        })
      );
      setImgUrl(urls);
     
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [productId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/v1.0/products/all/${numericProductId}`
        );
        const data = await response.json();
        setProduct(data);
        setFormData({
          unitPrice: data.unitPrice,
          unitsInStocks: data.unitsInStocks,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [numericProductId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(product);
      const response = await fetch(
        `http://localhost:9090/api/v1.0/products/all/update/product/${numericProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...product,
            unitPrice: parseFloat(formData.unitPrice),
            unitsInStocks: parseInt(formData.unitsInStocks, 10),
          }),
        }
      );
      console.log(product);

      if (response.ok) {
        console.log(response);
        setIsEditing(false);
        setAlertMessage("Product updated successfully :)");
        setTimeout(() => {
          setAlertMessage('');
          navigate("/viewproducts");
        }, 4000);
      } else {
        console.error("Error updating product detail:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product details:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:9090/api/v1.0/products/all/${numericProductId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setAlertMessage(
            `Product deleted successfully!!`
          );
          setTimeout(() => {
            setAlertMessage("");
            navigate("/viewproducts"); // Redirect to product listing or another relevant page
          }, 4000);
        } else {
          setAlertMessage(
            `You cannot delete this product because it is ordered`
          );
          setTimeout(() => {
            setAlertMessage("");
          }, 4000);
          console.error("Error deleting product:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="new-cont">
      {alertMessage && (
        <div id="alertMessage">
          {alertMessage}
          <div id="progressBar"></div>
        </div>
      )}
      <div className="product-container">
        <h2>Product Details</h2>
        {isEditing ? (
          <form onSubmit={handleFormSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="unitPrice">Price</label>
              <input
                type="number"
                id="unitPrice"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="unitsInStocks">Stock</label>
              <input
                type="number"
                id="unitsInStocks"
                name="unitsInStocks"
                value={formData.unitsInStocks}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <table className="product-table">
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{product.productId}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{product.productName}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{product.description}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>${product.unitPrice.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Stock</th>
                  <td>{product.unitsInStocks}</td>
                </tr>
                <tr>
                  <th>Warehouse</th>
                  <td>{product.warehouse.warehouseName}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>{product.category.categoryName}</td>
                </tr>
              </tbody>
            </table>
            <div className="uploadImageMain">
              <button style={{ backgroundColor: "#a72222" }} onClick={() => navigate("/viewproducts")}>Go Back</button>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete} className="delete-button">
                Delete
              </button>
            </div>
          </>
        )}
        <div className="uploadImageMain">
          <label htmlFor="uploadImg">
            <FontAwesomeIcon
              icon={faUpload}
              size="2x"
              style={{
                color: "black",
                padding: "0.2rem",
                border: "4px solid black",
                borderRadius: "8px",
              }}
            />{" "}
          </label>
          <input
            style={{ display: "none" }}
            id="uploadImg"
            type="file"
            onChange={(e) => {
              setImg(e.target.files[0]);
              setFileName(e.target.files[0]?.name || "");
            }}
          />
          {fileName && <span>{fileName}</span>}
          <button onClick={handleClick} disabled={!img}>Upload</button>
          <Link to={`/products/${productId}/images`}>
            <button>View Uploaded Images</button>
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default ProductDetails;
