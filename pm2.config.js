module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: "hulk_sys_dev",
      script: "server/bin/www",
      env: {
        STAGE_ENV: "dev",
        PORT: 9108
      },
      watch:true,
      cwd: ".",
      instances: "1",
      exec_mode: "cluster"
    },   
    {
      name: "hulk_sys_prod",
      script: "server/bin/www",
      env: {
        STAGE_ENV: "prod",
        PORT: 9108
      },
      cwd: ".",
      instances: "1",
      exec_mode: "cluster"
    }
  ]
}
