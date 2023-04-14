import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react"; // Importing Chakra UI components
import axios from "axios"; // Importing axios library for making HTTP requests
import React, { ChangeEvent, FormEvent, useRef, useState } from "react"; // Importing necessary React components

interface FormData {
  service: string;
  prompt: string;
  image: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    service: "",
    prompt: "",
    image: "",
  }); // Initializing formData state with empty service, prompt, and image

  const inputRef = useRef<HTMLInputElement>(null); // Creating a reference to the input element for selecting images

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value })); // Updates formData state with the new values of service and prompt input fields
  };

  const handleImageChange = () => {
    console.log("handleImageChange called");
    const file = inputRef.current?.files?.[0]; // Gets the first file in the input element
    if (file) {
      const reader = new FileReader(); // Creates a new instance of FileReader API
      reader.readAsDataURL(file); // Reads the selected image file as a data URL
      reader.onload = () => {
        const base64data = reader.result as string; // Extracts the base64 data from the FileReader result
        console.log(base64data);
        setFormData((prevFormData) => ({ ...prevFormData, image: base64data })); // Updates formData state with the new value of the image field
      };
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(formData);
      await axios.post("http://localhost:8080/api/post", formData); // Sends a POST request to the specified endpoint with the formData object as the payload
    } catch (error) {
      console.error(error);
    }
  };

  const { service, prompt } = formData;

  return (
    <Box p="6">
      <Heading as="h1" size="xl" mb="4">
        Upload an image
      </Heading>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Stack spacing="4">
          <FormControl id="service" isRequired>
            <FormLabel>Service:</FormLabel>
            <Input
              type="text"
              name="service"
              value={service}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="prompt">
            <FormLabel>Prompt:</FormLabel>
            <Input
              type="text"
              name="prompt"
              value={prompt}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="image" isRequired>
            <FormLabel>Image:</FormLabel>
            <Input
              margin={2}
              type="file"
              name="image"
              accept="image/*"
              ref={inputRef}
              onChange={handleImageChange}
            />
          </FormControl>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default App;
