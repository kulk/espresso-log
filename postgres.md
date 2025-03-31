```bash
docker run --name espresso-log-db -e POSTGRES_DB=espresso-log -e POSTGRES_USER=espressouser -e POSTGRES_PASSWORD=somethingunsafe -d -p 5432:5432 postgres:16
```