import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/options";


export async function GET() {
  const session = await getServerSession(authOptions);

  return NextResponse.json({ image: session?.user?.image ?? "Not Logged In" });
}
