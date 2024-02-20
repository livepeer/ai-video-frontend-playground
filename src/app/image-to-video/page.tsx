"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { imageToVideo } from "./actions";

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
  "stabilityai/stable-video-diffusion-img2vid-xt",
  "stabilityai/stable-video-diffusion-img2vid-xt-1-1",
];

const ImageToVideoBox = () => {
  const [modelID, setModelID] = useState(MODELS[0]);
  const [inputImageUrl, setInputImageUrl] = useState("");

  const { pending } = useFormStatus();
  const [imageResponse, formAction] = useFormState(imageToVideo, null);

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
        label="motion_bucket_id"
        variant="outlined"
        name="motion_bucket_id"
        type="text"
      />
      <TextField
        id="outlined-basic"
        label="seed"
        variant="outlined"
        name="seed"
        type="number"
      />
      <Button component="label" variant="contained" disabled={pending}>
        Generate Video
        <VisuallyHiddenInput type="submit" />
      </Button>
      {imageResponse?.error && (
        <div>
          <p>{imageResponse.error.message}</p>
        </div>
      )}
      {imageResponse?.images && (
        <div>
          <video controls>
            <source src={imageResponse.images[0].url} type="video/mp4"></source>
          </video>
          <p>Seed: {imageResponse.images[0].seed}</p>
        </div>
      )}
    </form>
  );
};

export default function Page() {
  return (
    <div>
      <ImageToVideoBox />
    </div>
  );
}
