FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    socat \
    gdb \
    gcc \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m ctf
WORKDIR /home/ctf

COPY chall.c .
COPY flag.txt .

RUN gcc chall.c -o bof -fno-stack-protector -no-pie

RUN chown root:ctf /home/ctf/bof /home/ctf/flag.txt
RUN chmod 555 /home/ctf/bof
RUN chmod 444 /home/ctf/flag.txt

USER ctf

EXPOSE 1111

CMD ["socat", "TCP-LISTEN:1111,reuseaddr,fork", "EXEC:./bof,stderr"]
