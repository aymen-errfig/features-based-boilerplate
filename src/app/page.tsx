"use client";

import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import React from "react";

export default function Home() {

    return (
        <div className={"h-screen flex flex-col"}>
            <header className={"p-5 bg-secondary border-b-1 border"}>
                <h1 className={"text-lg"}>ultimate todo</h1>
            </header>
            <div className={"h-full flex justify-center items-center "}>
                <div className={" px-4 bg-white border rounded-sm"}>
                    <div className={"between-flex gap-10 border-b-1 py-3"}>
                        <p>Todo</p>
                        <p>24-09-2025</p>
                    </div>
                    <div className={"center-flex-col py-5 gap-3"}>

                        <div className={"between-flex gap-20 py-2"}>
                            <div className={"between-flex gap-2"}>
                                <Checkbox/>
                                <p>Todo Task 1</p>
                            </div>
                            <Button variant={"destructive"}>delete</Button>
                        </div>
                        <div className={"between-flex gap-20 py-2"}>
                            <div className={"between-flex gap-2"}>
                                <Checkbox/>
                                <p>Todo Task 1</p>
                            </div>
                            <Button variant={"destructive"}>delete</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
