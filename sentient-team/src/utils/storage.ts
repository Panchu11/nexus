export interface Comment {
  id: string;
  xHandle: string;
  message: string;
  timestamp: number;
}

const STORAGE_KEY_PREFIX = "sentient_team_";

export const storage = {
  // Get all comments for a team member
  getComments: (memberId: string): Comment[] => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}${memberId}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading comments:", error);
      return [];
    }
  },

  // Add a comment for a team member
  addComment: (memberId: string, xHandle: string, message: string): Comment => {
    if (typeof window === "undefined") throw new Error("Storage not available");
    
    const comments = storage.getComments(memberId);
    const newComment: Comment = {
      id: `${Date.now()}-${Math.random()}`,
      xHandle: xHandle || "Anonymous",
      message,
      timestamp: Date.now(),
    };
    
    comments.push(newComment);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${memberId}`, JSON.stringify(comments));
    return newComment;
  },

  // Get total appreciation count for a member
  getAppreciationCount: (memberId: string): number => {
    return storage.getComments(memberId).length;
  },

  // Get progress percentage (0-100)
  getProgressPercentage: (memberId: string): number => {
    const count = storage.getAppreciationCount(memberId);
    return Math.min(count, 100); // 1 comment = 1%, max 100%
  },

  // Clear all data (for testing)
  clearAll: () => {
    if (typeof window === "undefined") return;
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  },
};

