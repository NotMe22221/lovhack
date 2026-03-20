export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          created_at: string
          hackathon_id: string | null
          id: string
          message: string
          published: boolean
          title: string
        }
        Insert: {
          created_at?: string
          hackathon_id?: string | null
          id?: string
          message: string
          published?: boolean
          title: string
        }
        Update: {
          created_at?: string
          hackathon_id?: string | null
          id?: string
          message?: string
          published?: boolean
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_hackathon_id_fkey"
            columns: ["hackathon_id"]
            isOneToOne: false
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          certificate_id: string
          certificate_type: Database["public"]["Enums"]["certificate_type"]
          created_at: string | null
          hackathon_name: string | null
          id: string
          image_url: string | null
          issued_at: string | null
          issuer_name: string | null
          pdf_url: string | null
          recipient_email: string | null
          recipient_name: string | null
        }
        Insert: {
          certificate_id: string
          certificate_type: Database["public"]["Enums"]["certificate_type"]
          created_at?: string | null
          hackathon_name?: string | null
          id?: string
          image_url?: string | null
          issued_at?: string | null
          issuer_name?: string | null
          pdf_url?: string | null
          recipient_email?: string | null
          recipient_name?: string | null
        }
        Update: {
          certificate_id?: string
          certificate_type?: Database["public"]["Enums"]["certificate_type"]
          created_at?: string | null
          hackathon_name?: string | null
          id?: string
          image_url?: string | null
          issued_at?: string | null
          issuer_name?: string | null
          pdf_url?: string | null
          recipient_email?: string | null
          recipient_name?: string | null
        }
        Relationships: []
      }
      hackathons: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          name: string
          season: number
          start_date: string | null
          status: Database["public"]["Enums"]["hackathon_status"]
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          name: string
          season?: number
          start_date?: string | null
          status?: Database["public"]["Enums"]["hackathon_status"]
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          name?: string
          season?: number
          start_date?: string | null
          status?: Database["public"]["Enums"]["hackathon_status"]
        }
        Relationships: []
      }
      judges: {
        Row: {
          hackathon_id: string
          id: string
          user_id: string
        }
        Insert: {
          hackathon_id: string
          id?: string
          user_id: string
        }
        Update: {
          hackathon_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "judges_hackathon_id_fkey"
            columns: ["hackathon_id"]
            isOneToOne: false
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_profiles: {
        Row: {
          available: boolean
          company: string | null
          created_at: string
          expertise: string | null
          id: string
          photo_url: string | null
          user_id: string
        }
        Insert: {
          available?: boolean
          company?: string | null
          created_at?: string
          expertise?: string | null
          id?: string
          photo_url?: string | null
          user_id: string
        }
        Update: {
          available?: boolean
          company?: string | null
          created_at?: string
          expertise?: string | null
          id?: string
          photo_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          github: string | null
          id: string
          linkedin: string | null
          name: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          github?: string | null
          id?: string
          linkedin?: string | null
          name?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          github?: string | null
          id?: string
          linkedin?: string | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      project_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          project_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          project_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_comments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_likes: {
        Row: {
          created_at: string
          id: string
          project_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_likes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_media: {
        Row: {
          file_name: string
          file_type: string
          file_url: string
          id: string
          media_role: string
          project_id: string
          sort_order: number
          uploaded_at: string
        }
        Insert: {
          file_name: string
          file_type: string
          file_url: string
          id?: string
          media_role?: string
          project_id: string
          sort_order?: number
          uploaded_at?: string
        }
        Update: {
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          media_role?: string
          project_id?: string
          sort_order?: number
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          ai_summary: string | null
          created_at: string
          demo_link: string | null
          demo_video_link: string | null
          demo_video_url: string | null
          description: string | null
          featured: boolean
          github_link: string | null
          hackathon_id: string | null
          id: string
          likes: number
          live_demo_link: string | null
          problem: string | null
          screenshots: Json | null
          solution: string | null
          status: Database["public"]["Enums"]["project_status"]
          tagline: string | null
          team_id: string | null
          tech_stack: Json | null
          tech_video_url: string | null
          thumbnail_url: string | null
          title: string
          track_id: string | null
          updated_at: string
          user_id: string
          views: number
        }
        Insert: {
          ai_summary?: string | null
          created_at?: string
          demo_link?: string | null
          demo_video_link?: string | null
          demo_video_url?: string | null
          description?: string | null
          featured?: boolean
          github_link?: string | null
          hackathon_id?: string | null
          id?: string
          likes?: number
          live_demo_link?: string | null
          problem?: string | null
          screenshots?: Json | null
          solution?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          tagline?: string | null
          team_id?: string | null
          tech_stack?: Json | null
          tech_video_url?: string | null
          thumbnail_url?: string | null
          title: string
          track_id?: string | null
          updated_at?: string
          user_id: string
          views?: number
        }
        Update: {
          ai_summary?: string | null
          created_at?: string
          demo_link?: string | null
          demo_video_link?: string | null
          demo_video_url?: string | null
          description?: string | null
          featured?: boolean
          github_link?: string | null
          hackathon_id?: string | null
          id?: string
          likes?: number
          live_demo_link?: string | null
          problem?: string | null
          screenshots?: Json | null
          solution?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          tagline?: string | null
          team_id?: string | null
          tech_stack?: Json | null
          tech_video_url?: string | null
          thumbnail_url?: string | null
          title?: string
          track_id?: string | null
          updated_at?: string
          user_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "projects_hackathon_id_fkey"
            columns: ["hackathon_id"]
            isOneToOne: false
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      scores: {
        Row: {
          created_at: string
          execution_score: number
          feedback: string | null
          id: string
          idea_score: number
          judge_id: string
          presentation_score: number
          project_id: string
          total_score: number | null
        }
        Insert: {
          created_at?: string
          execution_score?: number
          feedback?: string | null
          id?: string
          idea_score?: number
          judge_id: string
          presentation_score?: number
          project_id: string
          total_score?: number | null
        }
        Update: {
          created_at?: string
          execution_score?: number
          feedback?: string | null
          id?: string
          idea_score?: number
          judge_id?: string
          presentation_score?: number
          project_id?: string
          total_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "scores_judge_id_fkey"
            columns: ["judge_id"]
            isOneToOne: false
            referencedRelation: "judges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsor_credits: {
        Row: {
          claim_code: string | null
          created_at: string
          description: string | null
          hackathon_id: string | null
          id: string
          instructions: string | null
          logo_url: string | null
          sponsor_name: string
        }
        Insert: {
          claim_code?: string | null
          created_at?: string
          description?: string | null
          hackathon_id?: string | null
          id?: string
          instructions?: string | null
          logo_url?: string | null
          sponsor_name: string
        }
        Update: {
          claim_code?: string | null
          created_at?: string
          description?: string | null
          hackathon_id?: string | null
          id?: string
          instructions?: string | null
          logo_url?: string | null
          sponsor_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "sponsor_credits_hackathon_id_fkey"
            columns: ["hackathon_id"]
            isOneToOne: false
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          admin_response: string | null
          created_at: string
          id: string
          message: string
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          created_at?: string
          id?: string
          message: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          created_at?: string
          id?: string
          message?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          role: string
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          role?: string
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          role?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      tracks: {
        Row: {
          description: string | null
          hackathon_id: string
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          hackathon_id: string
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          hackathon_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tracks_hackathon_id_fkey"
            columns: ["hackathon_id"]
            isOneToOne: false
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      sponsor_credits_public: {
        Row: {
          created_at: string | null
          description: string | null
          hackathon_id: string | null
          id: string | null
          instructions: string | null
          logo_url: string | null
          sponsor_name: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          hackathon_id?: string | null
          id?: string | null
          instructions?: string | null
          logo_url?: string | null
          sponsor_name?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          hackathon_id?: string | null
          id?: string | null
          instructions?: string | null
          logo_url?: string | null
          sponsor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsor_credits_hackathon_id_fkey"
            columns: ["hackathon_id"]
            isOneToOne: false
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      calculate_project_score: {
        Args: { p_project_id: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_views: { Args: { p_project_id: string }; Returns: undefined }
      toggle_like: { Args: { p_project_id: string }; Returns: boolean }
      verify_certificate: {
        Args: { p_certificate_id: string }
        Returns: {
          certificate_id: string
          certificate_type: string
          hackathon_name: string
          image_url: string
          issued_at: string
          issuer_name: string
          pdf_url: string
          recipient_name: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user" | "judge"
      certificate_type:
        | "participant"
        | "winner_1"
        | "winner_2"
        | "winner_3"
        | "winner_4"
        | "winner_5"
        | "winner_6"
        | "winner_7"
        | "winner_8"
        | "winner_9"
        | "winner_10"
      hackathon_status: "draft" | "active" | "completed"
      project_status: "pending" | "approved" | "rejected" | "winner"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "judge"],
      certificate_type: [
        "participant",
        "winner_1",
        "winner_2",
        "winner_3",
        "winner_4",
        "winner_5",
        "winner_6",
        "winner_7",
        "winner_8",
        "winner_9",
        "winner_10",
      ],
      hackathon_status: ["draft", "active", "completed"],
      project_status: ["pending", "approved", "rejected", "winner"],
      ticket_status: ["open", "in_progress", "resolved", "closed"],
    },
  },
} as const
