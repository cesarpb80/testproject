#Shell Script automates the spring boot app docker build
#!/bin/bash
docker-compose down
mvn clean install
docker build --tag=testproject-gateway -f DockerfileDEV .
docker images -qf dangling=true | xargs -r docker rmi
