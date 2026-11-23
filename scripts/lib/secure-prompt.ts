/**
 * Prompt de senha sem eco (TTY), compatível com Windows e Unix.
 * Não aceita senha por argv; falha se stdin não for interativo.
 */

export function assertNoPasswordArgv(argv: string[] = process.argv): void {
  const banned = argv.some(
    (arg) =>
      /^--password(=|$)/i.test(arg) ||
      /^--pass(=|$)/i.test(arg) ||
      /^--secret(=|$)/i.test(arg),
  );
  if (banned) {
    throw new Error(
      "Senha via argumentos de linha de comando é proibida. Use o prompt interativo sem eco.",
    );
  }
}

export async function promptHiddenPassword(label: string): Promise<string> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error(
      "Entrada interativa (TTY) obrigatória para digitar a senha com segurança.",
    );
  }

  const stdin = process.stdin;
  const stdout = process.stdout;

  stdout.write(label);

  return new Promise<string>((resolve, reject) => {
    const wasRaw = stdin.isRaw === true;
    let password = "";
    let settled = false;

    const cleanup = () => {
      stdin.removeListener("data", onData);
      stdin.removeListener("error", onError);
      try {
        if (typeof stdin.setRawMode === "function") {
          stdin.setRawMode(wasRaw);
        }
      } catch {
        // ignore
      }
      stdin.pause();
    };

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      cleanup();
      fn();
    };

    const onError = (error: Error) => {
      finish(() => reject(error));
    };

    const onData = (chunk: Buffer | string) => {
      const data = typeof chunk === "string" ? chunk : chunk.toString("utf8");
      for (const char of data) {
        if (char === "\n" || char === "\r" || char === "\u0004") {
          stdout.write("\n");
          finish(() => resolve(password));
          return;
        }
        if (char === "\u0003") {
          stdout.write("\n");
          finish(() => reject(new Error("Operação cancelada.")));
          return;
        }
        if (char === "\u007f" || char === "\b") {
          password = password.slice(0, -1);
          continue;
        }
        // Ignora sequências de escape / controle
        if (char < " " && char !== "\t") continue;
        password += char;
      }
    };

    try {
      if (typeof stdin.setRawMode === "function") {
        stdin.setRawMode(true);
      }
    } catch (error) {
      finish(() =>
        reject(
          error instanceof Error
            ? error
            : new Error("Não foi possível desativar o eco do terminal."),
        ),
      );
      return;
    }

    stdin.resume();
    stdin.on("data", onData);
    stdin.on("error", onError);
  });
}
