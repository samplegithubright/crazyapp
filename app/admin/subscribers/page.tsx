"use client";

import { useEffect, useState } from "react";

export default function Subscribers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/subscribers")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Subscribers
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-4 bg-white rounded shadow"
          >
            <p>{user.email}</p>
            <p>
              Expiry:{" "}
              {new Date(user.subscriptionExpiry).toDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}