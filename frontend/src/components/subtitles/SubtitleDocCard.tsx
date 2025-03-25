import { useRef } from "react";
import { Trash2 } from "lucide-react";
import ContributorList from "./ContributorList";
import { useDeleteSubtitleDoc } from "../../hooks/hooks";

interface SubtitleDocProps {
  id: string;
  name: string;
  createdBy: string;
  contributors: string[];
}

const SubtitleDocCard = ({
  id,
  name,
  createdBy,
  contributors,
}: SubtitleDocProps) => {
  const { deleteSubtitleDoc } = useDeleteSubtitleDoc();
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => modalRef.current?.showModal();
  const closeModal = () => modalRef.current?.close();

  const handleDelete = async () => {
    await deleteSubtitleDoc(id);
    closeModal();
  };

  return (
    <div className="bg-base-100 shadow-md rounded-lg w-full h-full p-4 flex flex-col justify-between">
      <h3 className="text-sm font-semibold text-center">{name}</h3>
      <p className="text-xs text-gray-500 text-center">
        Created by {createdBy}
      </p>
      <ContributorList contributors={contributors} />

      <button
        className="btn btn-error btn-sm mt-4 flex items-center gap-2 self-center"
        onClick={openModal}
      >
        <Trash2 size={20} /> Delete
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete this subtitle document?
          </p>
          <div className="modal-action">
            <button onClick={handleDelete} className="btn btn-error">
              Delete
            </button>
            <button onClick={closeModal} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SubtitleDocCard;
