"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { Session } from "inspector";

const formSchema = z
    .object({
        username: z
            .string()
            .max(100, {
                message: "Username can only have max 100 characters.",
            })
            .transform((str) => {
                return str.replace(/[^a-zA-Z0-9 ]/g, "");
            }),
        password: z
            .string()
            .regex(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{12,}$/,
                {
                    message:
                        "Password must have at least 1 Uppercase, lowercase, numbers and specials characters.",
                }
            ),
        email: z.coerce.string().email("Invalid email address."),
    })
    .strict();

const Forms = () => {
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    // 2. Define a submit handler.
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);

        if (values.email === "chewtingjun311@gmail.com" && values.username === "Isaac" && values.password === "CTJjun0311@(") {
            //router.push("/objects");
            //window.location.href("/objects")

            // cookies().set('session', Session, {
            //     httpOnly: true,
            // })
            document.cookie = `token=testToken0123456789; expires=6000 path=/`;
            router.push("/profile");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your name."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter your password."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Enter your password.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your email."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Enter your email.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default Forms;
