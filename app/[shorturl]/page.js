import clientPromise from "@/lib/mongodb";
import { redirect, notFound } from "next/navigation";


export default async function ShortUrlPage({ params }) {
  const { shorturl } = await params;

  const client = await clientPromise;
  const db = client.db("TinnyURL");
  const collection = db.collection("url");

  const doc = await collection.findOne({ shorturl });

  if (!doc) {
    notFound(); // 404 if short URL doesn't exist
  }


  redirect(doc.url);
}