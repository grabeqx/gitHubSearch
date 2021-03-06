import moxios from 'moxios';

import { searchForUser } from './apiCalls';
import { user } from '../service/data';

const mockSuccess = (data: object) => ({ status: 200, response: data });
const mockError = (error: string) => ({ status: 500, response: error });

describe('searchForUser', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    window.localStorage.setItem('token', 'test');

    it('fetch proper users data', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(
                mockSuccess({
                    total_count: 200,
                    incomplete_results: true,
                    items: [user],
                })
            );
        });

        const data = await searchForUser('test');

        if ('length' in data) {
            expect(data).toEqual([user]);
            expect(data[0].login).toBe('test');
        }
    });

    it('return error message on failure', async () => {
        const response = 'Request failed with status code 500';
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockError(response));
        });

        const data = await searchForUser('test');

        if ('message' in data) {
            expect(data.message).toEqual(response);
        }
    });
});
