import { forwardRef, useState } from "react";
import { Loader2, Share2 } from "lucide-react";
import { User } from "../../store/useUserStore";
import { useShareSubtitleDoc } from "../../hooks/hooks";
import { useAuthContext } from "../../context/AuthContext";
import { AccessType } from "../../store/useSubtitleDocStore";

interface ShareModalProps {
  docId: string;
  onClose: () => void;
  users: User[];
  usersLoading: boolean;
}

const ShareModal = forwardRef<HTMLDialogElement, ShareModalProps>(
  ({ docId, onClose, users, usersLoading }, ref) => {
    const { shareSubtitleDoc } = useShareSubtitleDoc();
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [accessType, setAccessType] = useState<AccessType>("VIEW");
    const [isSharing, setIsSharing] = useState(false);

    const { authUser: currentUser } = useAuthContext();

    const handleShare = async () => {
      if (!selectedUser) {
        return alert("Please select a user.");
      }
      setIsSharing(true);

      try {
        await shareSubtitleDoc(docId, selectedUser, accessType);
        onClose();
      } catch (err) {
        console.error("Failed to share doc:", err);
      } finally {
        setIsSharing(false);
      }
    };

    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Share Document</h3>

          <label className="block mt-4 text-sm">Select User:</label>
          {usersLoading ? (
            <p>Loading users...</p>
          ) : (
            <select
              value={selectedUser || ""}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="select select-bordered w-full mt-1"
              disabled={isSharing}
            >
              <option value="" disabled>
                Select a user
              </option>
              {users
                .filter((user) => user.id !== currentUser?.id)
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName} ({user.username})
                  </option>
                ))}
            </select>
          )}

          <label className="block mt-4 text-sm">Access Type:</label>
          <select
            value={accessType}
            onChange={(e) => setAccessType(e.target.value as AccessType)}
            className="select select-bordered w-full mt-1"
            disabled={isSharing}
          >
            <option value="VIEW">Viewer</option>
            <option value="EDIT">Editor</option>
          </select>

          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary relative flex items-center justify-center gap-2"
              onClick={handleShare}
              disabled={isSharing}
            >
              Share
              {isSharing ? (
                <Loader2 size={16} className="animate-spin text-white" />
              ) : (
                <Share2 size={16} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);

export default ShareModal;
