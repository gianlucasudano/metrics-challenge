/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

export const exampleGetResponseMocked = [
  {
    id: 1,
    name: 'mouse',
    description: 'mouse gaming',
    inStock: true,
  },
  {
    id: 2,
    name: 'keyboard',
    description: 'keyboard gaming',
    inStock: true,
  },
];

export const exampleNewProductMocked = {
  id: 3,
  name: 'screen',
  description: 'screen gaming',
  inStock: true,
};

// Handles a GET /example request
export const getExampleHappyResponseHandler = rest.get(
  '/example',
  (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(exampleGetResponseMocked));
  }
);

// Handles a GET /example request with an empty res
export const getExampleEmptyResponseHandler = rest.get(
  '/example',
  (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }
);

// Handles a GET /example request with a failed status
export const getExampleFailedResponseHandler = rest.get(
  '/example',
  (_req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        error: { message: 'Network Error' },
      })
    );
  }
);

// Handles a POST /example request
export const postExampleHappyResponseHandler = rest.post(
  '/example',
  (_req, res, ctx) => {
    return res(ctx.status(201), ctx.json(exampleNewProductMocked));
  }
);

// Handles a POST /example request with a failed status
export const postExampleFailedResponseHandler = rest.post(
  '/example',
  (_req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        error: { message: 'Network Error' },
      })
    );
  }
);

export const handlers = [
  getExampleHappyResponseHandler,
  getExampleFailedResponseHandler,
  getExampleEmptyResponseHandler,
  postExampleHappyResponseHandler,
  postExampleFailedResponseHandler,
];
