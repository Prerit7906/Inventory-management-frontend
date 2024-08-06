import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageDb } from "../firebase/firebase.js";
import { getDownloadURL, listAll, ref, deleteObject } from "firebase/storage";
import "../styles/UploadedImages.css";

const UploadedImages = () => {
  const { productId } = useParams();
  const [imgUrl, setImgUrl] = useState([]);
  const [imageRefs, setImageRefs] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

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
      setImageRefs(images.items);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [productId]);

  const handleDeleteImage = async (imageRef, index) => {
    try {
      await deleteObject(imageRef);
      const newImgUrl = [...imgUrl];
      newImgUrl.splice(index, 1);
      setImgUrl(newImgUrl);

      const newImageRefs = [...imageRefs];
      newImageRefs.splice(index, 1);
      setImageRefs(newImageRefs);
      setAlertMessage("Image deleted successfully!!");
      setTimeout(() => {
        setAlertMessage('');
      }, 4000);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
      <>
      {alertMessage && (
        <div id="alertMessage">
          {alertMessage}
          <div id="progressBar"></div>
        </div>
      )}
    <div className="uploaded-images-container">
      <Link to={`/products/${productId}`}>Go back</Link>
      <h2>Uploaded Images</h2>
      <div className="display-image">
        {imgUrl.map((url, index) => (
          <div className="each-image" key={index}>
            <img src={url} alt={`Product ${index}`} height="200px" width="200px" />
            <button onClick={() => handleDeleteImage(imageRefs[index], index)}>Delete</button>
            <br />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default UploadedImages;
