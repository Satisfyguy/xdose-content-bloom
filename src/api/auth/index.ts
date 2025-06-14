// src/api/auth/index.ts
// Point d'entrée pour les routes d'authentification

import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme-secret';
const JWT_EXPIRES_IN = '2h';

// Exemple de squelette pour login/register (à compléter)
export async function login(email: string, password: string) {
  // Chercher l'utilisateur
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }
  // Vérifier le mot de passe
  // @ts-ignore
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Mot de passe incorrect');
  }
  // Générer le token
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { user, token };
}

export async function register(email: string, password: string, name: string, role: string) {
  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email déjà utilisé');
  }
  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);
  // Créer l'utilisateur avec le rôle spécifié
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: role as any, // Assurez-vous que le rôle est valide dans votre schéma Prisma
    },
  });
  // Générer le token
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { user, token };
} 