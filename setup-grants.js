const { Client } = require('pg');
const run = async () => {
    const client = new Client({ connectionString: 'postgresql://postgres.mhwjvyswjsaiidctihwx:SOJIFOUNTE23%3F@aws-0-eu-west-3.pooler.supabase.com:6543/postgres' });
    try {
        await client.connect();
        await client.query(`
            GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
            GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
            GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
            GRANT ALL PRIVILEGES ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;
            NOTIFY pgrst, 'reload schema';
        `);
        console.log('GRANTS_APPLIED_SUCCESSFULLY');
    } catch(err) {
        console.error('ERROR:', err);
    } finally {
        await client.end();
    }
}
run();
