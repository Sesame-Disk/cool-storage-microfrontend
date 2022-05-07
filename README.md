# cool-storage-microfrontend

## Installation
**Clone this repo**
```
git clone https://github.com/Sesame-Disk/cool-storage-microfrontend.git

cd cool-storage-microfrontend
```

**Build the image from Dockerfile**

```
docker build -t cool-storage-microfrontend .
```
**Run as a container**

```
docker run -dp 3000:3000 --name cool-storage-app cool-storage-microfrontend
```

**Now open [localhost:3000](http://localhost:3000).**

> If you want to **Delete and Kill the container** use
>  ```
>  docker rm cool-storage-app -f
>  ```
