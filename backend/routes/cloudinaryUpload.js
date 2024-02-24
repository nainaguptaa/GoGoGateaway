var express = require("express");
var router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig"); // Adjust the path as necessary
const upload = multer({ dest: "uploads/" });

// // POST endpoint for multiple file uploads
// router.post("/image", upload.array("files", 10), function (req, res, next) {
//   // req.files is an array of files
//   const files = req.files;
//   let uploadPromises = files.map((file) => {
//     return cloudinary.uploader.upload(file.path, { folder: "GoGo" }); // Returns a promise
//   });

//   Promise.all(uploadPromises)
//     .then((results) => {
//       res
//         .status(200)
//         .send({
//           success: true,
//           message: "Upload successful",
//           results: results,
//         });
//     })
//     .catch((error) => {
//       res.status(500).send({
//         success: false,
//         message: "An error occurred during the uploads",
//         error: error,
//       });
//     });
// });

// Adjust the cloudinaryUpload.js route or similar file
router.post(
  "/image",
  upload.array("files", 12),
  async function (req, res, next) {
    console.log(cloudinary.config().cloud_name);
    console.log(cloudinary.config().api_key);
    console.log(cloudinary.config().api_secret);
    try {
      // req.files is an array of files
      const files = req.files;

      const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(
            file.path,
            { folder: "GOGO" },
            function (error, result) {
              if (error) {
                reject(error); // Reject the promise if there's an error
              } else {
                resolve(result); // Resolve the promise with the result
              }
            }
          );
        });
      });

      const results = await Promise.all(uploadPromises);
      res.status(200).send({
        success: true,
        message: "Uploads successful",
        results: results,
      });
    } catch (error) {
      // If any error occurs during the upload process or promise rejection
      console.error("Error occurred during uploads:", error);
      res.status(500).send({
        success: false,
        message: "An error occurred during the uploads",
        error: error,
      });
    }
  }
);

module.exports = router;
