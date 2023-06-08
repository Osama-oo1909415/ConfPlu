import { prisma } from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const authors = await prisma.author.findMany();
      res.json(authors);
    }

    if (req.method === "POST") {
      const { firstname, lastname, affiliations, email } = req.body;
      console.log(firstname);
      const author = await prisma.author.create({
        data: {
          firstname,
          lastname,
          email,
          affiliations,
        },
      });
      res.json(author);
    }

    if (req.method === "PUT") {
      const { id } = req.query;
      const { firstname, lastname, affiliations, email } = req.body;
      const author = await prisma.author.update({
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
      res.json(author);
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
