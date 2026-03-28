require('dotenv').config({ path: '.env.local' });
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function testUpload() {
  console.log("Testing Cloudinary upload...");
  const buffer = Buffer.from('hello world', 'utf8');

  try {
    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "raw" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });
    console.log("Upload successful:", upload.secure_url);
  } catch (err) {
    console.error("Upload failed:", err);
  }
}

testUpload();
