import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { cookies } from "next/headers"

async function isAuthenticated() {
  const cookieStore = await cookies()
  return cookieStore.get("admin_session")?.value === "authenticated"
}

export async function POST(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Archivo requerido" }, { status: 400 })
    }

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`

    const { data, error } = await supabaseAdmin.storage
      .from("product-images")
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      })

    if (error) throw error

    const { data: publicUrl } = supabaseAdmin.storage
      .from("product-images")
      .getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl.publicUrl, path: data.path })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
