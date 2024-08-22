"use client";

import {Button, Callout, Text, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/app/validationSchemas";
import z from "zod";

type issueForm = z.infer<typeof createIssueSchema>

function NewIssue() {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<issueForm>({resolver: zodResolver(createIssueSchema)});
  const onSubmit: SubmitHandler<issueForm> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (e) {
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
        {errors.title && <Text as={"p"} color={"red"}>{errors.title.message}</Text>}
        <Controller
          control={control}
          name={"description"}
          render={({ field }) => <SimpleMDE {...field} />}
        />
        {errors.description && <Text as={"div"} color={"red"}>{errors.description.message}</Text>}

        <Button type={"submit"}>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssue;
