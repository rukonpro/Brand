import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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
                    throw new Error('You are not registered,please register!');
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
        signIn: '/login',
        error: "/login",
        newUser:"/register",

    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.gender = user.gender;
                token.dateOfBirth = user.dateOfBirth;
                token.phoneNumber = user.phoneNumber;
                token.email = user.email;
                token.country = user.country;
                token.houseNumber = user.houseNumber;
                token.street = user.street;
                token.city = user.city;
                token.postalCode = user.postalCode;
                token.state = user.state;
                token.role = user.role;
                token.profilePhoto = user.profilePhoto;
                token.coverPhoto = user.coverPhoto;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            session.user.gender = token.gender;
            session.user.dateOfBirth = token.dateOfBirth;
            session.user.phoneNumber = token.phoneNumber;
            session.user.email = token.email;
            session.user.country = token.country;
            session.user.houseNumber = token.houseNumber;
            session.user.street = token.street;
            session.user.city = token.city;
            session.user.postalCode = token.postalCode;
            session.user.state = token.state;
            session.user.role = token.role;
            session.user.profilePhoto = token.profilePhoto;
            session.user.coverPhoto = token.coverPhoto;
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 10, // 10 days in seconds
    },
    secret: process.env.NEXT_PUBLIC_SECRET_KEY,
};

const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;