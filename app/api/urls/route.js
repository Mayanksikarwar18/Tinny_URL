import clientPromise from "@/lib/mongodb";

export async function GET(){

    try{
        const client = await clientPromise;
        const db = client.db("TinnyURL");
        const collection = db.collection("url")

        const urls = await collection.find({}).sort({createdAt: -1}).toArray();

        return Response.json({success: true, data: urls, });

    }
    catch(error){
        console.error("Fetch URLs error:", error);
        return Response.json({success: false, message: "failed to fetch URLs"},
           {status:500} 
        );
    }
}
  

