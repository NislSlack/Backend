module.exports = {
  apps: [
    {
      name: "SWDevelop", // 프로젝트 이름
      script: "app.js", // 실행되는 파일
      // instances: 4, // 클러스터 모드 사용 시 생성할 인스턴스 수
      // exec_mode: "cluster", // fork, cluster 모드 중 선택
      merge_logs: true, // 클러스터 모드 사용 시 각 클러스터에서 생성되는 로그를 한 파일로 합쳐준다.
      autorestart: true, // 프로세스 실패 시 자동으로 재시작할지 선택
      watch: true,
      ignore_watch: ["node_modules", "logs", ".adminjs", ".config"], //바뀌어도 다시 실행X하는 파일 설정
      env: {
        // 개발 환경설정
        NODE_ENV: "development",
        PROT: 3000,
      },
      env_production: {
        // 운영 환경설정 (--env production 옵션으로 지정할 수 있다.)
        NODE_ENV: "production",
        PROT: 80,
      },
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
