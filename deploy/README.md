# Deployment to kubernetes
deployment to kubernetes run by create resources under {dev, staging, prod} folders

* every environment has it's own namespace green-dev, green-staging, green-prod

```bash
 # make sure your namespace is created
 kubectl create namespace green-dev
 # create Deployment and Service for media
 kubectl create -f ./deploy/dev/
 kubectl get services,deployments,pods
 # delete everything for name=media
 # kubectl delete service,deployment --selector=name=media
 # update deployment image
 kubectl set image deployment/media media=nexus.office.traffics-switch.de:9223/traffics/mediaservice:develop
```
