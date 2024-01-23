"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const TextToImageBox = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (event: any) => {
    setPrompt(event.target.value);
  };

  const onSubmit = async () => {
    const res = await fetch("/api/text-to-image", {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
        model_id: "stabilityai/sd-turbo",
      }),
    });

    const data = await res.json();

    if (data.images.length > 0) {
      setImageUrl(data.images[0].url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-24 space-y-4">
      <TextField
        className="w-1/4"
        id="outlined-multiline-static"
        label="prompt"
        multiline
        rows={4}
        onChange={onChange}
      />
      <Button component="label" variant="contained" onClick={onSubmit}>
        Generate Image
      </Button>
      <div>{imageUrl && <img src={imageUrl} />}</div>
    </div>
  );
};

export default function Page() {
  return (
    <div>
      <TextToImageBox />
    </div>
  );
}
