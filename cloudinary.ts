import cloudinary from "cloudinary";
import streamifier from "streamifier";
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export = {
  upload: async (buffer) => {
    return new Promise<{ status: boolean; url: string }>(
      async (resolve, reject) => {
        const response = cloudinary.v2.uploader.upload_stream(
          {
            folder: "Avatar",
          },
          (error: any, result: any) => {
            if (result) {
              resolve({ status: true, url: result.secure_url });
            } else {
              reject({ status: false, url: error.message });
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(response);
      }
    );
  },
  destroy: async (imageId: string) => {
    return new Promise<{ status: boolean; url: string }>(
      async (resolve, reject) => {
        cloudinary.v2.uploader.destroy(`avatar/${imageId}`, (error: any, result: any) => {
            if (result) {
              resolve({ status: true, url: result.secure_url });
            } else {
              reject({ status: false, url: error.message });
            }
          }
        );
      }
    );
  }
};
