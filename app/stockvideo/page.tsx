"use client";

import { useEffect, useState } from "react";

export default function StockVideo() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/media?category=stockvideo")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      {data.map((item) => (
        <video key={item._id} src={item.url} controls />
      ))}
    </div>
  );
}