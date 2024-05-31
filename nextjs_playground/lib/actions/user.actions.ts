"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { SignJWT } from "jose";
import { string } from "zod";
import { SignUpParams, getUserInfoProps, signInJWTProps, signInProps, users_by_pk } from "@/types";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    JWT_SECRET_KEY: APP_JWT_SECRET_KEY,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();

        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal("userId", [userId])]
        );

        return parseStringify(user.documents[0]);
    } catch (error) {
        console.log(error);
    }
};

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        const user = await getUserInfo({ userId: session.userId });
        return parseStringify(user);
    } catch (error) {
        console.error("Error", error);
    }
};

export const signInJWT = async ({ email }: signInJWTProps) => {
    try {
        const account = await fetchUser({ email });

        const token = await new SignJWT(account)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("60 min from now")
            .sign(new TextEncoder().encode(process.env.APP_JWT_SECRET_KEY));


        cookies().set("jwt-session", token, {
            path: "/",
            maxAge: 3600,
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
            sameSite: "strict",
        });

		const getUser: users_by_pk = account
		cookies().set("so_userId", getUser.guid)

        //const user = await getUserInfo({ userId: session.userId });
        return { status: 200, body: account };
    } catch (error) {
		return { status: 500, body: null }
    }
};

export const signUp = async ({ ...userData }: SignUpParams) => {
    const { email, userName, password } = userData;

    let newUserAccount;

    try {
        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(
            ID.unique(),
            userName,
            email,
            password
        );

        if (!newUserAccount) throw new Error("Error creating user");

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id,
            }
        );

        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
    } catch (error) {
        console.error("Error", error);
    }
};

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const result = await account.get();

        const user = await getUserInfo({ userId: result.$id });

        return parseStringify(user);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        cookies().delete("appwrite-session");

        await account.deleteSession("current");
    } catch (error) {
        return null;
    }
};

async function fetchUser({ email }: signInJWTProps) {
    const url =
        "https://novel-sunbird-22.hasura.app/api/rest/users/" + email + "/2";

    const headers = new Headers({
        "x-hasura-admin-secret":
            "7I8VxyzIngk7omqBE79L7TsY41DcquBmkpWK82icKHWq67W1VKq1N1jAlUh1V9PP",
        "content-type": "application/json",
        Accept: "*/*",
        Host: "novel-sunbird-22.hasura.app",
        Connection: "keep-alive",
    });

    const requestOptions: RequestInit = {
        method: "GET",
        headers: headers,
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
    }
}
