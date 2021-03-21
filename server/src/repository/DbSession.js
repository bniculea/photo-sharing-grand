const neo4j = require('neo4j-driver');
const config = require('../config');

class DbSession {

    constructor() {
        throw new Error('Use getSession');
    }

    static getSession(){
        if(!DbSession.session) {
            const driver = neo4j.driver(config.NEO4J_URI, neo4j.auth.basic(config.NEO4J_USER, config.NEO4J_PASSWORD));
            DbSession.session = driver.session;
        }

        return DbSession.session;
    }
}

module.exports = DbSession