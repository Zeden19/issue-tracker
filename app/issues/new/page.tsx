"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Inputs {
  title: string;
  description: string;
}

function NewIssue() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        description: data.description,
      }),
    });
    router.push("/issues");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"max-w-xl space-y-3"}>
      <h2>Create new Issue</h2>
      <TextField.Root
        {...register("title", { required: true })}
        placeholder={"Issue Title"}
      />
      <Controller
        control={control}
        name={"description"}
        render={({ field }) => <SimpleMDE {...field} />}
      />

      <Button type={"submit"}>Submit New Issue</Button>
    </form>
  );
}

export default NewIssue;
