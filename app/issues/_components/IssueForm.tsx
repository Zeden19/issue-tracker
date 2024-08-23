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
import dynamic from "next/dynamic";
import {Issue} from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type issueFormData = z.infer<typeof issuesSchema>;

function IssueForm({issue} : {issue?: Issue}) {
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
      await axios.post("/api/issues", data);
      router.push("/issues");
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
        <h2>Create new Issue</h2>
        <TextField.Root defaultValue={issue?.title} {...register("title")} placeholder={"Issue Title"} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name={"description"}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitted} type={"submit"}>
          Submit New Issue {isSubmitted && <LoadingSpinner />}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
