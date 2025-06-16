const requireAuth = require('../_utils/authMiddleware');
const prisma = require('../../backend/src/services/prismaService');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    return requireAuth(req, res, async () => {
      const { title, description, tags, tier, muxUploadId } = req.body;
      // creatorId is always taken from the token
      const creatorId = req.user?.id;
      if (!title || !creatorId || !muxUploadId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      try {
        const video = await prisma.video.create({
          data: {
            title,
            description,
            tags,
            tier,
            creatorId,
            muxUploadId,
            muxAssetId: '',
            muxPlaybackId: '',
          },
        });
        res.status(201).json(video);
      } catch (prismaError) {
        // Log detailed Prisma error to Vercel console
        if (prismaError && typeof prismaError === 'object') {
          console.error('Prisma error creating video:', {
            message: prismaError.message,
            code: prismaError.code,
            meta: prismaError.meta,
            stack: prismaError.stack,
          });
        } else {
          console.error('Unknown error creating video:', prismaError);
        }
        // Return a safe error message to the client
        res.status(500).json({ error: 'A database error occurred while creating the video.' });
      }
    }, 'creator');
  }

  // GET /api/videos?uploadId=xxx
  if (req.method === 'GET') {
    const { uploadId } = req.query;
    if (!uploadId) return res.status(400).json({ error: 'Missing uploadId' });
    console.log('GET /api/videos called with uploadId:', uploadId);
    try {
      const video = await prisma.video.findFirst({ where: { muxUploadId: uploadId } });
      if (!video) return res.status(404).json({ error: 'Video not found' });
      res.status(200).json(video);
    } catch (prismaError) {
      // Log detailed Prisma error to Vercel console
      if (prismaError && typeof prismaError === 'object') {
        console.error('Prisma error fetching video:', {
          message: prismaError.message,
          code: prismaError.code,
          meta: prismaError.meta,
          stack: prismaError.stack,
          uploadId,
        });
      } else {
        console.error('Unknown error fetching video:', prismaError, 'uploadId:', uploadId);
      }
      // Return a safe error message to the client
      res.status(500).json({ error: 'A database error occurred while fetching the video.' });
    }
    return;
  }

  res.status(405).end();
}; 