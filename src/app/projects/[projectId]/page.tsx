import React from "react";
interface Props {
  params: {
    projectId: string;
  };
}
const Page = async ({ params }: Props) => {
  const { projectId } = params;
  return <div>Project Id: {projectId}</div>;
};

export default Page;
