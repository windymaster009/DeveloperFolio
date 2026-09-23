module.exports = {
  apps: [
    {
      name: "developerfolio",
      script: ".next/standalone/server.js",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: "3030",
      },
      max_memory_restart: "700M",
      autorestart: true,
      watch: false,
      time: true,
    },
  ],
};
