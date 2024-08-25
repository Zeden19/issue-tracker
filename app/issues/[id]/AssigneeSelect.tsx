"use client";
import { Select } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import axios from "axios";

function AssigneeSelect() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };
    
    fetchUsers().then();
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder={"Assign..."} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
