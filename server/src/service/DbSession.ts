import neo4j from 'neo4j-driver'
import {NEO4J_PASSWORD, NEO4J_USER, NEO4J_URI} from '../config'

export default class DbSession {
    static getSession() {
        const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));
        return driver.session()
    }
}