module.exports = {
  apps: [
    {
      name: "kraito",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      env: {
        PORT: 3003,
        NODE_ENV: "production",
      },
      //      instances: "max", // Use maximum number of CPU cores
      exec_mode: "cluster", // Run in cluster mode for better performance
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env_production: {
        PORT: 3003,
        NODE_ENV: "production",
      },
    },
  ],
};
