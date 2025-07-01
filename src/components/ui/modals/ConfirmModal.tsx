interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message = "정말 취소하시겠습니까?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-[320px] text-center">
        <p className="mb-4 text-lg font-medium">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="w-[80px] px-4 py-2 rounded bg-peach-300 hover:bg-peach-400 text-white"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="w-[80px] px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
