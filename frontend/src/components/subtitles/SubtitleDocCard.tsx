import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SquarePen, Trash2, Users } from "lucide-react";
import ContributorList from "./contributors/ContributorList";
import AnimatedButton from "../common/ExpandableButton";
import ConfirmationModal from "../common/ConfirmationModal";
import ShareModal from "../common/ShareModal";
import { useDeleteSubtitleDoc } from "../../hooks/subtitles/useDeleteSubtitleDoc";
import { User } from "../../store/useUserStore";
import { SubtitleAccess } from "../../store/useSubtitleDocStore";

interface SubtitleDocProps {
  id: string;
  name: string;
  createdBy: string;
  access: SubtitleAccess[];
  users: User[];
  usersLoading: boolean;
}

const SubtitleDocCard = ({
  id,
  name,
  createdBy,
  access,
  users,
  usersLoading,
}: SubtitleDocProps) => {
  const { deleteSubtitleDoc } = useDeleteSubtitleDoc();
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const shareModalRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const openDeleteModal = () => deleteModalRef.current?.showModal();
  const closeDeleteModal = () => deleteModalRef.current?.close();

  const openShareModal = () => shareModalRef.current?.showModal();
  const closeShareModal = () => shareModalRef.current?.close();

  const handleDelete = async () => {
    try {
      await deleteSubtitleDoc(id);
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete subtitle document:", error);
    }
  };

  const handleUpdate = () => {
    navigate(`/subtitles/${id}`);
  };

  return (
    <div className="relative bg-base-100 shadow-md rounded-lg w-full h-full p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-0.5">
        <h3
          className="text-sm font-semibold truncate max-w-full overflow-hidden whitespace-nowrap mb-2"
          title={name}
        >
          {name}
        </h3>
        <button
          onClick={openShareModal}
          className="transition-colors text-gray-500 hover:text-primary cursor-pointer"
        >
          <Users size={20} />
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Created by {createdBy}
      </p>

      <ContributorList access={access} docId={id} />

      <div className="flex justify-between gap-2">
        <AnimatedButton
          icon={<SquarePen size={20} />}
          text="Update"
          className="btn-accent"
          onClick={handleUpdate}
        />
        <AnimatedButton
          icon={<Trash2 size={20} />}
          text="Delete"
          className="btn-error"
          onClick={openDeleteModal}
        />
      </div>

      <ConfirmationModal
        ref={deleteModalRef}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
      <ShareModal
        ref={shareModalRef}
        docId={id}
        onClose={closeShareModal}
        users={users}
        usersLoading={usersLoading}
      />
    </div>
  );
};

export default SubtitleDocCard;
