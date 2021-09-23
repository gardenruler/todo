# To-Do

## API server

```bash
# 실행
docker-compose up -d
# 중단
docker-compose down
# DB만 실행
docker-compose -f docker-compose-local-db.yaml up -d
# 실행 전 이미지 빌드
docker-compose up --build
```



## Frontend

```bash
# 실행
yarn start
# 단위 테스트 실행
yarn test

# E2E 테스트 전체 실행
yarn cypress run
# E2E 테스트 러너 실행
yarn cypress open
```

