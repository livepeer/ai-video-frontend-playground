"use server";

export async function imageToImage(prevState: any, formData: FormData) {
  const modelID = formData.get("model_id");
  const prompt = formData.get("prompt") as string;
  const image = formData.get("image") as File;
  const strength = formData.get("strength");
  const numImagesPerPrompt = formData.get("num_images_per_prompt");

  const newFormData = new FormData();
  newFormData.append("prompt", prompt);
  newFormData.append("image", image);
  if (modelID) newFormData.append("model_id", modelID);
  if (strength) newFormData.append("strength", strength);
  if (numImagesPerPrompt)
    newFormData.append("num_images_per_prompt", numImagesPerPrompt);

  const url = process.env.AI_VIDEO_API_URL + "/image-to-image";
  const res = await fetch(url, {
    method: "POST",
    body: newFormData,
  });

  return await res.json();
}
