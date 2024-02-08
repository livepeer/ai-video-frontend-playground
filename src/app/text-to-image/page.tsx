"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { textToImage } from "./actions";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MODELS = [
  "stabilityai/sd-turbo",
  "stabilityai/sdxl-turbo",
  "runwayml/stable-diffusion-v1-5",
  "stabilityai/stable-diffusion-xl-base-1.0",
  "prompthero/openjourney-v4",
];

const TextToImageBox = () => {
  const [modelID, setModelID] = useState(MODELS[0]);
  const { pending } = useFormStatus();
  const [imageResponse, formAction] = useFormState(textToImage, null);

  const handleModelIDChange = (event: any) => {
    setModelID(event.target.value as string);
  };

  return (
    <form
      className="flex flex-col items-center justify-center p-24 space-y-4"
      action={formAction}
    >
      <TextField
        className="w-1/4"
        id="outlined-multiline-static"
        label="prompt"
        multiline
        rows={4}
        name="prompt"
        type="text"
      />
      <Box sx={{ minWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel>Model ID</InputLabel>
          <Select
            label="model_id"
            name="model_id"
            value={modelID}
            type="text"
            onChange={handleModelIDChange}
          >
            {MODELS.map((modelID) => (
              <MenuItem key={modelID} value={modelID}>
                {modelID}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="outlined-basic"
        label="height"
        variant="outlined"
        name="height"
        type="number"
      />
      <TextField
        id="outlined-basic"
        label="width"
        variant="outlined"
        name="width"
        type="number"
      />
      <TextField
        id="outlined-basic"
        label="seed"
        variant="outlined"
        name="seed"
        type="number"
      />
      <TextField
        id="outlined-basic"
        label="num_images_per_prompt"
        variant="outlined"
        name="num_images_per_prompt"
        type="number"
      />
      <Button component="label" variant="contained" disabled={pending}>
        Generate Image
        <VisuallyHiddenInput type="submit" />
      </Button>
      {imageResponse?.error && (
        <div>
          <p>{imageResponse.error.message}</p>
        </div>
      )}
      {imageResponse?.images.map((image: any) => (
        <div>
          <img src={image.url} />
          <p>Seed: {image.seed} </p>
        </div>
      ))}
    </form>
  );
};

export default function Page() {
  return (
    <div>
      <TextToImageBox />
    </div>
  );
}
