import { prisma } from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const authors = await prisma.paper.findMany({
        include: { authors: true, presentor: true },
      });
      res.json(authors);
    }

    if (req.method === "POST") {
      const { contribution, strength, evalutation, weakness, paperId } =
        req.body;
      const review = await prisma.review.create({
        data: {
          contribution,
          strength,
          weakness,
          evalutation,
          paperId,
        },
      });
      res.json(review);
    }

    if (req.method === "PUT") {
      const { id } = req.query;
      const { firstname, lastname, affiliations, email } = req.body;
      const review = await prisma.author.update({
        where: {
          id: Number(id),
        },
        data: {
          firstname,
          lastname,
          affiliations,
          email,
        },
      });
      res.json(review);
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id) {
        throw new Error("No id");
      }
      const author = await prisma.author.delete({
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
