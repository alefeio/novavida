# Ambientes de banco — Nova Vida

## Isolamento obrigatório

| Ambiente | `DATABASE_ENV` | Uso | Migrations nesta sprint |
| --- | --- | --- | --- |
| Development | `development` | Máquina local / Neon branch DEV exclusivo | Permitidas via `npm run db:migrate` após `db:check` |
| Preview / Homologação | `preview` | Branch feature / Preview Vercel + Neon branch HOMOL | Permitidas com confirmação e banco exclusivo |
| Production | `production` | Site público + futuro admin prod | **BLOQUEADAS** na Sprint 2.0 |

## Regras

1. Banco **exclusivo** da Nova Vida (preferência Neon). Nunca reutilizar projeto/credenciais de Alexandre Feio ou outro site.
2. `DATABASE_URL` (runtime/pooler) e `DIRECT_URL` (migrations) devem apontar ao **mesmo** banco do ambiente.
3. Secrets distintos por ambiente (`BETTER_AUTH_SECRET`, URLs).
4. **Não** executar migrations no build da Vercel.
5. **Não** seed automático em production.
6. **Não** `migrate reset` / operações destrutivas em bancos remotos.
7. Site público deve compilar e funcionar **sem** `DATABASE_URL`.

## Pré-flight

```bash
npm run db:check
```

Estados:

- `PASS` — vars presentes, ambiente development/preview, heurística anti-projeto-estrangeiro ok.
- `BLOCKED` — vars ausentes, production, ou conexão suspeita de outro projeto.

## Evidência sem segredos

Registrar apenas: nome do projeto Neon (se houver), `DATABASE_ENV`, host redigido (`protocol//hostname/path`), se migration foi gerada/aplicada. Nunca colar connection strings.
