module.exports = {
  apps: [
    {
      name: "developerfolio",
      script: "node_modules/serve/build/main.js",
      args: "-s build -l 3030",
      cwd: __dirname,
      env: {
        NODE_ENV: "production"
      },
      max_memory_restart: "300M",
      autorestart: true,
      watch: false,
      time: true
    }
  ]
};
