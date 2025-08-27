"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Rabbit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Loader from "@/components/Loader";

export const ProjectsList = () => {
  const { user } = useUser();
  const trpc = useTRPC();
  const router = useRouter();
  const [loadingProjectId, setLoadingProjectId] = useState<string | null>(null);
  const {
    data: projects,
    isLoading,
    refetch,
  } = useQuery(trpc.projects.getMany.queryOptions());

  const handleProjectClick = async (projectId: string) => {
    setLoadingProjectId(projectId);
    router.push(`/projects/${projectId}`);
    // The loading state will be reset when the component unmounts or when navigation completes
  };

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
    <>
      {loadingProjectId && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
        <h2 className="text-2xl font-semibold">
          {user?.firstName}&apos;s VibePlus
        </h2>
        {isLoading && (
          <div className="flex flex-col justify-center items-center gap-2.5">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            <p className="text-sm text-muted-foreground">
              Loading your Projects..
            </p>
          </div>
        )}
        {!isLoading && projects?.length === 0 && (
          <div className="flex flex-col justify-center items-center gap-2.5">
            <Rabbit size={150} />
            <p className="text-xl text-muted-foreground">No projects found!</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects?.map((project) => (
            <Button
              key={project.id}
              variant="outline"
              className="font-normal h-auto justify-start w-full text-start py-4 rounded-md group relative"
              onClick={() => handleProjectClick(project.id)}
            >
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
              {/* Delete button */}
              <div className="ml-auto mt-auto rounded-full p-0.5 group-hover:visible invisible hover:bg-red-100 flex justify-center items-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center"
                    >
                      <Trash2 className="text-red-600" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your Project and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(project.id);
                        }}
                      >
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
    </>
  );
};
