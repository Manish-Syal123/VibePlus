"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
export const ProjectsList = () => {
  const { user } = useUser();
  const trpc = useTRPC();
  const {
    data: projects,
    isLoading,
    refetch,
  } = useQuery(trpc.projects.getMany.queryOptions());

  const deleteProject = useMutation(
    trpc.projects.deleteProject.mutationOptions({
      onSuccess: () => {
        toast.success("Project deleted successfully");
        refetch();
      },
      onError: () => {
        toast.error("Failed to delete project");
      },
    })
  );

  if (!user) return null;

  const handleDelete = (projectId: string) => {
    deleteProject.mutateAsync({ projectId });
  };

  return (
    <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
      <h2 className="text-2xl font-semibold">
        {user?.firstName}&apos;s VibePlus
      </h2>
      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading your Projects</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {!isLoading && projects?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-sm text-muted-foreground">No projects found</p>
          </div>
        )}
        {projects?.map((project) => (
          <Button
            key={project.id}
            variant="outline"
            className="font-normal h-auto justify-start w-full text-start py-4 rounded-md group"
          >
            <Link href={`projects/${project.id}`}>
              <div className="flex items-center gap-x-4 p-2">
                <Image
                  src="logo.svg"
                  alt="VibePlus"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <div className="flex flex-col">
                  <h3 className="truncate font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
            {/*  */}
            <div className="ml-auto mt-auto rounded-full p-0.5 group-hover:visible invisible hover:bg-red-100 flex justify-center items-center">
              <AlertDialog>
                <AlertDialogTrigger>
                  <Trash2 className="text-red-600" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your Project and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(project.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
