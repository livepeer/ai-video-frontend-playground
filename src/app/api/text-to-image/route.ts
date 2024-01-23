export async function POST(request: Request) {
  const body = await request.json();
  const url = process.env.AI_VIDEO_API_URL + "/text-to-image";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: body.prompt,
      model_id: body.model_id,
    }),
  });

  const data = await res.json();
  return Response.json(data);
}
