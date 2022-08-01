export const uploadService = {
  uploadImg
}
async function uploadImg(ev) {
  // console.log(ev.target.files);///undefiend
  const CLOUD_NAME = "noambar"
  const UPLOAD_PRESET = "iqikctdx"
  // const UPLOAD_PRESET = "v1658617052"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData();
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('file', ev.target.files[0])

  // return fetch(UPLOAD_URL, {
  //   method: 'POST',
  //   body: formData
  // })
  //   .then(res => res.json())
  //   .then(res => {
  //     return res
  //   })
  //   .catch(err => console.error(err))

  try {
    const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
    // const elImg = document.createElement('img');
    const { url } = await res.json()
    return url
    // elImg.src = url;
    // document.body.append(elImg);
} catch (err) {
    console.error('ERROR!', err)
}

}

