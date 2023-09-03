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
          created_at: string
          data: Json | null
          id: number
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: number
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: number
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}