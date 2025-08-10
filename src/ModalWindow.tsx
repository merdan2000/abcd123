import Modal from 'react-modal';
import { LatLngBounds } from 'leaflet';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  bounds: LatLngBounds | null;
};

const ModalWindow = ({ isOpen, onClose, bounds }: Props) => {
  if (!bounds) return null;

  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Selected Area">
      <h2>Координаты области</h2>
      <p>Юго-запад: {sw.lat.toFixed(5)}, {sw.lng.toFixed(5)}</p>
      <p>Северо-восток: {ne.lat.toFixed(5)}, {ne.lng.toFixed(5)}</p>
      <button onClick={onClose}>Закрыть</button>
    </Modal>
  );
};

export default ModalWindow;
