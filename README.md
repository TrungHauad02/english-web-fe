## Build docker image cho ReactJS

```bash
docker build -f Dockerfile.dev -t <name:tag> .

## Example
docker build -f Dockerfile.dev -t english-web-fe:0.0.1 .
```

---

## View image in docker

```bash
docker image ls
```

---

## Run image in docker

```bash
docker container run -d -p [host_port]:[container_port] [repository]:[tag]
## Example
docker container run -d -p 3000:3000 english-web-fe:0.0.1
```

---

## View running container

```bash
docker container ps
```

---

## View container stop

```bash
docker ps -a
```

---

## Start a container

```bash
docker container start <containerId>
```

---

## Stop a container

```bash
docker container stop <containerId>
```

## Remove a container

```bash
docker rm <containerId>
```

## Remove an image

```bash
docker rmi <imageId>
```
