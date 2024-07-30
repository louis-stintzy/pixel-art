import useStore from '../../store/store';

interface ImageModalProps {
  aspectRatio: number;
  onCancel: () => void;
}

function ImageCropper({ aspectRatio, onCancel }: ImageModalProps) {
  const fileUrl = useStore((state) => state.fileUrl);
  return (
    <div>
      <h1>ImageCropper</h1>
      <img src={fileUrl} alt="uploaded file" />
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}

export default ImageCropper;
