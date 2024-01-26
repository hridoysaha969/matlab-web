import classes from "@/styles/notice.module.css";
import { useState } from "react";
import { storage } from "@/config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function AddImage() {
  const [imageUpload, setImageUpload] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadImage = (e) => {
    e.preventDefault();
    if (imageUpload == null) {
      setError("Please select image first");
    } else {
      setLoading(true);
      const imageRef = ref(storage, `sliderImg/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then(() => {
        setError("");
        setLoading(false);
        setImageUpload(null);
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageUpload(file);
  };

  return (
    <div className={classes.notice__container}>
      <div className="container">
        <h2 className={classes.notice__title}>Add Image</h2>
        <form onSubmit={uploadImage}>
          <div className={classes.input__wrap}>
            <div>
              <div className={classes.label__wrapper}>
                <label htmlFor="fileInput" className={classes.custom__button}>
                  Select File
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  accept=".png, .jpg, .jpeg" // Add the file types you want to accept
                />
              </div>

              {imageUpload && (
                <p className={classes.file__name}>
                  Selected File: {imageUpload.name}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={classes.btn__submit}
            disabled={loading}
          >
            Upload
          </button>

          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddImage;
