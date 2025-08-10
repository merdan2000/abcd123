import { useState } from 'react';
import { LatLngBounds } from 'leaflet';
import MapComponent from './MapComponent';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function App() {
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelect = (b: LatLngBounds) => {
    setBounds(b);
    setModalOpen(true);
  };

  const closeModal = () => {
  setModalOpen(false);
  setTimeout(() => {
    (document.activeElement as HTMLElement)?.blur();
  }, 50);
};


  return (
    <>
      <MapComponent selectedBounds={bounds} onSelect={handleSelect} />
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        shouldReturnFocusAfterClose={false}
        shouldFocusAfterRender={false}
        ariaHideApp={false} //  чтобы не мешало фокусу
        style={{
          content: {
            top: '20%',
            left: '20%',
            right: '20%',
            bottom: 'auto',
          },
    }}
>

        <h2>Выделенная область</h2>
        {bounds && (
          <>
            <p>
              Юго-запад: {bounds.getSouthWest().lat.toFixed(5)}, {bounds.getSouthWest().lng.toFixed(5)}
            </p>
            <p>
              Северо-восток: {bounds.getNorthEast().lat.toFixed(5)}, {bounds.getNorthEast().lng.toFixed(5)}
            </p>
          </>
        )}
        <button onClick={closeModal}>Закрыть</button>
      </Modal>
    </>
  );
}
