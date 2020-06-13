import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Header } from './header';
import { colors } from './theme';
import './example.css'
// import { smallDevice, largeDevice } from './utils';

function ExampleWithLightbox({ photos, renderPageNumbers }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);

    console.log(photo)
    console.log(event)
    setViewerIsOpen(true);
  }, []);

  const CustomHeader = ({ innerProps, isModal }) => isModal ? (
    <div {...innerProps}>
      // your component internals
      <p>mamamamaiamai</p>
    </div>
  ) : null;

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const navButtonStyles = base => ({
    ...base,
    backgroundColor: 'white',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.18)',
    color: colors.N60,
  
    '&:hover, &:active': {
      backgroundColor: 'white',
      color: colors.N100,
      opacity: 1,
    },
    '&:active': {
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.14)',
      transform: 'scale(0.96)',
    },
  });

  return (
    <div>
      {/* <h2>Using with a Lightbox component</h2> */}
      <Gallery photos={photos} onClick={openLightbox} />
      <ul id="page-numbers">{renderPageNumbers}</ul>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            {/* <Carousel
             components={{ Header:  CustomHeader }}
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            /> */}
             <Carousel
                currentIndex={currentImage}
                components={{ Footer: null, Header }}
                views={photos}
                styles={{
                  container: base => ({
                    ...base,
                    height: '100vh',
                  }),
                  view: base => ({
                    ...base,
                    alignItems: 'center',
                    display: 'flex ',
                    height: 'calc(100vh - 54px)',
                    justifyContent: 'center',

                    // [largeDevice]: {
                    //   padding: 20,
                    // },

                    '& > img': {
                      maxHeight: 'calc(100vh - 94px)',
                    },
                  }),
                  navigationPrev: navButtonStyles,
                  navigationNext: navButtonStyles,
                }}
              />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default ExampleWithLightbox;
