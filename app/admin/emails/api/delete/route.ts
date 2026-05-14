import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids, table } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No email IDs provided for deletion" },
        { status: 400 },
      );
    }

    const allowedTables = ["contact_messages", "chat_messages"];
    if (!table || !allowedTables.includes(table)) {
      return NextResponse.json(
        { error: `Invalid table. Must be one of: ${allowedTables.join(", ")}` },
        { status: 400 },
      );
    }

    // Soft delete by setting deleted_at
    const { data, error } = await supabase
      .from(table)
      .update({ deleted_at: new Date().toISOString() })
      .in("id", ids)
      .is("deleted_at", null)
      .select("id");

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: `Deleted ${data?.length || 0} email(s)`,
      count: data?.length || 0,
      deletedIds: data?.map((item) => item.id) || [],
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 },
    );
  }
}
