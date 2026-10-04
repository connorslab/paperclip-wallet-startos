ARG BASE_IMAGE=paperclip-wallet:sideflash-rc5
FROM ${BASE_IMAGE}
USER root
COPY runtime /opt/startos
ENTRYPOINT ["/usr/bin/tini","--","python3","/opt/startos/start.py"]
