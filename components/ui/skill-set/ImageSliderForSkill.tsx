import React, { useState } from 'react';
import { styled } from '@mui/system';
import NextImage from 'next/image'

interface ContainerProps {
  objectCount: number;

}

const Container = styled('div')<ContainerProps>({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '200px', // Set the desired height for the container
});

interface SliderProps {
  selectedObject: number | null;
  containerWidth: number;
}

const Slider = styled('div')<SliderProps>(({ selectedObject, containerWidth }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: selectedObject
    ? `translateX(calc(-50% + ${selectedObject * (containerWidth / 2)}px))`
    : 'translateX(-50%)',
  transition: 'transform 0.5s',
  animation: '$slideAnimation 0.5s forwards',
}));

interface ObjectProps {
  containerWidth: number;
  objectCount: number;
}

const Object = styled('div')<ObjectProps>(({ containerWidth, objectCount }) => ({
  width: '40px', // Set the desired width for the objects
  height: '40px', // Set the desired height for the objects
  borderRadius: '50%',
  margin: `0 ${containerWidth / (objectCount * 2)}px`, // Dynamically adjust the margin
  background: '#ccc', // Set the desired background color for the objects
  cursor: 'pointer',
}));

// const Image = styled(NextImage)({
//   maxWidth: '100%',
//   height: 'auto',
// });

interface IImageSlider {
  objectCount: number;
  ref: (node?: Element | null | undefined) => void
}

const ImageSlider = ({ objectCount }:IImageSlider) => {
  const [selectedObject, setSelectedObject] = useState<number | null>(null);
  const containerWidth = 100 / objectCount; // Calculate the width of each object in percentage

  const handleObjectClick = (objectIndex: number) => {
    setSelectedObject(objectIndex);
  };

  return (
    <Container objectCount={objectCount}>
      <Slider selectedObject={selectedObject} containerWidth={containerWidth}>
        <NextImage src="/images/about/pixl_dp.png" alt="Slider Image" width={130} height={180} />
      </Slider>
      <div>
        {[...Array(objectCount)].map((_, index) => (
          <Object
            key={index}
            containerWidth={containerWidth}
            objectCount={objectCount}
            onClick={() => handleObjectClick(index)}
          />
        ))}
      </div>
    </Container>
  );
};

export default ImageSlider;