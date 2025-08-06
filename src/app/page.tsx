"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const router = useRouter();

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        toast.success("Project created successfully");
        router.push(`/projects/${data.id}`);
      },
      onError: (error) => {
        toast.error(`Error creating project: ${error.message}`);
      },
    })
  );

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex flex-col gap-y-4 justify-center items-center">
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="type anything you like to ask?" />
        <Button disabled={createProject.isPending} onClick={() => createProject.mutate({ value: value })}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Page;
