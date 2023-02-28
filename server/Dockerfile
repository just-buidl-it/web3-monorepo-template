FROM rust:1.66

RUN apt-get install ca-certificates

COPY Cargo.toml /usr/app/Cargo.toml
COPY Cargo.lock /usr/app/Cargo.lock


COPY src /usr/app/src

WORKDIR /usr/app

RUN cargo install --path .

RUN cargo install cargo-watch

CMD ["cargo", "watch", "-x", "run", "-w", "src"]
