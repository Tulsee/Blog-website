import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageFileUpladingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageFileUploadError("Please Select any Image");
        return;
      }
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTrack = uploadBytesResumable(storageRef, file);
      uploadTrack.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadingProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError(
            "Could not upload image (Image should be less than 2MB)"
          );
          setImageFileUploadingProgress(null);
        },
        () => {
          getDownloadURL(uploadTrack.snapshot.ref).then((downloadURL) => {
            setImageFileUploadingProgress(null);
            setImageFileUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("Image upload failed");
      setImageFileUploadingProgress(null);
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized" disabled>
              Select a category
            </option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nodejs">Node.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            size="sm"
            onClick={handleUploadImage}
            disabled={imageFileUpladingProgress}
          >
            {imageFileUpladingProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageFileUpladingProgress}
                  text={`${imageFileUpladingProgress}`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="Blog Image"
            className="w-full h-72 object-cover "
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
