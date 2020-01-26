# QSoft
Social network


[Server] Python (Flask)

[Client] React

[Database] PostgreSQL

[Deployment] Docker

## Getting Started

#### Install npm
brew install node

#### Install docker

You can use two variants.
The first one:
```
https://docs.docker.com/compose/install/
```
The second one:
```
brew install docker docker-machine docker-compose
docker-machine create --driver virtualbox Matcha
eval $(docker-machine env Matcha)
```

## Build and Run

```
git clone https://github.com/AndreiSukharev/Matcha.git matcha
cd matcha
docker-compose up --build
sh dbGPS.sh
cd client
npm i
npm run serve
go to: http://localhost:8080
```

## Test

Create test users:
```
docker exec flask bash -c "python test_entity.py"
```

#### Note Docker

Run postgres client:

```
docker exec -it postgres psql matchaDB user
```
Enter in container:
```
docker exec -it flask bash
```
Remove all:
```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -a -q)
```
