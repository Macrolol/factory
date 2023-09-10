export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activity: {
        Row: {
          config: Json
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          config: Json
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      activity_run: {
        Row: {
          activity_id: number
          created_at: string
          data: Json | null
          id: number
        }
        Insert: {
          activity_id: number
          created_at?: string
          data?: Json | null
          id?: number
        }
        Update: {
          activity_id?: number
          created_at?: string
          data?: Json | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "activity_run_activity_id_fkey"
            columns: ["activity_id"]
            referencedRelation: "activity"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      pipeline: {
        Row: {
          config: Json | null
          created_at: string
          id: number
          name: string | null
          updated_at: string
        }
        Insert: {
          config?: Json | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string
        }
        Update: {
          config?: Json | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      pipeline_run: {
        Row: {
          created_at: string
          id: number
          pipeline_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          pipeline_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          pipeline_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_run_pipeline_id_fkey"
            columns: ["pipeline_id"]
            referencedRelation: "pipeline"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
          username: string | null
        }
        Insert: {
          id: string
          username?: string | null
        }
        Update: {
          id?: string
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      user_status: "ONLINE" | "OFFLINE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
