'use client'
import {Button, TextArea, TextField} from "@radix-ui/themes";

function NewIssue() {
  return (
    <form className={"max-w-xl space-y-3"}>
      <h2>Create new Issue</h2>
      <TextField.Root placeholder={"Issue Title"}/>
      <TextArea placeholder={"Issue Description"}/>
      <Button type={"submit"}>Submit New Issue</Button>
    </form>
  )
}

export default NewIssue;
