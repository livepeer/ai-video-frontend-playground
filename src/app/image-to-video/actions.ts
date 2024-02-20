"use server";

export async function imageToVideo(prevState: any, formData: FormData) {
  const modelID = formData.get("model_id");
  const image = formData.get("image") as File;
  const height = formData.get("height");
  const width = formData.get("width");
  const motionBucketID = formData.get("motion_bucket_id");
  const seed = formData.get("seed");

  const newFormData = new FormData();
  newFormData.append("image", image);
  if (modelID) newFormData.append("model_id", modelID);
  if (height) newFormData.append("height", height);
  if (width) newFormData.append("width", width);
  if (motionBucketID) newFormData.append("motion_bucket_id", motionBucketID);
  if (seed) newFormData.append("seed", seed);

  const url = process.env.AI_VIDEO_API_URL + "/image-to-video";
  const res = await fetch(url, {
    method: "POST",
    body: newFormData,
  });

  return await res.json();
}
