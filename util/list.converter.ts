import GuestList from '../../src/models/guestList';

export function convertSqlList(row: any) {
    return new GuestList(row.guest_id, row.guest_name, row.plus_name, row.rsvp);
};