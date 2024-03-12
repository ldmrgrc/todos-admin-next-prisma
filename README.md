# Add Todos

## Getting started

+ Paso para poner en funcionamiento la aplicación de Todos

## Dev

1. Levantar base de datos

    ```pwsh
    docker compose up -d
    ```

2. Renombrar el .env.template a .env

3. Reemplazar las variables de entorno

4. Ejecutar el [seed para crear la base de datos local](localhost:3000/api/seed)

### Comandos de Prisma

```pwsh
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
```

## Prd

## Stage
