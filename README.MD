# Signing images using sigstore

## test images using nodejs 

### huea for DSO, part signature

construir images

~~~
docker build -t userviceknelo:1.0 .
~~~


correr contenedor

~~~
docker run -d -p 3030:3030 userviceknelo:1.0
~~~
prueba,  usa  http://localhost:3030/product/16592

~~~
docker run --detach -it -p 3030:3030 userviceknelo:1.0
~~~

mete la imagen al registry local 

~~~
docker tag userviceknelo:1.0 dev.docker.local:5000/userviceknelo:1.0
~~~
pusheala a tu reistry local 

~~~
docker push dev.docker.local:5000/userviceknelo:1.0
~~~

borrala de tus imagenes 

~~~
docker image remove dev.docker.local:5000/userviceknelo:1.0
~~~

hacemos pull desde el registry local

~~~
docker pull dev.docker.local:5000/userviceknelo:1.0
~~~

ahora follow con la firma poshom...