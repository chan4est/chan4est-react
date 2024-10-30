import { createClient } from "../../utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const body = await req.json();

  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          user_name: body.userName,
          user_image: body.userImage,
          country: body.country,
          content: body.comment,
        },
      ])
      .select();
    if (!error) {
      return NextResponse.json({ message: data }, { status: 200 });
    } else {
      return NextResponse.json({ message: error }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
