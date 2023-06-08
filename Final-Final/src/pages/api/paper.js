import { prisma } from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const papers = await prisma.paper.findMany({
        include: { authors: true, _count: true, presentor: true, review: true },
      });
      res.json([...papers]);
    }

    if (req.method === "POST") {
      const {
        title,
        abstract,
        authors: reqAuthors,
        sessionId,
        presentor,
      } = req.body;
      const a = JSON.parse(reqAuthors);
      const authors = [];
      for (let i = 0; i < a.length; i++) {
        const author = await prisma.author.create({
          data: { ...JSON.parse(reqAuthors)[i] },
        });
        authors.push(author);
      }

      const paper = await prisma.paper.create({
        data: {
          title,
          sessionId,
          abstract,
          authors: { connect: authors.map((a) => ({ id: a.id })) },
          presentorId: authors.find((_, idx) => idx == presentor)?.id,
        },
      });
      res.json(paper);
    }

    if (req.method === "PUT") {
      const { id } = req.query;
      const { sessionId, from, to } = req.body;
      const paper = await prisma.paper.update({
        where: {
          id,
        },
        data: {
          sessionId,
          from,
          to,
        },
      });
      res.json(paper);
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id) {
        throw new Error("No id");
      }
      const author = await prisma.paper.update({
        where: {
          id,
        },
        data: {
          sessionId: null,
        },
      });
      res.json(author);
    }
  } catch (error) {
    console.log(error);
  }
}
