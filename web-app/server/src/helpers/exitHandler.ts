import { Server } from 'http';

const handleExit = (err: Error | unknown, server: Server, code: number) => {
  // Exit function
  const exit = () => {
    process.exit(code);
  };

  if (err && err instanceof Error) {
    // Log error information, use a proper logging library here :)
    console.log(`Logged Error: ${err.stack}`);
  }

  // Attempt a graceful shutdown
  server.close(exit);
  setTimeout(exit, 500).unref();
};
  
export default handleExit;