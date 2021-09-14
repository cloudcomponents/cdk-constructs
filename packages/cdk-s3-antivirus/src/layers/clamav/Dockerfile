FROM public.ecr.aws/lambda/provided:al2.2021.09.13.11

ARG asset_name=layer
ARG CLAMAV_VERSION=0.103.3-5.el7

USER root
RUN mkdir -p /opt/{lib,clamav}

#
# tools
#
RUN yum install -y zip yum-utils amazon-linux-extras
RUN amazon-linux-extras install epel -y
RUN yum-config-manager --enable epel

#
# layer
# 
RUN yum install clamav-$CLAMAV_VERSION -y


RUN ldd /usr/bin/clamscan | cut -d '>' -f 2 | awk '{print $1}' | grep /lib | xargs -I '{}' cp -v '{}' /opt/lib/
RUN ldd /usr/bin/freshclam | cut -d '>' -f 2 | awk '{print $1}' | grep /lib | xargs -I '{}' cp -v '{}' /opt/lib/
RUN cp /usr/bin/clamscan /usr/bin/freshclam /opt/clamav

# #
# # create the bundle
# #
WORKDIR /opt
RUN zip --symlinks -r ../$asset_name *

WORKDIR /
ENTRYPOINT [ "/bin/bash" ]