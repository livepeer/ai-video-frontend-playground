"use server";

export async function textToImage(prevState: any, formData: FormData) {
  const modelID = formData.get("model_id");
  const prompt = formData.get("prompt");
  const height = formData.get("height");
  const width = formData.get("width");
  const seed = formData.get("seed");

  const data = {
    model_id: modelID ? modelID : "",
    prompt,
    height: height ? Number(height) : null,
    width: width ? Number(width) : null,
    seed: seed ? Number(seed) : null,
  };

  const url = process.env.AI_VIDEO_API_URL + "/text-to-image";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}
