"use server";

export async function imageToVideo(prevState: any, formData: FormData) {
  formData.append("model_id", "stabilityai/sd-turbo");

  const image = formData.get("image") as File;

  const newFormData = new FormData();
  newFormData.append("image", image);
  newFormData.append(
    "model_id",
    "stabilityai/stable-video-diffusion-img2vid-xt"
  );

  const url = process.env.AI_VIDEO_API_URL + "/image-to-video";
  const res = await fetch(url, {
    method: "POST",
    body: newFormData,
  });

  return await res.json();
}
