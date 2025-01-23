
/** @type { import("drizzle-kit").Config}*/

export default {
    schema : "./app/configs/schema.jsx",
    dialect : 'postgresql',
    dbCredentials : {
        url : (process.env.NEXT_PUBLIC_DB_CONNECTION_STRING)
    }}
