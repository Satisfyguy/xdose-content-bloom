// @ts-nocheck
if (!globalThis._xdose_auth_login) {
  const prisma = require('../../backend/src/services/prismaService');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  let JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

  module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      // Remove password from user object
      const { password: _, ...userData } = user;
      res.status(200).json({ token, user: userData });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  };
  globalThis._xdose_auth_login = true;
} 