import { sql } from "@vercel/postgres";
import {
  S3Client,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

export default async function handler(request, response) {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    if (request.method !== "DELETE") {
      return response.status(405).json({ message: "Method Not Allowed" });
    }

    const { url } = request.body;

    if (!url) {
      return response.status(400).json({ message: "URL is required" });
    }

    // Fetch image URL from the database
    const getImageScript = `SELECT title_image FROM public.article WHERE url=$1 AND project=$2;`;
    const getImageValues = [url, projectName];
    const imageResult = await sql.query(getImageScript, getImageValues);

    if (imageResult.rowCount === 0) {
      return response.status(404).json({ message: "Record not found" });
    }

    const imageUrl = imageResult.rows[0].title_image;
    const imageKey = imageUrl.replace(
      `https://${bucketName}.s3.amazonaws.com/`,
      ""
    );

    console.log("S3 Bucket:", bucketName);
    console.log("Extracted S3 Key:", imageKey);

    // Attempt to verify and delete the object from S3
    try {
      await s3Client.send(
        new HeadObjectCommand({ Bucket: bucketName, Key: imageKey })
      );
      console.log("Object exists in S3, proceeding to delete.");

      await s3Client.send(
        new DeleteObjectCommand({ Bucket: bucketName, Key: imageKey })
      );
      console.log("Image deleted from S3:", imageKey);
    } catch (error) {
      console.warn(
        "Image not found or error occurred while deleting from S3, continuing:",
        error.message
      );
    }

    // Delete record from the database
    const deleteScript = `DELETE FROM article WHERE url=$1 AND project=$2;`;
    const deleteValues = [url, projectName];
    const result = await sql.query(deleteScript, deleteValues);

    if (result.rowCount === 0) {
      return response.status(404).json({ message: "Record not found" });
    }

    return response
      .status(200)
      .json({ message: "Record and image successfully deleted (if existed)" });
  } catch (error) {
    console.error("Error deleting record or image:", error);
    return response.status(500).json({ error: error.message });
  }
}
