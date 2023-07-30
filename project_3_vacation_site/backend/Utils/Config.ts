class Config{
    public mysql_host = "localhost";
    public mysql_user = "root";
    public mysql_password = "12345";
    public mysql_port = 3306;
    public mysql_database = "vacation_sql";
    public webPort = 4000;
}

const config = new Config();
export default config;