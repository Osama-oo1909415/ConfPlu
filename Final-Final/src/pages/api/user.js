import { prisma } from "@/lib/db";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  res.json(user);
}
