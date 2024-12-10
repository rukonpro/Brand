import Image from 'next/image';
import React from 'react';

const ImagePreview = ({ images }) => {
    
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="border p-2 rounded">
          <Image src={image} width={200}  height={200} alt={`Preview ${index}`} className="w-full h-32 object-cover" />
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
