// app/admin/emails/types.ts
export interface SupportEmail {
  id: string; // Now includes prefix (e.g., "contact-3")
  original_id: number; // Original database ID
  from_email: string;
  from_name: string;
  subject: string;
  message_text: string;
  received_at: Date;
  status: "unread" | "read" | "replied" | "archived";
  source: "contact_form" | "chat_bot";
}

export interface EmailReply {
  id: string;
  message_text: string;
  created_at: string;
  current_status: string;
}
