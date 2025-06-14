const { Mux } = require('@mux/mux-node');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

// Singleton pattern pour PrismaClient
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Initialiser le client Mux
const muxClient = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Vérifier l'authentification
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme-secret');
    if (!decoded || decoded.role !== 'CREATOR') {
      return res.status(403).json({ error: 'Only creators can upload videos' });
    }

    const { title, description, tier = 'FREE' } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Créer un asset Mux
    const asset = await muxClient.Video.Assets.create({
      input: [{ url: 'https://storage.googleapis.com/muxdemofiles/mux-video-intro.mp4' }],
      playback_policy: ['public'],
      mp4_support: 'standard',
    });

    // Créer l'enregistrement de la vidéo dans la base de données
    const video = await prisma.video.create({
      data: {
        title,
        description,
        tier,
        muxAssetId: asset.id,
        muxPlaybackId: asset.playback_ids?.[0]?.id,
        creatorId: decoded.userId,
      },
    });

    return res.status(200).json({
      uploadUrl: asset.upload_url,
      videoId: video.id,
      playbackId: asset.playback_ids?.[0]?.id,
    });
  } catch (error) {
    console.error('Video upload error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}; 