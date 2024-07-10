import React from 'react'
import {ImageUploadAPI} from "../config";

export function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

export async function uploadImagesToImgbb(mediaFiles) {
    let imagesArray = [];
    console.log("uploading");
    for (const media of mediaFiles) {
        const base64 = await toBase64(media.file);
        const formData = new FormData();
        formData.append('image', base64);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${ImageUploadAPI}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                console.log('Image uploaded successfully:', data);
                const imageAfterUpload = {
                    alt: data.data.title,
                    urlImage: data.data.display_url,
                    aspect: data.data.width >= data.data.height ? 'horizontal' : 'vertical'
                };
                imagesArray.push(imageAfterUpload);
            } else {
                console.error('Error uploading image:', data.error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    console.log("done");
    return imagesArray;
}
