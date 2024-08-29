"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issuesSchema } from "@/app/validationSchemas";
import z from "zod";
import { ErrorMessage, LoadingSpinner } from "@/app/components";
import { Issue } from "@prisma/client";
import dynamic from "next/dynamic";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type issueFormData = z.infer<typeof issuesSchema>;

function IssueForm({ issue }: { issue?: Issue }) {
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<issueFormData>({ resolver: zodResolver(issuesSchema) });
  const onSubmit: SubmitHandler<issueFormData> = async (data) => {
    try {
      setIsSubmitted(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (e) {
      setIsSubmitted(false);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className={"max-w-xl"}>
      {error && (
        <Callout.Root className={"mb-5"}>
          <Callout.Text color={"red"}>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={"space-y-3"}>
        <h2>{issue ? "Update Issue: " + issue.title : "Create new Issue"}</h2>
        <TextField.Root
          defaultValue={issue?.title}
          {...register("title")}
          placeholder={"Issue Title"}
        />
        <select
          className={"bg-black p-2 border border-gray-600 rounded"}
          {...register("status")}
          defaultValue={issue ? issue?.status : "NOT_STARTED"}
        >
          <option value={"NOT_STARTED"}>Not Started</option>
          <option value={"IN_PROGRESS"}>In Progress</option>
          <option value={"CLOSED"}>Closed</option>
        </select>
        <ErrorMessage>{errors.status?.message}</ErrorMessage>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name={"description"}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMdeReact {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitted} type={"submit"}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitted && <LoadingSpinner />}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
