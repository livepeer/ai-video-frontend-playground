"use server";

export async function imageToImage(prevState: any, formData: FormData) {
  formData.append("model_id", "stabilityai/sd-turbo");

  const prompt = formData.get("prompt") as string;
  const image = formData.get("image") as File;

  const newFormData = new FormData();
  newFormData.append("prompt", prompt);
  newFormData.append("image", image);
  newFormData.append("model_id", "stabilityai/sd-turbo");

  const url = process.env.AI_VIDEO_API_URL + "/image-to-image";
  const res = await fetch(url, {
    method: "POST",
    body: newFormData,
  });

  return await res.json();
}
