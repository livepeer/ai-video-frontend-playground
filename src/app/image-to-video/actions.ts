"use server";

export async function imageToVideo(prevState: any, formData: FormData) {
  const image = formData.get("image") as File;
  const motionBucketID = formData.get("motion_bucket_id");

  const newFormData = new FormData();
  newFormData.append("image", image);
  newFormData.append(
    "model_id",
    "stabilityai/stable-video-diffusion-img2vid-xt"
  );
  if (motionBucketID) newFormData.append("motion_bucket_id", motionBucketID);

  const url = process.env.AI_VIDEO_API_URL + "/image-to-video";
  const res = await fetch(url, {
    method: "POST",
    body: newFormData,
  });

  return await res.json();
}
