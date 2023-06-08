import { prisma } from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const session = await prisma.session.findMany({
        include: { paper: { include: { presentor: true, _count: true } } },
      });
      res.json(session);
    }

    if (req.method === "POST") {
      const { date, from, location, to, paperId, title } = req.body;
      const paper = await prisma.session.create({
        data: {
          title,
          date,
          from,
          location,
          to,
          paper: { connect: { id: paperId } },
        },
      });
      res.json(paper);
    }

    if (req.method === "PUT") {
      const { id } = req.query;
      const { date, from, location, to, paperId } = req.body;
      const session = await prisma.session.update({
        where: {
          id,
        },
        data: {
          date,
          from,
          location,
          to,
          paper: { connect: { id: paperId } },
        },
      });
      res.json(session);
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id) {
        throw new Error("No id");
      }
      const author = await prisma.session.delete({
        where: {
          id,
        },
      });
      res.json(author);
    }
  } catch (error) {
    console.log(error);
  }
}
