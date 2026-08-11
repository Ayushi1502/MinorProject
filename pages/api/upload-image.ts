import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pathshala-user-images',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
  } as any,
});

const parser = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // @ts-ignore
    parser.single('image')(req, res, (err: any) => {
      if (err) {
        console.error('Cloudinary upload error:', err);
        return res.status(500).json({ message: 'Image upload failed', error: err.message });
      }
      // @ts-ignore
      const imageFile = req.file;
      if (!imageFile) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      res.status(200).json({ imageUrl: imageFile.path });
    });
  } catch (error: any) {
    console.error('Upload API error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export default handler;