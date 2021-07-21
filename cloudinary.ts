

const cloudinary = require("cloudinary");
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export = {
  upload: async (file) => {
    return new Promise<{status: boolean, url: string}>(async (resolve, reject) => {
      try {
        const response = await cloudinary.uploader.upload(file.path, {
          folder: "avatar",
        });

        resolve({ status: true, url: response.secure_url });
      } catch (error) {
        reject({ status: false, url: error.message });
      }
    });
  },
}; 
