import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(
  process.env.CLOUDINARY_CLOUD_NAME,
  "process.env.CLOUDINARY_CLOUD_NAME"
);

// cloudinary.config({
//   cloud_name: "abhishek734",
//   api_key: "829168214983188",
//   api_secret: "suuOLMFOU9CToe3NuCVtAGxonw0",
// });

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
    //file is uploaded
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath); //remove the locally saved temp file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
