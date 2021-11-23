FROM public.ecr.aws/lambda/provided:al2.2021.09.13.11

ARG asset_name=layer
ARG CLAMAV_VERSION=0.103.4-1.el7

USER root
RUN mkdir -p /opt/{lib,clamav}

#
# tools
#
RUN yum install -y zip-3.0-11.amzn2.0.2 yum-utils-1.1.31-46.amzn2.0.1 amazon-linux-extras-2.0.1-1.amzn2
RUN amazon-linux-extras install epel -y && yum-config-manager --enable epel

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