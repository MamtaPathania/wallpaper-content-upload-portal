const { getImagesUploadedToday } = require('./pushNotification.services');

exports.getLatestImages = (req, res) => {
  getImagesUploadedToday((error, images) => {
    if (error) {
      console.error('Error fetching images:', error);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }

    if (images.length > 0) {
      console.log(images,"===images====")
      return res.status(200).json({ success: true, images });
    } else {
      return res.status(200).json({ success: false, message: 'No new images today.' });
    }
  });
};
