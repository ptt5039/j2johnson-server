import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlList } from '../util/list.converter';
import GuestList from '../../src/models/guestList';

export async function findAll() {
    console.log('Finding all invited guest');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`
        SELECT * FROM guest_list ORDER BY rsvp DESC`);
        return result.rows.map(convertSqlList);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('Found all invited guest');
    return undefined;
};

export async function findByName(name: string) {
    console.log('Finding invitee by name: ' + name);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`
        SELECT * FROM guest_list WHERE guest_name = $1`, [`${name}`]);
        const sqlUser = result.rows[0];
        // console.log(sqlUser);
        return sqlUser && convertSqlList(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
};

export async function updateRSVP(guest: Partial<GuestList>) {
    const oldGuest = await findByName(guest.guestName);
    // console.log(oldGuest);

    if (!oldGuest) {
        return undefined;
    }
    guest = {
        ...oldGuest, // spread operator
        ...guest
    };
    // console.log(guest);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
        UPDATE guest_list
            SET rsvp = $1
            WHERE guest_name = $2
            RETURNING *`;
        const params = [guest.rsvp, guest.guestName];
        const result = await client.query(queryString, params);
        const sqlUser = result.rows[0];
        return sqlUser && convertSqlList(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log(`Updated guest information`);
    return undefined;
}