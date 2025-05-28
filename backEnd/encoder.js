import imageToBase64 from "image-to-base64"

imageToBase64("https://images.rawpixel.com/image_png_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA0L2pvYjk3MC1lbGVtZW50LTA4NS1wLnBuZw.png")
    .then(
        (response) => {
            console.log(response)
        }
    )
    .catch(
        (error) => {
            console.log(error)
        }
    )