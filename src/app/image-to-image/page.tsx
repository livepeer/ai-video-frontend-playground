"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { imageToImage } from "./actions";

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
  "runwayml/stable-diffusion-v1-5",
  "stabilityai/stable-diffusion-xl-base-1.0",
  "prompthero/openjourney-v4",
];

const ImageToImageBox = () => {
  const [modelID, setModelID] = useState(MODELS[0]);
  const [inputImageUrl, setInputImageUrl] = useState("");

  const { pending } = useFormStatus();
  const [imageResponse, formAction] = useFormState(imageToImage, null);

  const handleModelIDChange = (event: any) => {
    setModelID(event.target.value as string);
  };

  const onUpload = (event: any) => {
    if (event.target.files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      setInputImageUrl(url);
    }
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
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload Image
        <VisuallyHiddenInput
          name="image"
          type="file"
          required={true}
          onChange={onUpload}
        />
      </Button>
      {inputImageUrl && <img src={inputImageUrl} />}
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
        label="strength"
        variant="outlined"
        name="strength"
        type="text"
      />
      <Button component="label" variant="contained" disabled={pending}>
        Generate Image
        <VisuallyHiddenInput type="submit" />
      </Button>
      {imageResponse && <img src={imageResponse.images[0].url} />}
    </form>
  );
};

export default function Page() {
  return (
    <div>
      <ImageToImageBox />
    </div>
  );
}
