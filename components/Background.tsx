import React from "react";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100 invert dark:opacity-100 dark:invert-0"
        style={{
          backgroundImage: `url("/bg.png")`,
        }}
      ></div>
    </div>
  );
}
