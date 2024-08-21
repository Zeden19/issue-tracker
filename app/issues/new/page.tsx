'use client'

import {Button, TextArea, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function NewIssue() {
  return (
    <form className={"max-w-xl space-y-3"}>
      <h2>Create new Issue</h2>
      <TextField.Root placeholder={"Issue Title"}/>
      <SimpleMDE/>
      <Button type={"submit"}>Submit New Issue</Button>
    </form>
  )
}

export default NewIssue;
