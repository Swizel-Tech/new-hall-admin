import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Camera } from "react-huge-icons/outline";

interface ImageUploaderProps {
  onImagesSelected: (images: File[]) => void;
  onReset: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesSelected,
  onReset,
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(files);
    onImagesSelected(files);
  };

  useEffect(() => {
    if (onReset) {
      setSelectedImages([]);
    }
  }, [onReset]);

  return (
    <div className="bg-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        exit={{ scale: 0 }}
        className="bg-white"
      >
        <label className="inline-block bg-white">
          <input
            type="file"
            name="picture"
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
            multiple
          />
          <div className="inset-0 flex h-[80px] bg-white w-[40px] items-center  justify-center rounded-[10px] lg:w-[180px]">
            <Camera fontSize={40} className="bg-white" />
          </div>
        </label>
      </motion.div>
      <div className="grid bg-white grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Selected ${index}`}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
