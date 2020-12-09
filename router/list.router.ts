import express from 'express';
import * as listDao from '../daos/list.dao';

// the user router represents a subset of the application
// for all enpoints starting with /list
export const listRouter = express.Router();

/**
 * /list
 * find all invitations
 */
listRouter.get('', [
    async (req, res) => {
    const list = await listDao.findAll();
    res.json(list);
}]);

/**
 * /list/:email
 * find invitee by email
 */
listRouter.get('/:name', [
    async (req, res) => {
    const list = await listDao.findByName(req.params.name);
    res.json(list);
}]);

/**
 * /list
 * partially update member resource
 */
listRouter.patch('',
    async (req, res) => {
    const name = req.body.name;
    // const currentGuest = req.session.list.email;
    console.log(`updating: ${name}`);
    const updatedRes = await listDao.updateRSVP(req.body);
    res.json(updatedRes);
});