FROM public.ecr.aws/lambda/nodejs:16

RUN yum install unzip -y
RUN curl https://bun.sh/install | bash
RUN cp /root/.bun/bin/bun /var/runtime
WORKDIR /var/runtime/
ADD docker/bootstrap bootstrap
RUN chmod u+x bootstrap
ADD runtime runtime
