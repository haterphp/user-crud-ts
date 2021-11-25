import {connect} from 'mongoose';

export const initDatabase = (connectString: string) => ({
    fn: async (_) => {
        await connect(connectString);
    }
})
