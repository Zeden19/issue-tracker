"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import z from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type issueForm = z.infer<typeof createIssueSchema>;

function NewIssue() {
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<issueForm>({ resolver: zodResolver(createIssueSchema) });
  const onSubmit: SubmitHandler<issueForm> = async (data) => {
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
        <TextField.Root {...register("title")} placeholder={"Issue Title"} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name={"description"}
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

export default NewIssue;
