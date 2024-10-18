// const baseUrl='http://88.99.5.236:4080'
const baseUrl='http://localhost:4080'
// const baseUrl=''



const LoginApi=`${baseUrl}/login`;
export {LoginApi}

// const ImageUpload=`${baseUrl}/image-uploader`;
// export {ImageUpload}

const ImageUpload=`${baseUrl}/app/post-image`;
export {ImageUpload}



const AllImagesData=`${baseUrl}/getupload-img`
export {AllImagesData}

const fetchCategory=`${baseUrl}/getupload-img/category`
export {fetchCategory}


// const updateData=`${baseUrl}/update-image`
// export {updateData}


const updateData=`${baseUrl}/app/update`
export {updateData}

// const deleteDataById=`${baseUrl}/delete`
// export {deleteDataById}


const deleteDataById=`${baseUrl}/app/delete`
export {deleteDataById}

const downloadedImageCount=`${baseUrl}/app/downloads-count`
export {downloadedImageCount}