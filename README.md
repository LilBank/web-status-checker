# Web Checker

For fun

## Table of Contents

```
|-- Architecture
|-- Sequence Diagram
|-- How to run the applications?
|-- Note from the author
|-- Roadmap
|-- Screenshots
|-- Development Tools
```
## Architecture

### As-Is

<img width="929" alt="Screenshot 2567-07-25 at 22 54 38" src="https://github.com/user-attachments/assets/82548fa0-1709-458b-9b24-4bb588ab4a63">

Frontend:

- [React.js](https://react.dev/): Main library for development.
- [Vite.js](https://vitejs.dev/): Pronounce as **Veet**, for built configuration.
- [Zustand](https://zustand-demo.pmnd.rs/): React hit hot global state management.

Middleware:

- [Nginx](https://nginx.org/en/): As we're using `Docker` for containerization, `Docker` doesn't support load balancing out of the box, so `Nginx` is used to support this. In Kubernetes, `Service` supports out of the box, balancing between each pod.

Backend:

- [Express.js](https://expressjs.com/): Quick and reliable backend. Even if single-threaded, it excels in horizontal scaling.

### To-Be

<img width="937" alt="Screenshot 2567-07-25 at 22 54 27" src="https://github.com/user-attachments/assets/a3ba43c8-e65e-415f-b4ff-bf08fa6e0966">

Keeping `React.js` & `Nginx(LB)` & `Express.js(Fetcher)`, I aim to add `RabbitMQ` to queue messages for the `WriterService` to parse the URLs back to a `.csv` file. Sending raw JSON is faster than sending an actual file, according to the requirements.

## Sequence Diagram

<img width="893" alt="Screenshot 2567-07-25 at 23 16 28" src="https://github.com/user-attachments/assets/3f1c0a56-0525-45ea-b2ad-c11ed026026c">

`React.js` **reads** the `.csv` file, and sends the data to the backend via `Nginx`. The backend fetches the request based on the given URLs, and then returns the results back for rendering.

## How to run the applications?

### Prerequisites

- [Docker](https://www.docker.com/)/[Rancher](https://www.rancher.com/): or any container runtime that supports `docker compose`

### Instructions

Note: below command line are for GNU/Linux alike.

1. Clone the repository, and change the directory. Either via `HTTPS` or `SSH`.

```
  $ git clone https://github.com/LINE-TH-Recruitment/solution-engineer-LilBank.git
  $ cd solution-engineer-LilBank
```

2. Create `.env` files for the frontend `docker build`.

```
  $ echo "VITE_BACKEND_BASE_URL=http://localhost:3000/" > frontend/.env
  $ echo "VITE_BACKEND_BASE_URL=http://localhost:4000/" > frontend/.env.production
```

3. Run the applications.

```
  $ docker compose up
```

Frontend: http://localhost:8080

## Note from the author

In case you wonder about my choice of technology stack, here are my reasons:

- `React.js` over `Next.js` since I don't need a big boilerplate for a Single Page App.
- Hand-crafted `React` + `SCSS` over `MUI`/`Tailwind`(or others) since I wanted to neatly craft the component to exactly match the design in pixel terms.
- `Zustand` over `Redux`, less boilerplate and ease of use.
- `Express.js` over `Nest.js`/`Springboot`(or others), within a limited amount of time, `Express.js` serves best in terms of development and scalability. No need to handle thread management due to the single-threaded of the JavaScript beauty.
- **Upload file** vs **Send file data**, the message payload for the file is bigger than a JSON message. If the file doesn't need to be stored at the moment, sending the data is much more efficient. In addition, the file storing can be extracted into another service since we can rewrite the file back with the JSON message.

This `v0.1.0` still contains minor issues, I've listed all the discovered issues [here](https://github.com/LINE-TH-Recruitment/solution-engineer-LilBank/issues). Feel free to open more so that we can improve the Web Checker.

## Roadmap

- `v1.0.0`
  - Add `RabbitMQ` to queue tasks for data to be parsed back to a file.
  - Add `Writer Service` to parse the data back to a file.
  - Add `Object Storage` to store the files.
  - Add `Selenium` for E2E tests.
  - Add `pre-commit` test, such as linting.
  - Add `React.js unit test` with `Jest`.
  - Add health checks to every component.
  - Add **Metric/Trace/Log Monitoring** with `OTEL`+`ELK`+`Jaeger`+`Prometheus`+`Grafana`.
  - Add `Load tester` to do Non-Functional Testing.
  - Add `Chaos Monkey` for reliability testing.
  - Add Kubernetes manifests files for Kubernetes deployment.
  - Implement `ArgoCD` to achieve GitOps. For Operation Team reliabilities.
  - Configuration file for `SIT`, `STAGING`, `NFT`, and `PROD`.

## Screenshots

### Chrome (Figma size: `1440px x 1150px`)

<img width="1033" alt="Screenshot 2567-07-23 at 22 39 37" src="https://github.com/user-attachments/assets/62fc9f6b-f41d-4fbd-a2cc-d1097d428e46">

<img width="1029" alt="Screenshot 2567-07-23 at 22 42 49" src="https://github.com/user-attachments/assets/b9972a4e-b5c8-4650-b5cd-8f20e9c4af46">

<img width="1030" alt="Screenshot 2567-07-23 at 22 55 49" src="https://github.com/user-attachments/assets/4875b757-4c02-4c23-b4cb-c5c41908eca2">

### Safari (Macbook 14 inch)

<img width="1599" alt="Screenshot 2567-07-23 at 22 41 53" src="https://github.com/user-attachments/assets/71440def-79d3-455e-9911-5f7e328574a9">

<img width="1600" alt="Screenshot 2567-07-23 at 22 56 28" src="https://github.com/user-attachments/assets/56d28e4c-2628-4ac5-9059-4ff285d12c88">

<img width="1600" alt="Screenshot 2567-07-23 at 22 56 34" src="https://github.com/user-attachments/assets/576cce5c-52f9-4e92-9632-533f49b40f44">

### Mobile (Iphone 14 Pro Max)

<img width="537" alt="Screenshot 2567-07-23 at 22 54 55" src="https://github.com/user-attachments/assets/e332985f-57e4-4f35-97b5-61bd00dbd5e3">

<img width="537" alt="Screenshot 2567-07-23 at 22 55 09" src="https://github.com/user-attachments/assets/4d6e386c-a387-485d-872c-1cb701a9e4fc">

<img width="537" alt="Screenshot 2567-07-23 at 22 55 17" src="https://github.com/user-attachments/assets/e565ed59-9f45-4510-b98d-9b7869a3f785">

## Development Tools

- Macbook M1 Chip 14 inch
- Rancher
- Yarn
