import { createClient } from "@supabase/supabase-js";

export interface Comment {
  id: string;
  member_id: string;
  x_handle: string;
  message: string;
  created_at: string;
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const database = {
  // Get all comments for a team member
  getComments: async (memberId: string): Promise<Comment[]> => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("member_id", memberId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching comments:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getComments:", error);
      return [];
    }
  },

  // Add a comment for a team member
  addComment: async (
    memberId: string,
    xHandle: string,
    message: string
  ): Promise<Comment | null> => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            member_id: memberId,
            x_handle: xHandle || "Anonymous",
            message,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error adding comment:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in addComment:", error);
      return null;
    }
  },

  // Get total appreciation count for a member
  getAppreciationCount: async (memberId: string): Promise<number> => {
    try {
      const { count, error } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("member_id", memberId);

      if (error) {
        console.error("Error getting count:", error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error("Error in getAppreciationCount:", error);
      return 0;
    }
  },

  // Get progress percentage (0-100)
  getProgressPercentage: async (memberId: string): Promise<number> => {
    const count = await database.getAppreciationCount(memberId);
    return Math.min(count, 100); // 1 comment = 1%, max 100%
  },

  // Subscribe to real-time updates
  subscribeToComments: (
    memberId: string,
    callback: (comments: Comment[]) => void
  ) => {
    const subscription = supabase
      .channel(`comments:${memberId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `member_id=eq.${memberId}`,
        },
        async () => {
          // Fetch updated comments
          const comments = await database.getComments(memberId);
          callback(comments);
        }
      )
      .subscribe();

    return subscription;
  },

  // Update share count
  updateShareCount: async (commentId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from("comments")
        .update({ share_count: supabase.rpc("increment_share_count") })
        .eq("id", commentId);

      if (error) {
        console.error("Error updating share count:", error);
      }
    } catch (error) {
      console.error("Error in updateShareCount:", error);
    }
  },

  // Mark as shared on X
  markAsSharedOnX: async (commentId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from("comments")
        .update({ is_shared_on_x: true })
        .eq("id", commentId);

      if (error) {
        console.error("Error marking as shared:", error);
      }
    } catch (error) {
      console.error("Error in markAsSharedOnX:", error);
    }
  },

  // Get all comments (for analytics)
  getAllComments: async (): Promise<Comment[]> => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching all comments:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getAllComments:", error);
      return [];
    }
  },
};

