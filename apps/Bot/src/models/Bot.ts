import Message from "./Message";

export default interface Bot {
  start(): void;
  processMessage({ message }: { message: Message }): void;
}
