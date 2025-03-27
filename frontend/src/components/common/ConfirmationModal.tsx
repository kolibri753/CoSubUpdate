import { forwardRef } from "react";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = forwardRef<HTMLDialogElement, ConfirmationModalProps>(
  ({ onConfirm, onCancel }, ref) => (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p className="py-4">
          Are you sure you want to delete this subtitle document?
        </p>
        <div className="modal-action">
          <button onClick={onCancel} className="btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-error">
            Delete
          </button>
        </div>
      </div>
    </dialog>
  )
);

export default ConfirmationModal;
