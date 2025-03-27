import { forwardRef, useState } from "react";
import { useShareSubtitleDoc } from "../../hooks/hooks";
import { useGetUsers } from "../../hooks/hooks";

interface ShareModalProps {
  docId: string;
  onClose: () => void;
}

const ShareModal = forwardRef<HTMLDialogElement, ShareModalProps>(
  ({ docId, onClose }, ref) => {
    const { shareSubtitleDoc } = useShareSubtitleDoc();
    const { users, loading } = useGetUsers();
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [accessType, setAccessType] = useState<"view" | "edit">("view");

    const handleShare = async () => {
      if (!selectedUser) return alert("Please select a user.");
      await shareSubtitleDoc(docId, selectedUser, accessType);
      onClose();
    };

    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Share Document</h3>

          <label className="block mt-4 text-sm">Select User:</label>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <select
              value={selectedUser || ""}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="select select-bordered w-full mt-1"
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName} ({user.username})
                </option>
              ))}
            </select>
          )}

          <label className="block mt-4 text-sm">Access Type:</label>
          <select
            value={accessType}
            onChange={(e) => setAccessType(e.target.value as "view" | "edit")}
            className="select select-bordered w-full mt-1"
          >
            <option value="view">Viewer</option>
            <option value="edit">Editor</option>
          </select>

          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleShare}>
              Share
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);

export default ShareModal;
