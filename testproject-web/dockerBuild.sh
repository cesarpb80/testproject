#Shell Script automates the spring boot app docker build
#!/bin/bash
docker-compose down
docker build --tag=testproject-web -f Dockerfile .
docker images -qf dangling=true | xargs -r docker rmi
