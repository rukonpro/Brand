import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                // Find user by email
                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user) {
                    throw new Error('No user found with this email');
                }

                // Compare the provided password with the stored hashed password
                const isValidPassword = await bcrypt.compare(password, user.password);

                if (!isValidPassword) {
                    throw new Error('Invalid password');
                }

                // Return user object if authentication is successful
                return user;
            },
        }),
    ],
    pages: {
        signIn: '/login', // Redirect to custom sign-in page if needed
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.firstName=user.firstName;
                token.lastName=user.lastName;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 10, // 10 days in seconds
    },
    secret: process.env.SECRET_KEY,
};

const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;