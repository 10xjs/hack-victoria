import createRoutes from 'route';

export default (req) => createRoutes(req.clientContext.store);
